'use client'

import { Typography, Form, Input, Switch, Button, Divider, Space } from 'antd'
import { SettingOutlined, MailOutlined, LockOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function SettingsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const { data: settings, isLoading } = Api.settings.findFirst.useQuery({
    where: { userId: user?.id },
  })

  const updateSettingsMutation = Api.settings.update.useMutation()
  const updateUserMutation = Api.user.update.useMutation()
  const createSettingsMutation = Api.settings.create.useMutation()

  const onFinish = async (values: any) => {
    try {
      if (settings) {
        await updateSettingsMutation.mutate({
          where: { id: settings.id },
          data: {
            preference1: values.emailNotifications ? 'ON' : 'OFF',
            preference2: values.marketingEmails ? 'ON' : 'OFF',
          },
        })
      } else {
        await createSettingsMutation.mutate({
          data: {
            preference1: values.emailNotifications ? 'ON' : 'OFF',
            preference2: values.marketingEmails ? 'ON' : 'OFF',
            userId: user?.id || '',
          },
        })
      }

      await updateUserMutation.mutate({
        where: { id: user?.id },
        data: {
          email: values.email,
        },
      })

      enqueueSnackbar('Settings updated successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to update settings', { variant: 'error' })
    }
  }

  if (isLoading) {
    return <PageLayout layout="narrow">Loading...</PageLayout>
  }

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>
          <SettingOutlined /> Account Settings
        </Title>
        <Text>Personalize your experience and manage your notifications.</Text>

        <Form
          name="settings"
          initialValues={{
            email: user?.email,
            emailNotifications: settings?.preference1 === 'ON',
            marketingEmails: settings?.preference2 === 'ON',
          }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Please input a valid email!',
              },
            ]}
          >
            <Input prefix={<MailOutlined />} />
          </Form.Item>

          <Divider />

          <Title level={4}>Email Preferences</Title>

          <Form.Item name="emailNotifications" valuePropName="checked">
            <Switch checkedChildren="On" unCheckedChildren="Off" />
            <Text style={{ marginLeft: '10px' }}>
              Receive email notifications
            </Text>
          </Form.Item>

          <Form.Item name="marketingEmails" valuePropName="checked">
            <Switch checkedChildren="On" unCheckedChildren="Off" />
            <Text style={{ marginLeft: '10px' }}>Receive marketing emails</Text>
          </Form.Item>

          {user?.globalRole === 'ADMIN' && (
            <>
              <Divider />
              <Title level={4}>Admin Settings</Title>
              <Button
                type="primary"
                onClick={() => router.push('/admin')}
                icon={<LockOutlined />}
              >
                Configure Platform Settings
              </Button>
            </>
          )}

          <Form.Item style={{ marginTop: '20px' }}>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </PageLayout>
  )
}
