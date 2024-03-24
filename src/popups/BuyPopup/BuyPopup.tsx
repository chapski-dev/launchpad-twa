import { FC, useMemo, useState } from 'react'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { useWeb3Modal } from '@web3modal/scaffold-react'
import { SaleV1FunC, SaleV1Solidity, ERC20 } from '@xton/user-sdk'
import { BrowserProvider, JsonRpcSigner } from 'ethers'
import { Address } from 'ton-core'
import { Config, useAccount, useConnectorClient } from 'wagmi'
import { MainButton } from 'features/MainButton'
import { useSendTransaction } from 'hooks/useSendTransaction/useSendTransaction'
import { Modal } from 'ui/Modal/Modal'
import {
  WaitingForApproval,
  Buy,
  Loader,
  SuccessBuy,
  JoinWaitlist,
} from './components'

type BuyStatus = 'buy' | 'loader' | 'waiting' | 'success' | 'join_waitlist'

type BuyPopupProps = {
  onClose: (val: boolean) => void
  open: boolean
  status?: BuyStatus
}

const ETH_TEST_CONTRACT_ADDRESS = '0xdA158609D4B56C1850d76156EB914060F0b68e44'
const ERC_20_CONTRACT_ADDRESS = '0x90f325c5f5F05AD6a17daf4fA5BF8F9d2AAccc2B'

export const BuyPopup: FC<BuyPopupProps> = (props) => {
  const { onClose, open, status } = props

  const [activeChain, setActiveChain] = useState<'TON' | 'ETH'>('TON')

  const [currentStatus, setCurrentStatus] = useState<BuyStatus>(status || 'buy')

  const [isLoading, setIsLoading] = useState(false)

  const [tonConnectUI] = useTonConnectUI()

  const tonUserWalletAddress = useTonAddress()

  const { sendTransaction } = useSendTransaction()

  const { open: openWeb3Modal } = useWeb3Modal()

  const { address: ethUserWalletAddress, chainId } = useAccount()

  const { data: client } = useConnectorClient<Config>({ chainId })

  // const [tonConnectUI] = useTonConnectUI()

  const currentBuyPopupState = useMemo(() => {
    switch (currentStatus) {
      case 'buy':
        return <Buy activeChain={activeChain} setActiveChain={setActiveChain} />
      case 'loader':
        return <Loader />
      case 'waiting':
        return <WaitingForApproval />
      case 'success':
        return <SuccessBuy count={'42.214'} />
      case 'join_waitlist':
        return <JoinWaitlist />
      default:
        return <Buy activeChain={activeChain} setActiveChain={setActiveChain} />
    }
  }, [activeChain, currentStatus])

  // const handleClick = () => {
  //   switch (currentStatus) {
  //     case 'buy':
  //       setCurrentStatus('loader')
  //       break
  //     case 'loader':
  //       setCurrentStatus('waiting')
  //       break
  //     case 'waiting':
  //       setCurrentStatus('success')
  //       break
  //     case 'join_waitlist':
  //       alert('You have been successfully added to the waiting list.')
  //       onClose(false)
  //       break
  //   }
  // }

  const handleBuy = async () => {
    switch (activeChain) {
      case 'TON':
        if (!tonUserWalletAddress) {
          tonConnectUI.openModal()

          return
        }

        await handleBuyByTon()
        break
      case 'ETH':
        if (!ethUserWalletAddress) {
          openWeb3Modal()

          return
        }

        await handleBuyByEth()
        break
    }
  }
  const handleBuyByTon = async () => {
    /** 
     * First part of flow (this is only for TON):
    0. User clicks buy
    1. You call queryWhitelist, get response
    2. (выдает ошибку, принято решение заменить на createUserMessage) You call createUser, give whitelistpayload from previous one, give tonconnect, give sale address (give your own address, this is mock), some amount "0.01"
    2. createUserMessage
    3. accept transaction in ton wallet
    4. get boc, call check transaction every 5 seconds to check results
    
    5. getUserSaleAddress
    6. call buyUser and amount
    7. wait for user to confirm
    8. wait for tx

    ??10. getUserSaleStatus (mock routes class)
     * */

    try {
      setIsLoading(true)
      // Step 1:
      const whitelist = await SaleV1FunC.queryWhitelist(
        Address.parse(tonUserWalletAddress)
      )

      console.log(whitelist)
      // Step 2
      const createUserMessage = await SaleV1FunC.createUserMessage(
        Address.parse(tonUserWalletAddress),
        '0.01',
        whitelist
      )

      // Step: 3
      const { boc: createUserBoc } = await sendTransaction(createUserMessage)

      // Step: 4
      if (createUserBoc) {
        setCurrentStatus('loader')

        let currentAttempts = 0
        let isCreateUserTrxSigned = false

        const checkTransactionStatus = async () => {
          try {
            if (currentAttempts >= 5) {
              throw new Error(
                'Exceeded maximum number of attempts to check your transaction.'
              )
            }

            isCreateUserTrxSigned = await SaleV1FunC.checkTransaction(
              createUserBoc
            )

            if (!isCreateUserTrxSigned) {
              currentAttempts++
              setTimeout(checkTransactionStatus, 5000) // Повторно проверить через 5 секунд

              return
            }

            //Step 5  (if trx status true)
            await SaleV1FunC.getUserSaleAddress(
              Address.parse(tonUserWalletAddress),
              Address.parse(tonUserWalletAddress)
            )

            //Step 6
            const buyUserMessage = await SaleV1FunC.buyUserMessage(
              Address.parse(tonUserWalletAddress),
              BigInt(10000000)
            )

            //Step 7
            const { boc: buyUserBoc } = await sendTransaction(buyUserMessage)

            //Step 8
            if (buyUserBoc) {
              let currentAttempts = 0
              let isBuyUserTrxSigned = false

              const checkBuyUserTrx = async () => {
                try {
                  if (currentAttempts >= 5) {
                    throw new Error(
                      'Exceeded maximum number of attempts to check your transaction.'
                    )
                  }

                  isBuyUserTrxSigned = await SaleV1FunC.checkTransaction(
                    buyUserBoc
                  )

                  if (!isBuyUserTrxSigned) {
                    currentAttempts++
                    setTimeout(checkBuyUserTrx, 5000) // Повторно проверить через 5 секунд

                    return
                  }

                  setCurrentStatus('success')
                  setIsLoading(false)
                } catch (error) {
                  setIsLoading(false)
                  alert(error)
                }
              }

              checkBuyUserTrx()

              if (isBuyUserTrxSigned) {
                setCurrentStatus('success')
              }
            }

            return
          } catch (error) {
            setIsLoading(false)
            alert(error)

            return
          }
        }

        checkTransactionStatus()
      }
    } catch (error) {
      alert(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBuyByEth = async () => {
    // Steps for normal solidity sale:
    // 0. User clicks buy
    // 1. You call queryWhitelist, get response
    // 2. If ok, next step
    // 3. erc20 = new ERC20(...), token: 0x90f325c5f5F05AD6a17daf4fA5BF8F9d2AAccc2B
    // 4. erc20.approve(0xdA158609D4B56C1850d76156EB914060F0b68e44, some amount)
    // 5. accept in wallet
    // 6. waitfortx
    // 7. new SaleV1Solidity
    // 8. deposit (give arbitrary values, will fill in later)

    // Step 1

    const whiteList = await SaleV1Solidity.queryWhitelist(
      ethUserWalletAddress as string,
      1
    )

    if (whiteList && client) {
      const { account, chain, transport } = client

      const network = {
        chainId: chain.id,
        name: chain.name,
        ensAddress: chain.contracts?.ensRegistry?.address,
      }

      const provider = new BrowserProvider(transport, network)

      const signer = new JsonRpcSigner(provider, account.address)

      // const SaleSolidity = new SaleV1Solidity(
      //   ETH_TEST_CONTRACT_ADDRESS,
      //   signer.provider
      // )

      const erc20 = new ERC20(ERC_20_CONTRACT_ADDRESS, provider)

      const ercApproveMessage = await erc20.approve(
        ETH_TEST_CONTRACT_ADDRESS,
        1000
      )

      const trx = await signer.sendTransaction(ercApproveMessage)

      console.log(trx)

      try {
        setIsLoading(true)
      } catch (error) {
        setIsLoading(false)
        alert(error)
        return
      }
    }

    alert('Eth click !')
  }

  const currentMainBuutonText = useMemo(() => {
    switch (true) {
      case activeChain === 'TON' && !tonUserWalletAddress:
      case activeChain === 'ETH' && !ethUserWalletAddress:
        return 'Connect Wallet'
      case currentStatus === 'buy':
        return 'Buy XTON'
      case currentStatus === 'join_waitlist':
        return 'Join Waitlist'
      default:
        return 'Check next state'
    }
  }, [activeChain, currentStatus, ethUserWalletAddress, tonUserWalletAddress])

  return (
    <Modal
      onClose={() => {
        onClose(false)

        if (status !== 'join_waitlist') {
          setCurrentStatus('buy')
        }
      }}
      open={open}
      title="Buy XTON"
    >
      {currentBuyPopupState}
      {currentStatus !== 'success' && currentStatus !== 'loader' && (
        <MainButton
          onClick={handleBuy}
          progress={isLoading}
          text={currentMainBuutonText}
        />
      )}
    </Modal>
  )
}
