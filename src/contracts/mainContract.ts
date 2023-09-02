import { Address, beginCell, Cell, Contract, ContractProvider } from 'ton-core'

export type MainContractConfig = {
  number: number
  address: Address
  owner_address: Address
}

export class MainContract implements Contract {
  constructor(
    readonly address: Address,
    readonly init?: { code: Cell; data: Cell }
  ) {}

  async getJettonWalletAddress(
    provider: ContractProvider,
    ownerAddress: string
  ) {
    const { stack } = await provider.get('get_wallet_address', [
      {
        type: 'slice',
        cell: beginCell().storeAddress(Address.parse(ownerAddress)).endCell(),
      },
    ])
    return {
      jettonWalletAddr: stack.readAddress(),
    }
  }

  async getBalance(provider: ContractProvider) {
    const { stack } = await provider.get('get_wallet_data', [])
    return {
      balance: stack.readNumber(),
    }
  }
}
