import { FC, useMemo, useState } from 'react'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { useWeb3Modal } from '@web3modal/scaffold-react'
import { SaleV1FunC, SaleV1Solidity, ERC20 } from '@xton/user-sdk'
import { BrowserProvider, JsonRpcSigner } from 'ethers'
import { useRouter } from 'next/router'
import { Address } from 'ton-core'
import { Config, useAccount, useConnectorClient } from 'wagmi'
import {
  // checkTransaction,
  estimateBuyAmount,
  getUserContractAddress,
  queryTONPrice,
  queryUserSaleState,
  queryWhitelist,
} from 'api'
import { ProjectSaleState } from 'api/types'
import { AppRoutes } from 'constants/app'
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
  projectId: string
  project: any
  projectSaleState: ProjectSaleState
}

const ETH_TEST_CONTRACT_ADDRESS = '0xdA158609D4B56C1850d76156EB914060F0b68e44'
const ERC_20_CONTRACT_ADDRESS = '0x90f325c5f5F05AD6a17daf4fA5BF8F9d2AAccc2B'

export const BuyPopup: FC<BuyPopupProps> = (props) => {
  const { onClose, open, status, projectId, project, projectSaleState } = props

  const [activeChain, setActiveChain] = useState<'TON' | 'ETH'>('TON')

  const [currentStatus, setCurrentStatus] = useState<BuyStatus>(
    status || 'loader'
  )

  const [isLoading, setIsLoading] = useState(false)

  const [tonConnectUI] = useTonConnectUI()

  const tonUserWalletAddress = useTonAddress()

  const { sendTransaction } = useSendTransaction()

  const { open: openWeb3Modal } = useWeb3Modal()

  const { address: ethUserWalletAddress, chainId } = useAccount()

  const { data: client } = useConnectorClient<Config>({ chainId })

  const router = useRouter()

  // const [tonConnectUI] = useTonConnectUI()

  const currentBuyPopupState = useMemo(() => {
    switch (currentStatus) {
      case 'buy':
        return (
          <Buy
            activeChain={activeChain}
            project={project}
            projectSaleState={projectSaleState}
            setActiveChain={setActiveChain}
          />
        )
      case 'loader':
        return <Loader />
      case 'waiting':
        return <WaitingForApproval />
      case 'success':
        return <SuccessBuy amount={'42.214'} symbol={project.symbol} />
      case 'join_waitlist':
        return <JoinWaitlist />
      default:
        return (
          <Buy
            activeChain={activeChain}
            project={project}
            projectSaleState={projectSaleState}
            setActiveChain={setActiveChain}
          />
        )
    }
  }, [activeChain, currentStatus, project, projectSaleState])

  const handleBuy = async () => {
    if (currentStatus === 'success') {
      router.push({
        pathname: AppRoutes.SaleState,
        query: {
          projectId,
        },
      })

      return
    }

    if (currentStatus === 'join_waitlist') {
      alert('You are sucessfully joined to the Wait List!')

      return
    }

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
      const whitelist = await queryWhitelist('TON', project.saleId, 1)
      // const whitelist = await SaleV1FunC.queryWhitelist(
      //   Address.parse(tonUserWalletAddress)
      // )

      console.log(whitelist)
      console.log(project)

      const tonPool = project.allocationPools
        .filter((pool: any) => pool.network === 'TON')
        .pop()

      console.log(whitelist)
      console.log(project)

      // Step 2

      const createUserMessage = await SaleV1FunC.createUserMessageR(
        Address.parse(tonPool.contract),
        '0.25',
        {
          payload: whitelist.payload!,
          signature: whitelist.signature,
        }
      )

      // Step: 3 | Let's check and see if user has a contract
      const userSaleState = await queryUserSaleState(project.saleId, 'ton')

      let createUserBoc = null

      switch (true) {
        case !userSaleState:
        case userSaleState.state !== 'bought':
          const { boc: bovx } = await sendTransaction(createUserMessage)
          createUserBoc = bovx
          break
        case userSaleState.state === 'bought':
          createUserBoc = 'true'
      }
      // We don't need to deploy user contract if the state is already there

      // Step: 4
      if (createUserBoc) {
        //TODO-CHAPSKI: вот с момента подписи этой транзы запускаем лоадер на первый степ
        setCurrentStatus('loader')

        let currentAttempts = 0
        let isCreateUserTrxSigned = false

        const checkTransactionStatus = async () => {
          try {
            if (currentAttempts >= 8) {
              throw new Error(
                'Exceeded maximum number of attempts to check your transaction.'
              )
            }

            const userSaleState = await queryUserSaleState(
              project.saleId,
              'ton'
            )

            isCreateUserTrxSigned =
              userSaleState && userSaleState.state === 'bought'
            // isCreateUserTrxSigned = !await checkTransaction(
            //   createUserBoc
            // )

            // isCreateUserTrxSigned = true;

            if (!isCreateUserTrxSigned) {
              currentAttempts++
              setTimeout(checkTransactionStatus, 5000)

              return
            }

            //Step 5  (if trx status true)
            const userContractAddress = await getUserContractAddress(
              project.saleId
            )

            console.log('userContractAddress', userContractAddress)

            // Step 6.0
            const tonPrice = await queryTONPrice()

            const buyAmount = await estimateBuyAmount(
              project.saleId,
              'TON',
              1,
              BigInt(1e9)
            )

            //Step 6
            const buyUserMessage = await SaleV1FunC.buyUserMessageFull(
              Address.parse(userContractAddress),
              BigInt(buyAmount.tokenAmount),
              BigInt(buyAmount.tonAmount) + BigInt(2e8),
              tonPrice
            )

            //Step 7
            //TODO-CHAPSKI: тут скорее всего будет переход на второй степ в степпере
            //крутим соотвественно до момента пока не получим true от бека
            const { boc: buyUserBoc } = await sendTransaction(buyUserMessage)
            console.log({ buyUserBoc })

            //Step 8
            if (buyUserBoc) {
              let currentAttempts = 0
              let isBuyUserTrxSigned = false

              const checkBuyUserTrx = async () => {
                try {
                  if (currentAttempts >= 8) {
                    throw new Error(
                      'Exceeded maximum number of attempts to check your transaction.'
                    )
                  }

                  const userSaleStateAfterBuy = await queryUserSaleState(
                    project.saleId,
                    'ton'
                  )
                  // detect state change between st and st2, if yes, the transaction is a success
                  isBuyUserTrxSigned =
                    userSaleStateAfterBuy &&
                    userSaleStateAfterBuy.state === 'bought' &&
                    userSaleStateAfterBuy.bought > 0

                  if (!isBuyUserTrxSigned) {
                    currentAttempts++
                    setTimeout(checkBuyUserTrx, 5000)

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

              //TODO-CHAPSKI: собственно на этом моменте мы и свитчим на попап success
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
        return `Buy ${project.symbol}`
      case currentStatus === 'join_waitlist':
        return 'Join Waitlist'
      case currentStatus === 'success':
        return 'Show Allocation'
      default:
        return 'Check next state'
    }
  }, [
    activeChain,
    currentStatus,
    ethUserWalletAddress,
    project.symbol,
    tonUserWalletAddress,
  ])

  return (
    <Modal
      onClose={() => {
        onClose(false)

        if (status !== 'join_waitlist') {
          setCurrentStatus('buy')
        }
      }}
      open={open}
      title={`Buy ${project.name}`}
    >
      {currentBuyPopupState}
      {currentStatus !== 'loader' && (
        <MainButton
          onClick={handleBuy}
          progress={isLoading}
          text={currentMainBuutonText}
        />
      )}
    </Modal>
  )
}
