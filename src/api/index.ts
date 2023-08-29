import { ApiRoutes } from 'constants/api'
import { AXIOS_LAUNCHPAD_INSTANCE } from 'libs/axios-instance/axios-instance'

export const getICOJettons = async () => {
  const { data } = await AXIOS_LAUNCHPAD_INSTANCE.get(ApiRoutes.GetICOProjects)

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
