export type PostFileType = {
  filename: string
  content: string
}

export type ProfileInfoType = {
  email: string
  name: string
  telegram: string
  walletAddress?: string
  referrer_id: string
  image?: string
  telegramInitData: string
}
//* -------------- GetICOJettonsRes --------------
export type GetICOJettonsRes = {
  name: string
  description: string
  image: string
  symbol: string
  id: string
}
//* -------------- GetICOProjectByIdRes --------------
export type GetICOProjectByIdRes = {
  id: string
  name: string
  description: string
  image: string
  symbol: string
  page_data: string
  tokenomics: Tokenomic[]
}
export type Tokenomic = {
  name: string
  amount: string
}

//* -------------- GetXapiProfileResp --------------
export type GetXapiProfileResp = {
  state: 'unverified' | 'verified'
  wallets: Wallets
  kyc: Kyc
  social: Social[]
}

export type Wallets = {
  connected: Connected[]
  task: Task
}

export type Connected = {
  type: string
  network: string
  address: string
}

export type Task = {
  title: string
  description: string
  optional: boolean
  done: boolean
}

export type Kyc = {
  task: KycTask
}

export type KycTask = {
  title: string
  description: string
  optional: boolean
  state: 'not-started' | 'pending' | 'done'
}

export type Social = {
  type: 'telegram' | 'twitter'
  id: string
  address: string
  joined: boolean
  optional: boolean
  title?: string
}
