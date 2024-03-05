import { useCallback, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import matter from 'gray-matter'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { getPostByFilename } from 'api'
import { PostFileType } from 'api/types'
import { launchpadWebAppUrl } from 'constants/app'
import * as S from 'domains/Post/styles'
import { BackButton } from 'features/BackButton'
import { MarkdownRenderer } from 'features/MarkdownRenderer'
import { useTelegram } from 'hooks/useTelegram/useTelegram'
import { Container } from 'ui/Container/Container'
import { Line } from 'ui/Line/Line'
import { Loader } from 'ui/Loader/Loader'

const Post = () => {
  const [isPostImageLoaded, setIsPostImageLoaded] = useState<boolean>(false)

  const router = useRouter()

  const { webApp } = useTelegram()

  const { fileName } = router.query

  useEffect(() => {
    webApp?.expand()
  }, [webApp])

  const {
    data: post,
    isLoading: isPostLoading,
    isSuccess: isPostLoaded,
  } = useQuery({
    queryKey: ['post', fileName],
    queryFn: () => getPostByFilename({ fileName: fileName as string }),
    enabled: !!fileName,
    select: useCallback((data: PostFileType) => {
      const { data: frontmatter, content } = matter(data.content)

      return {
        fileName: data.filename,
        frontmatter,
        content,
      }
    }, []),
  })

  if (isPostLoading) {
    return <Loader type="postPage" />
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
            onLoad={() => setIsPostImageLoaded(true)}
            src={launchpadWebAppUrl + post.frontmatter.socialImage}
          />
          {isPostImageLoaded && (
            <>
              <S.Title>{post.frontmatter.title}</S.Title>
              <Line />
              <Container>
                <MarkdownRenderer mdContent={post.content} />
              </Container>
            </>
          )}
        </main>
      </>
    )
  }

  return null
}

export default Post
