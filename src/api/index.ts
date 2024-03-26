import { ApiRoutes, XAPI_LAUNCHPAD_BASE_API_URL, XApiRoutes } from 'constants/api'
import {
  AXIOS_LAUNCHPAD_INSTANCE,
  AXIOS_XAPI_LAUNCHPAD_INSTANCE,
} from 'libs/axios-instance/axios-instance'
import { GetICOJettonsRes, GetICOProjectByIdRes, GetXapiProfileResp, ProfileInfoType, TONPriceResponse, WhitelistResponse } from './types'
import { retrieveLaunchParams } from '@tma.js/sdk';
import { WhitelistPayload } from '@xton/user-sdk/dist/core/func';
import { Cell } from 'ton-core';

export const getICOJettons = (params?: { q: string }) =>
  AXIOS_XAPI_LAUNCHPAD_INSTANCE.get<GetICOJettonsRes[]>(
    XApiRoutes.LaunchpadProjects,
    { params }
  ).then((res) => res.data)

export const getICOProjectById = (id: string) =>
  AXIOS_XAPI_LAUNCHPAD_INSTANCE.get<GetICOProjectByIdRes>(
    `${XApiRoutes.LaunchpadProjects}/${id}`
  ).then((res) => res.data)

export const getPosts = async () => {
  const { data } = await AXIOS_LAUNCHPAD_INSTANCE.get(ApiRoutes.GetBlogPosts)

  return data
}

export const getPostByFilename = async (params: { fileName: string }) => {
  const { data } = await AXIOS_LAUNCHPAD_INSTANCE.get(
    ApiRoutes.GetBlogPostByFilename,
    { params }
  )

  return data
}

export const getProfile = async (params: {
  telegram?: string
  walletAddress?: string
  referral_code?: string
}) => {
  const { data } = await AXIOS_LAUNCHPAD_INSTANCE.get(ApiRoutes.GetProfile, {
    params,
  })

  return data
}

export const saveProfile = async (profileData: ProfileInfoType) => {
  const { data } = await AXIOS_LAUNCHPAD_INSTANCE.post(ApiRoutes.CreateUser, {
    ...profileData,
  })

  return data
}

export const createUser = async () => {
  let params = retrieveLaunchParams();
  let r = params.initDataRaw;
  const { data } = await AXIOS_XAPI_LAUNCHPAD_INSTANCE.post(ApiRoutes.CreateUser, {}, {headers: {
    Authorization: `Bearer ${btoa(r!)}`,
  }})

  return data
}

export const connectWallet = async (network: string, address: string) => {
  let params = retrieveLaunchParams();
  let r = params.initDataRaw;
  const { data } = await AXIOS_XAPI_LAUNCHPAD_INSTANCE.patch(ApiRoutes.ConnectWallet, {
    network,
    address,
  }, {headers: {
    Authorization: `Bearer ${btoa(r!)}`,
  }})

  return data
}

export const queryWhitelist = async (network: string, saleId: string, pool: number) => {
  let params = retrieveLaunchParams();
  let r = params.initData;
  const { data } = await AXIOS_XAPI_LAUNCHPAD_INSTANCE.get<WhitelistResponse>(`${ApiRoutes.Sale}/${saleId}/${network}/${pool}/${r?.user?.id}`, {headers: {
    // Authorization: `Bearer ${btoa(r!)}`,
  }})

  return data
}

export const queryTONPrice = async () => {
  const { data } = await AXIOS_XAPI_LAUNCHPAD_INSTANCE.get<TONPriceResponse>(`${ApiRoutes.Sale}/ton/price`, {headers: {
    // Authorization: `Bearer ${btoa(r!)}`,
  }})

  return data
}

export const estimateBuyAmount = async (saleId: string, network: string, pool: number, amount: bigint) => {
  let params = retrieveLaunchParams();
  let r = params.initData;

  const { data } = await AXIOS_XAPI_LAUNCHPAD_INSTANCE.get<{tonAmount: string; tokenAmount: string;}>(`${ApiRoutes.Sale}/estimate/${saleId}/${network}/${pool}/${r?.user?.id}/${amount}`, {headers: {
    // Authorization: `Bearer ${btoa(r!)}`,
  }})

  return {
    tonAmount: BigInt(data.tonAmount),
    tokenAmount: BigInt(data.tokenAmount),
  }
}

export const getUserContractAddress = async (saleId: string) => {  
  let params = retrieveLaunchParams();
  let r = params.initData;
  const { data } = await AXIOS_XAPI_LAUNCHPAD_INSTANCE.get<{address: string}>(`${ApiRoutes.Sale}/${saleId}/TON/${r?.user?.id}/address`, {headers: {
    // Authorization: `Bearer ${btoa(r!)}`,
  }})

  return data.address
}

export const queryUserSaleState = async (saleId: string, allocationMode: string) => {  
  let params = retrieveLaunchParams();
  let r = params.initData;
  const { data } = await AXIOS_XAPI_LAUNCHPAD_INSTANCE.get(`${ApiRoutes.Sale}/${saleId}/${allocationMode}/${r?.user?.id}/state`, {headers: {
    // Authorization: `Bearer ${btoa(r!)}`,
  }})

  if (data.state == 'bought') {
    data.bought = Number(data.bought);
    data.lockedBalance = Number(data.lockedBalance);
    data.currentBalance = Number(data.currentBalance);
    data.availableClaim.amount = Number(data.availableClaim.amount);
    data.schedule.start = data.schedule.start * 1000;
    data.schedule.end = data.schedule.end * 1000;
  }
  return data
}


export const checkTransaction = async (boc: string) => {
  let hh  = Cell.fromBase64(boc).hash().toString('hex')
  const { data } = await AXIOS_XAPI_LAUNCHPAD_INSTANCE.get<{exists: boolean;}>(`${ApiRoutes.Chain}/ton/transaction/${hh}/exists`, {headers: {
    // Authorization: `Bearer ${btoa(r!)}`,
  }})

  return data.exists
}

export const getXapiProfile = async (params: {
  flag: 'pending-kyc' | 'new' | 'done' | 'done2'
}) => {
  const { data } = await AXIOS_XAPI_LAUNCHPAD_INSTANCE.get<GetXapiProfileResp>(XApiRoutes.UserProfile, {
    params,
  })

  return data
}