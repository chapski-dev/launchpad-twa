import { ApiRoutes } from 'constants/api'
import {
  AXIOS_LAUNCHPAD_INSTANCE,
  AXIOS_XAPI_LAUNCHPAD_INSTANCE,
} from 'libs/axios-instance/axios-instance'
import { ProfileInfoType } from './types'

export interface GetICOJettonsRes {
  name: string
  description: string
  image: string
  symbol: string
  id: string
}
export const getICOJettons = (params?: { q: string }) =>
  AXIOS_XAPI_LAUNCHPAD_INSTANCE.get<GetICOJettonsRes[]>(
    ApiRoutes.GetICOProjects,
    { params }
  ).then((res) => res.data)

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

export const getICOProjectById = (id: string) =>
  AXIOS_XAPI_LAUNCHPAD_INSTANCE.get<GetICOProjectByIdRes>(
    `${ApiRoutes.GetICOProjectById}/${id}`
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
  const { data } = await AXIOS_LAUNCHPAD_INSTANCE.post(ApiRoutes.SaveProfile, {
    ...profileData,
  })

  return data
}
