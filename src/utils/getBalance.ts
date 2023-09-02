import { getHttpEndpoint } from '@orbs-network/ton-access'
import { TonClient } from 'ton'
import { Address, fromNano } from 'ton-core'

export async function getBalance(
  ownerWalletAddr: string,
  network: 'mainnet' | 'testnet'
) {
  const balance = await new TonClient({
    endpoint: await getHttpEndpoint({ network }),
  }).getBalance(Address.parse(ownerWalletAddr))

  return Number(fromNano(balance))
}
