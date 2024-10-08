'use client'

import { Typography, Spin, Button, Space } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
const { Title, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function BlogPostDetailsPage() {
  const router = useRouter()
  const params = useParams<{ postId: string }>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const { data: blogPost, isLoading } = Api.blogPost.findUnique.useQuery({
    where: { id: params.postId },
    include: { user: true },
  })

  const { data: nextPost } = Api.blogPost.findFirst.useQuery({
    where: { id: { gt: params.postId } },
    orderBy: { id: 'asc' },
  })

  const { data: prevPost } = Api.blogPost.findFirst.useQuery({
    where: { id: { lt: params.postId } },
    orderBy: { id: 'desc' },
  })

  if (isLoading) {
    return (
      <PageLayout layout="narrow">
        <Spin size="large" />
      </PageLayout>
    )
  }

  if (!blogPost) {
    enqueueSnackbar('Blog post not found', { variant: 'error' })
    router.push('/blog')
    return null
  }

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={1}>{blogPost.title}</Title>
        <Paragraph type="secondary">
          By {blogPost.user?.name} on{' '}
          {dayjs(blogPost.dateCreated).format('MMMM D, YYYY')}
        </Paragraph>
        {blogPost.imageUrl && (
          <img
            src={blogPost.imageUrl}
            alt={blogPost.title}
            style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
          />
        )}
        <Paragraph>{blogPost.content}</Paragraph>
        <Space>
          {prevPost && (
            <Button
              type="primary"
              icon={<LeftOutlined />}
              onClick={() => router.push(`/blog/${prevPost.id}`)}
            >
              Previous Post
            </Button>
          )}
          {nextPost && (
            <Button
              type="primary"
              icon={<RightOutlined />}
              onClick={() => router.push(`/blog/${nextPost.id}`)}
              style={{ marginLeft: 'auto' }}
            >
              Next Post
            </Button>
          )}
        </Space>
      </Space>
    </PageLayout>
  )
}
