'use client'

import { useState } from 'react'
import { Typography, Input, Card, Col, Row, Button } from 'antd'
import { ShoppingCartOutlined, SearchOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function HomePage() {
  const router = useRouter()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [searchTerm, setSearchTerm] = useState('')

  const { data: products, isLoading } = Api.product.findMany.useQuery({})

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
    } else {
      enqueueSnackbar('Please enter a search term', { variant: 'info' })
    }
  }

  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`)
  }

  const handleDashboardClick = () => {
    if (user) {
      router.push('/settings')
    } else {
      enqueueSnackbar('Please log in to access the dashboard', {
        variant: 'info',
      })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Digital Products Marketplace</Title>
      <Text>Browse and purchase digital products with ease.</Text>

      <div style={{ marginTop: 20, marginBottom: 20 }}>
        <Input
          placeholder="Search for products"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onPressEnter={handleSearch}
          suffix={
            <SearchOutlined
              onClick={handleSearch}
              style={{ cursor: 'pointer' }}
            />
          }
        />
      </div>

      <Button onClick={handleDashboardClick} style={{ marginBottom: 20 }}>
        Access Dashboard
      </Button>

      {isLoading ? (
        <Text>Loading products...</Text>
      ) : (
        <Row gutter={[16, 16]}>
          {products?.map(product => (
            <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
              <Card
                hoverable
                cover={
                  <img
                    alt={product.name}
                    src={product.imageUrl || 'https://placehold.co/300x200'}
                  />
                }
                onClick={() => handleProductClick(product.id)}
              >
                <Card.Meta
                  title={product.name}
                  description={
                    <>
                      <Text>{product.description}</Text>
                      <div>
                        <Text strong>${product.price?.toFixed(2)}</Text>
                        <ShoppingCartOutlined style={{ marginLeft: 8 }} />
                      </div>
                    </>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </PageLayout>
  )
}
