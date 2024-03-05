import { FC, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import matter from 'gray-matter'

import { getPosts } from 'api'
import { PostFileType } from 'api/types'
import { PostCard } from './components'
import * as S from './style'
import { Loader } from '../Projectslist/style'

export const PostsList: FC = () => {
  const {
    data: posts,
    isLoading: isPostsLoading,
    isSuccess: isPostsLoaded,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts(),
    select: useCallback((data: PostFileType[]) => {
      const formatedPostsData = data.map((post: PostFileType) => {
        const { data: frontmatter } = matter(post.content)

        return {
          fileName: post.filename,
          frontmatter,
        }
      })

      return formatedPostsData
    }, []),
  })

  if (isPostsLoading) {
    return <Loader type="postCard" />
  }

  if (isPostsLoaded) {
    return (
      <S.Wrapper>
        {posts.map(({ fileName, frontmatter }, idx) => (
          <PostCard
            key={idx}
            fileName={fileName}
            image={frontmatter.socialImage}
            title={frontmatter.title}
          />
        ))}
      </S.Wrapper>
    )
  }

  return null
}
