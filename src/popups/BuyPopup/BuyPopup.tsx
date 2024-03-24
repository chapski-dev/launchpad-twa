import { FC, useMemo, useState } from 'react'
import { useTonAddress } from '@tonconnect/ui-react'
import { SaleV1FunC } from '@xton/user-sdk'
import { Address } from 'ton-core'
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

export const BuyPopup: FC<BuyPopupProps> = (props) => {
  const { onClose, open, status } = props

  const [activeChain, setActiveChain] = useState<"TON" | "ETH">('TON');

  const [currentStatus, setCurrentStatus] = useState<BuyStatus>(status || 'buy')

  const [isLoading, setIsLoading] = useState(false)

  const userWalletAddress = useTonAddress()

  const { sendTransaction } = useSendTransaction()

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
        await handleBuyByTon();
        break;
      case 'ETH':
        await handleBuyByEth();
        break;
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
        Address.parse(userWalletAddress)
      )

      console.log(whitelist)
      // Step 2
      const createUserMessage = await SaleV1FunC.createUserMessage(
        Address.parse(userWalletAddress),
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
              Address.parse(userWalletAddress),
              Address.parse(userWalletAddress)
            )

            //Step 6
            const buyUserMessage = await SaleV1FunC.buyUserMessage(
              Address.parse(userWalletAddress),
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
            console.log(error)
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

  const handleBuyByEth = async () => null;

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
          text={
            currentStatus === 'buy'
              ? 'Buy XTON'
              : currentStatus === 'join_waitlist'
              ? 'Join Waitlist'
              : 'Check next state'
          }
        />
      )}
    </Modal>
  )
}
