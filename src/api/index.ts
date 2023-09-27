import { ApiRoutes } from 'constants/api'
import { AXIOS_LAUNCHPAD_INSTANCE } from 'libs/axios-instance/axios-instance'
import { ProfileInfoType } from './types'

export const getICOJettons = async (params: {
  search: string
  isFake?: boolean
}) => {
  const { data } = await AXIOS_LAUNCHPAD_INSTANCE.get(
    ApiRoutes.GetICOProjects,
    { params }
  )

  return data
}

export const getICOProjectById = async (id: string) => {
  const { data } = await AXIOS_LAUNCHPAD_INSTANCE.get(
    ApiRoutes.GetICOProjectById,
    {
      params: { id },
    }
  )

  return data
}

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
