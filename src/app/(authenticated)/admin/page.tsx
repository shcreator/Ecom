'use client'

import {
  Typography,
  Tabs,
  Card,
  List,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Upload,
} from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  SettingOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
const { Title, Text } = Typography
const { TabPane } = Tabs
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function AdminDashboardPage() {
  const router = useRouter()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [activeTab, setActiveTab] = useState('1')
  const [modalVisible, setModalVisible] = useState(false)
  const [modalType, setModalType] = useState('')
  const [form] = Form.useForm()
  const { mutateAsync: upload } = useUploadPublic()

  const { data: products, refetch: refetchProducts } =
    Api.product.findMany.useQuery({})
  const { data: blogPosts, refetch: refetchBlogPosts } =
    Api.blogPost.findMany.useQuery({})
  const { data: users, refetch: refetchUsers } = Api.user.findMany.useQuery({})
  const { data: orders, refetch: refetchOrders } = Api.order.findMany.useQuery(
    {},
  )

  const { mutateAsync: createProduct } = Api.product.create.useMutation()
  const { mutateAsync: updateProduct } = Api.product.update.useMutation()
  const { mutateAsync: deleteProduct } = Api.product.delete.useMutation()

  const { mutateAsync: createBlogPost } = Api.blogPost.create.useMutation()
  const { mutateAsync: updateBlogPost } = Api.blogPost.update.useMutation()
  const { mutateAsync: deleteBlogPost } = Api.blogPost.delete.useMutation()

  const { mutateAsync: updateUser } = Api.user.update.useMutation()
  const { mutateAsync: deleteUser } = Api.user.delete.useMutation()

  const { mutateAsync: updateOrder } = Api.order.update.useMutation()

  const handleTabChange = (key: string) => {
    setActiveTab(key)
  }

  const showModal = (type: string, item?: any) => {
    setModalType(type)
    setModalVisible(true)
    if (item) {
      form.setFieldsValue(item)
    } else {
      form.resetFields()
    }
  }

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields()
      if (modalType === 'product') {
        if (form.getFieldValue('id')) {
          await updateProduct({
            where: { id: form.getFieldValue('id') },
            data: values,
          })
        } else {
          await createProduct({ data: values })
        }
        refetchProducts()
      } else if (modalType === 'blogPost') {
        if (form.getFieldValue('id')) {
          await updateBlogPost({
            where: { id: form.getFieldValue('id') },
            data: values,
          })
        } else {
          await createBlogPost({ data: { ...values, userId: user?.id } })
        }
        refetchBlogPosts()
      }
      setModalVisible(false)
      enqueueSnackbar('Operation successful', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('An error occurred', { variant: 'error' })
    }
  }

  const handleDelete = async (type: string, id: string) => {
    try {
      if (type === 'product') {
        await deleteProduct({ where: { id } })
        refetchProducts()
      } else if (type === 'blogPost') {
        await deleteBlogPost({ where: { id } })
        refetchBlogPosts()
      } else if (type === 'user') {
        await deleteUser({ where: { id } })
        refetchUsers()
      }
      enqueueSnackbar('Item deleted successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('An error occurred while deleting', { variant: 'error' })
    }
  }

  const handleImageUpload = async (options: any) => {
    const { file, onSuccess, onError } = options
    try {
      const { url } = await upload({ file })
      onSuccess(url)
    } catch (error) {
      onError('Image upload failed')
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Admin Dashboard</Title>
      <Text>
        Manage your digital products, blog posts, settings, users, and orders.
      </Text>

      <Tabs
        activeKey={activeTab}
        onChange={handleTabChange}
        style={{ marginTop: 20 }}
      >
        <TabPane tab="Products" key="1">
          <Button
            icon={<PlusOutlined />}
            onClick={() => showModal('product')}
            style={{ marginBottom: 16 }}
          >
            Add Product
          </Button>
          <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={products}
            renderItem={(item: any) => (
              <List.Item>
                <Card
                  cover={
                    <img
                      alt={item.name}
                      src={item.imageUrl}
                      style={{ height: 200, objectFit: 'cover' }}
                    />
                  }
                  actions={[
                    <EditOutlined
                      key="edit"
                      onClick={() => showModal('product', item)}
                    />,
                    <DeleteOutlined
                      key="delete"
                      onClick={() => handleDelete('product', item.id)}
                    />,
                  ]}
                >
                  <Card.Meta
                    title={item.name}
                    description={`$${item.price?.toString()}`}
                  />
                </Card>
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane tab="Blog Posts" key="2">
          <Button
            icon={<PlusOutlined />}
            onClick={() => showModal('blogPost')}
            style={{ marginBottom: 16 }}
          >
            Add Blog Post
          </Button>
          <List
            dataSource={blogPosts}
            renderItem={(item: any) => (
              <List.Item
                actions={[
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => showModal('blogPost', item)}
                  >
                    Edit
                  </Button>,
                  <Button
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete('blogPost', item.id)}
                  >
                    Delete
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={item.title}
                  description={dayjs(item.dateCreated).format('MMMM D, YYYY')}
                />
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane tab="Settings" key="3">
          <Card title="Mail Configuration">
            <Form layout="vertical">
              <Form.Item label="SMTP Server">
                <Input />
              </Form.Item>
              <Form.Item label="SMTP Port">
                <InputNumber />
              </Form.Item>
              <Form.Item label="Email">
                <Input />
              </Form.Item>
              <Form.Item label="Password">
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button type="primary" icon={<SettingOutlined />}>
                  Save Settings
                </Button>
              </Form.Item>
            </Form>
          </Card>
          <Card title="Payment Options" style={{ marginTop: 16 }}>
            <Form layout="vertical">
              <Form.Item label="Stripe API Key">
                <Input />
              </Form.Item>
              <Form.Item label="PayPal Client ID">
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type="primary" icon={<SettingOutlined />}>
                  Save Settings
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>
        <TabPane tab="Users" key="4">
          <List
            dataSource={users}
            renderItem={(item: any) => (
              <List.Item
                actions={[
                  <Button
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete('user', item.id)}
                  >
                    Delete
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={<UserOutlined />}
                  title={item.name}
                  description={item.email}
                />
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane tab="Orders" key="5">
          <List
            dataSource={orders}
            renderItem={(item: any) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<ShoppingCartOutlined />}
                  title={`Order #${item.id}`}
                  description={`Total: $${item.totalAmount?.toString()} - Status: ${item.status}`}
                />
                <Button
                  onClick={() => {
                    // Handle order details view
                  }}
                >
                  View Details
                </Button>
              </List.Item>
            )}
          />
        </TabPane>
      </Tabs>

      <Modal
        title={`${form.getFieldValue('id') ? 'Edit' : 'Add'} ${modalType === 'product' ? 'Product' : 'Blog Post'}`}
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          {modalType === 'product' && (
            <>
              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true }]}
              >
                <InputNumber min={0} step={0.01} />
              </Form.Item>
              <Form.Item
                name="stock"
                label="Stock"
                rules={[{ required: true }]}
              >
                <InputNumber min={0} />
              </Form.Item>
            </>
          )}
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="imageUrl" label="Image">
            <Upload
              listType="picture-card"
              customRequest={handleImageUpload}
              maxCount={1}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
