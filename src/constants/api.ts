export const LAUNCHPAD_BASE_API_URL = 'https://launchpad-front-end.vercel.app'

export const ApiRoutes = {
  GetICOProjects: '/api/jettons/getICOJettons',
  GetICOProjectById: '/api/jettons/getICOJettonById',
  GetBlogPosts: '/api/blog/getPosts',
  GetBlogPostByFilename: '/api/blog/getPostByFilename',
  GetProfile: '/api/profile/getProfile',
  SaveProfile: '/api/profile/saveProfile',
} as const
