'use client'

import { useState, useEffect } from 'react'
import { Typography, Input, List, Card, Space, Button } from 'antd'
import {
  SearchOutlined,
  ShoppingOutlined,
  ReadOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function SearchResultsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [searchQuery, setSearchQuery] = useState(params.query || '')
  const [products, setProducts] = useState([])
  const [blogPosts, setBlogPosts] = useState([])

  const { data: productData, isLoading: isLoadingProducts } =
    Api.product.findMany.useQuery({
      where: {
        OR: [
          { name: { contains: searchQuery, mode: 'insensitive' } },
          { description: { contains: searchQuery, mode: 'insensitive' } },
        ],
      },
    })

  const { data: blogPostData, isLoading: isLoadingBlogPosts } =
    Api.blogPost.findMany.useQuery({
      where: {
        OR: [
          { title: { contains: searchQuery, mode: 'insensitive' } },
          { content: { contains: searchQuery, mode: 'insensitive' } },
        ],
      },
    })

  useEffect(() => {
    if (productData) setProducts(productData)
    if (blogPostData) setBlogPosts(blogPostData)
  }, [productData, blogPostData])

  const handleSearch = () => {
    router.push(`/search?query=${encodeURIComponent(searchQuery)}`)
  }

  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`)
  }

  const handleBlogPostClick = (postId: string) => {
    router.push(`/blog/${postId}`)
  }

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Search Results</Title>
        <Text>Refine your search or explore our products and blog posts.</Text>

        <Input
          placeholder="Search for products or blog posts"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          onPressEnter={handleSearch}
          suffix={
            <SearchOutlined
              onClick={handleSearch}
              style={{ cursor: 'pointer' }}
            />
          }
        />

        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Title level={3}>Products</Title>
          <List
            grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 3 }}
            dataSource={products}
            loading={isLoadingProducts}
            renderItem={(item: any) => (
              <List.Item>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={item.name}
                      src={item.imageUrl || 'https://via.placeholder.com/150'}
                    />
                  }
                  onClick={() => handleProductClick(item.id)}
                >
                  <Card.Meta
                    title={item.name}
                    description={
                      <>
                        <Text>{item.description}</Text>
                        <br />
                        <Text strong>${item.price?.toFixed(2)}</Text>
                      </>
                    }
                  />
                  <Button
                    icon={<ShoppingOutlined />}
                    style={{ marginTop: '10px' }}
                  >
                    View Product
                  </Button>
                </Card>
              </List.Item>
            )}
          />

          <Title level={3}>Blog Posts</Title>
          <List
            itemLayout="vertical"
            dataSource={blogPosts}
            loading={isLoadingBlogPosts}
            renderItem={(item: any) => (
              <List.Item
                key={item.id}
                extra={
                  <img
                    width={272}
                    alt="blog post image"
                    src={item.imageUrl || 'https://via.placeholder.com/272x150'}
                  />
                }
              >
                <List.Item.Meta
                  title={
                    <a onClick={() => handleBlogPostClick(item.id)}>
                      {item.title}
                    </a>
                  }
                  description={item.content}
                />
                <Button
                  icon={<ReadOutlined />}
                  onClick={() => handleBlogPostClick(item.id)}
                >
                  Read More
                </Button>
              </List.Item>
            )}
          />
        </Space>
      </Space>
    </PageLayout>
  )
}
