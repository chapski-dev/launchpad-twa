import { ConnectMessage } from '@ton-and-company/sdk/dist/core/contract'
import { useTonConnectUI } from '@tonconnect/ui-react'

export const useSendTransaction = () => {
  const [tonConnectUI] = useTonConnectUI()

  const sendTransaction = async (trxMessage: ConnectMessage) => {
    const trxParams = {
      validUntil: Date.now() + 100000,
      messages: [trxMessage],
    }

    const trx = await tonConnectUI.sendTransaction(trxParams)

    return trx
  }

  return {
    sendTransaction,
  }
}
