'use client'

import { useState } from 'react'
import { Typography, Input, Card, List, Space, Row, Col } from 'antd'
import { SearchOutlined, ReadOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function BlogPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [searchTerm, setSearchTerm] = useState('')

  const { data: blogPosts, isLoading } = Api.blogPost.findMany.useQuery({
    include: { user: true },
    orderBy: { dateCreated: 'desc' },
  })

  const filteredPosts = blogPosts?.filter(
    post =>
      post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handlePostClick = (postId: string) => {
    router.push(`/blog/${postId}`)
  }

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={1}>Blog Posts</Title>
        <Paragraph>
          Stay updated with the latest news and information related to our
          platform.
        </Paragraph>

        <Input
          prefix={<SearchOutlined />}
          placeholder="Search blog posts..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ marginBottom: 16 }}
        />

        {isLoading ? (
          <Text>Loading blog posts...</Text>
        ) : (
          <List
            grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 2, xl: 3, xxl: 3 }}
            dataSource={filteredPosts}
            renderItem={post => (
              <List.Item>
                <Card
                  hoverable
                  cover={
                    post.imageUrl && (
                      <img
                        alt={post.title}
                        src={post.imageUrl}
                        style={{ height: 200, objectFit: 'cover' }}
                      />
                    )
                  }
                  onClick={() => handlePostClick(post.id)}
                >
                  <Card.Meta
                    title={post.title}
                    description={
                      <Space direction="vertical">
                        <Text type="secondary">
                          By {post.user?.name} on{' '}
                          {dayjs(post.dateCreated).format('MMMM D, YYYY')}
                        </Text>
                        <Paragraph ellipsis={{ rows: 3 }}>
                          {post.content}
                        </Paragraph>
                      </Space>
                    }
                  />
                  <Row
                    align="middle"
                    justify="space-between"
                    style={{ marginTop: 16 }}
                  >
                    <Col>
                      <Space>
                        <ReadOutlined />
                        <Text>Read more</Text>
                      </Space>
                    </Col>
                  </Row>
                </Card>
              </List.Item>
            )}
          />
        )}
      </Space>
    </PageLayout>
  )
}
