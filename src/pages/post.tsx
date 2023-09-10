import { useCallback } from 'react'
import matter from 'gray-matter'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { getPostByFilename } from 'api'
import { PostFileType } from 'api/types'
import { launchpadWebAppUrl } from 'constants/app'
import * as S from 'domains/Post/styles'
import { BackButton } from 'features/BackButton'
import { MarkdownRenderer } from 'features/MarkdownRenderer'
import { Container } from 'ui/Container/Container'
import { Line } from 'ui/Line/Line'
import { Loader } from 'ui/Loader/Loader'

const Post = () => {
  const router = useRouter()

  const { fileName } = router.query

  const {
    data: post,
    isLoading: isPostLoading,
    isSuccess: isPostLoaded,
  } = useQuery(
    ['post'],
    () => getPostByFilename({ fileName: fileName as string }),
    {
      enabled: !!fileName,
      select: useCallback((data: PostFileType[]) => {
        const post = data[0]

        const { data: frontmatter, content } = matter(post.content)

        return {
          fileName: post.filename,
          frontmatter,
          content,
        }
      }, []),
    }
  )

  if (isPostLoading) {
    return <Loader type="projectPage" />
  }

  if (isPostLoaded) {
    return (
      <>
        <Head>
          <title>{post.frontmatter.title}</title>
        </Head>
        <main>
          <BackButton onClick={() => router.back()} />
          <S.Image
            alt="post_image"
            height={170}
            src={launchpadWebAppUrl + post.frontmatter.socialImage}
            style={{ width: '100%', height: 'auto' }}
            width={370}
          />
          <S.Title>{post.frontmatter.title}</S.Title>
          <Line />
          <Container>
            <MarkdownRenderer mdContent={post.content} />
          </Container>
        </main>
      </>
    )
  }
}

export default Post
