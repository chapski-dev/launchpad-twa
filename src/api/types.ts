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
export interface GetICOJettonsRes {
  name: string
  description: string
  image: string
  symbol: string
  id: string
}
//* -------------- GetICOProjectByIdRes --------------
export interface GetICOProjectByIdRes {
  id: string
  name: string
  description: string
  image: string
  symbol: string
  page_data: string
  tokenomics: Tokenomic[]
}
export interface Tokenomic {
  name: string
  amount: string
}

//* -------------- GetXapiProfileResp --------------
export interface GetXapiProfileResp {
  state: 'unverified' | 'verified'
  wallets: Wallets
  kyc: Kyc
  social: Social[]
}

export interface Wallets {
  connected: Connected[]
  task: Task
}

export interface Connected {
  type: string
  network: string
  address: string
}

export interface Task {
  title: string
  description: string
  optional: boolean
  done: boolean
}

export interface Kyc {
  task: KycTask
}

export interface KycTask {
  title: string
  description: string
  optional: boolean
  state: 'not-started' | 'pending' | 'done'
}

export interface Social {
  type: string
  id: string
  address: string
  joined: boolean
  optional: boolean
  title?: string
}
