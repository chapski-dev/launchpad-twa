export const LAUNCHPAD_BASE_API_URL = 'https://tokenova.fi/'
export const XAPI_LAUNCHPAD_BASE_API_URL = 'https://xapi.tokenova.fi/'

export const ApiRoutes = {
  GetICOProjects: '/launchpad/projects',
  GetICOProjectById: '/launchpad/projects',
  GetBlogPosts: '/api/blog/getPosts',
  GetBlogPostByFilename: '/api/blog/getPostByFilename',
  GetProfile: '/api/profile/getProfile',
  SaveProfile: '/api/profile/saveProfile',
} as const
