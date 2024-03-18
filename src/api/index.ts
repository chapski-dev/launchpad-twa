import { ApiRoutes, XApiRoutes } from 'constants/api'
import {
  AXIOS_LAUNCHPAD_INSTANCE,
  AXIOS_XAPI_LAUNCHPAD_INSTANCE,
} from 'libs/axios-instance/axios-instance'
import { GetICOJettonsRes, GetICOProjectByIdRes, GetXapiProfileResp, ProfileInfoType } from './types'

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
  const { data } = await AXIOS_LAUNCHPAD_INSTANCE.post(ApiRoutes.SaveProfile, {
    ...profileData,
  })

  return data
}

export const getXapiProfile = async (params: {
  flag: 'pending-kyc' | 'new' | 'done' | 'done2'
}) => {
  const { data } = await AXIOS_XAPI_LAUNCHPAD_INSTANCE.get<GetXapiProfileResp>(XApiRoutes.UserProfile, {
    params,
  })

  return data
}