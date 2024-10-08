'use client'

import { Typography, List, Card, Button, Row, Col, Spin } from 'antd'
import { ShoppingCartOutlined, CheckCircleOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function CheckoutPage() {
  const router = useRouter()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const { data: cartItems, isLoading: isLoadingCart } =
    Api.cartItem.findMany.useQuery({
      where: { userId: user?.id },
      include: { product: true },
    })

  const { mutateAsync: createOrder } = Api.order.create.useMutation()
  const { mutateAsync: createTransaction } =
    Api.transaction.create.useMutation()
  const { mutateAsync: deleteCartItem } = Api.cartItem.delete.useMutation()

  const totalAmount =
    cartItems?.reduce(
      (sum, item) => sum + (item.quantity || 0) * (item.product?.price || 0),
      0,
    ) || 0

  const handlePurchase = async () => {
    if (!user?.id || !cartItems || cartItems.length === 0) {
      enqueueSnackbar('Your cart is empty', { variant: 'error' })
      return
    }

    try {
      const order = await createOrder({
        data: {
          userId: user.id,
          totalAmount,
          status: 'COMPLETED',
          orderItems: {
            create: cartItems.map(item => ({
              productId: item.productId,
              quantity: item.quantity || 0,
              unitPrice: item.product?.price || 0,
              totalPrice: (item.quantity || 0) * (item.product?.price || 0),
            })),
          },
        },
      })

      await createTransaction({
        data: {
          userId: user.id,
          orderId: order.id,
          amount: totalAmount,
          status: 'COMPLETED',
          paymentMethod: 'WALLET',
          transactionDate: new Date().toISOString(),
        },
      })

      for (const item of cartItems) {
        await deleteCartItem({ where: { id: item.id } })
      }

      enqueueSnackbar('Purchase completed successfully', { variant: 'success' })
      router.push('/my-orders')
    } catch (error) {
      console.error('Purchase failed:', error)
      enqueueSnackbar('Purchase failed. Please try again.', {
        variant: 'error',
      })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>
        <ShoppingCartOutlined /> Checkout
      </Title>
      <Text>Review your cart and complete your purchase</Text>

      {isLoadingCart ? (
        <Spin size="large" />
      ) : (
        <>
          <List
            dataSource={cartItems}
            renderItem={item => (
              <List.Item>
                <Card style={{ width: '100%' }}>
                  <Row gutter={16} align="middle">
                    <Col span={16}>
                      <Text strong>{item.product?.name}</Text>
                      <br />
                      <Text>Quantity: {item.quantity}</Text>
                    </Col>
                    <Col span={8} style={{ textAlign: 'right' }}>
                      <Text>
                        $
                        {(
                          (item.product?.price || 0) * (item.quantity || 0)
                        ).toFixed(2)}
                      </Text>
                    </Col>
                  </Row>
                </Card>
              </List.Item>
            )}
          />

          <Card style={{ marginTop: 16 }}>
            <Row justify="space-between" align="middle">
              <Col>
                <Text strong>Total Amount:</Text>
              </Col>
              <Col>
                <Text strong>${totalAmount.toFixed(2)}</Text>
              </Col>
            </Row>
          </Card>

          <Button
            type="primary"
            icon={<CheckCircleOutlined />}
            size="large"
            style={{ marginTop: 16, width: '100%' }}
            onClick={handlePurchase}
            disabled={!cartItems || cartItems.length === 0}
          >
            Complete Purchase
          </Button>
        </>
      )}
    </PageLayout>
  )
}
