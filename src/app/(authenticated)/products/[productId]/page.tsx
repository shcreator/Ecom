'use client'

import { Typography, Button, Space, Image, Spin, InputNumber } from 'antd'
import { ShoppingCartOutlined, DollarOutlined } from '@ant-design/icons'
import { useState } from 'react'
const { Title, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function ProductDetailsPage() {
  const router = useRouter()
  const params = useParams<{ productId: string }>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [quantity, setQuantity] = useState(1)

  const { data: product, isLoading } = Api.product.findUnique.useQuery({
    where: { id: params.productId },
  })

  const { mutateAsync: addToCart } = Api.cartItem.create.useMutation()
  const { mutateAsync: createOrder } = Api.order.create.useMutation()

  const handleAddToCart = async () => {
    if (!user) {
      enqueueSnackbar('Please log in to add items to your cart', {
        variant: 'info',
      })
      return
    }

    try {
      await addToCart({
        data: {
          quantity,
          userId: user.id,
          productId: params.productId,
        },
      })
      enqueueSnackbar('Product added to cart successfully', {
        variant: 'success',
      })
    } catch (error) {
      enqueueSnackbar('Failed to add product to cart', { variant: 'error' })
    }
  }

  const handleBuyNow = async () => {
    if (!user) {
      enqueueSnackbar('Please log in to make a purchase', { variant: 'info' })
      return
    }

    try {
      const order = await createOrder({
        data: {
          userId: user.id,
          totalAmount: (product?.price || 0) * quantity,
          status: 'PENDING',
          orderItems: {
            create: [
              {
                quantity,
                unitPrice: product?.price || 0,
                totalPrice: (product?.price || 0) * quantity,
                productId: params.productId,
              },
            ],
          },
        },
      })
      router.push('/checkout')
    } catch (error) {
      enqueueSnackbar('Failed to create order', { variant: 'error' })
    }
  }

  if (isLoading) {
    return (
      <PageLayout layout="narrow">
        <Spin size="large" />
      </PageLayout>
    )
  }

  if (!product) {
    return (
      <PageLayout layout="narrow">
        <Title level={2}>Product not found</Title>
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Product Details</Title>
      <Paragraph>
        View detailed information about this digital product
      </Paragraph>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Image
          src={product.imageUrl || 'https://placehold.co/600x400?text=No+Image'}
          alt={product.name || 'Product Image'}
          width={300}
        />
        <Title level={3}>{product.name}</Title>
        <Paragraph>{product.description}</Paragraph>
        <Title level={4}>Price: ${product.price?.toFixed(2)}</Title>
        <Space>
          <InputNumber
            min={1}
            max={product.stock || 1}
            value={quantity}
            onChange={value => setQuantity(value || 1)}
          />
          <Button
            type="primary"
            icon={<ShoppingCartOutlined />}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
          <Button
            type="primary"
            icon={<DollarOutlined />}
            onClick={handleBuyNow}
          >
            Buy Now
          </Button>
        </Space>
      </Space>
    </PageLayout>
  )
}
