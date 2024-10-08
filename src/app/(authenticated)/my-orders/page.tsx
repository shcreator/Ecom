'use client'

import { Typography, List, Button, Space, Card } from 'antd'
import { DownloadOutlined, ShoppingOutlined } from '@ant-design/icons'
const { Title, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function MyOrdersPage() {
  const router = useRouter()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const { data: orders, isLoading } = Api.order.findMany.useQuery({
    where: { userId: user?.id },
    include: { orderItems: { include: { product: true } } },
    orderBy: { dateCreated: 'desc' },
  })

  const handleDownload = (
    productUrl: string | undefined,
    productName: string,
  ) => {
    if (!productUrl) {
      enqueueSnackbar('Download link not available', { variant: 'error' })
      return
    }

    // In a real scenario, you'd implement the actual download logic here
    // For now, we'll just show a success message
    enqueueSnackbar(`Downloading ${productName}`, { variant: 'success' })
  }

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>My Purchased Digital Products</Title>
        <Paragraph>
          Here you can view and download all the digital products you've
          purchased.
        </Paragraph>

        {isLoading ? (
          <Paragraph>Loading your orders...</Paragraph>
        ) : orders && orders.length > 0 ? (
          <List
            grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 3 }}
            dataSource={orders}
            renderItem={order => (
              <List.Item>
                <Card title={`Order #${order.id.slice(0, 8)}`}>
                  <Paragraph>
                    Date: {dayjs(order.dateCreated).format('MMMM D, YYYY')}
                  </Paragraph>
                  <Paragraph>Total: ${order.totalAmount?.toFixed(2)}</Paragraph>
                  <List
                    dataSource={order.orderItems}
                    renderItem={item => (
                      <List.Item>
                        <Space direction="vertical">
                          <Paragraph strong>{item.product?.name}</Paragraph>
                          <Button
                            icon={<DownloadOutlined />}
                            onClick={() =>
                              handleDownload(
                                item.product?.imageUrl,
                                item.product?.name || 'Product',
                              )
                            }
                          >
                            Download
                          </Button>
                        </Space>
                      </List.Item>
                    )}
                  />
                </Card>
              </List.Item>
            )}
          />
        ) : (
          <Space direction="vertical" align="center" style={{ width: '100%' }}>
            <ShoppingOutlined style={{ fontSize: 48 }} />
            <Paragraph>
              You haven't purchased any digital products yet.
            </Paragraph>
            <Button type="primary" onClick={() => router.push('/home')}>
              Browse Products
            </Button>
          </Space>
        )}
      </Space>
    </PageLayout>
  )
}
