'use client'

import { useState, useMemo } from 'react'
import {
  Typography,
  Card,
  Button,
  InputNumber,
  Table,
  Space,
  Modal,
} from 'antd'
import {
  WalletOutlined,
  ReloadOutlined,
  HistoryOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function WalletPage() {
  const router = useRouter()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [topUpAmount, setTopUpAmount] = useState<number | null>(null)
  const [isTopUpModalVisible, setIsTopUpModalVisible] = useState(false)

  const { data: transactions, refetch: refetchTransactions } =
    Api.transaction.findMany.useQuery({
      where: { userId: user?.id },
      orderBy: { dateCreated: 'desc' },
    })

  const { mutateAsync: createTransaction } =
    Api.transaction.create.useMutation()

  const walletBalance = useMemo(() => {
    return (
      transactions?.reduce(
        (total, transaction) => total + (transaction.amount || 0),
        0,
      ) || 0
    )
  }, [transactions])

  const handleTopUp = async () => {
    if (!topUpAmount || topUpAmount <= 0) {
      enqueueSnackbar('Please enter a valid amount', { variant: 'error' })
      return
    }

    try {
      await createTransaction({
        data: {
          amount: topUpAmount,
          status: 'COMPLETED',
          paymentMethod: 'TOP_UP',
          transactionDate: new Date().toISOString(),
          userId: user?.id || '',
          orderId: '', // Assuming top-ups don't have an associated order
        },
      })
      await refetchTransactions()
      enqueueSnackbar('Wallet topped up successfully', { variant: 'success' })
      setIsTopUpModalVisible(false)
      setTopUpAmount(null)
    } catch (error) {
      enqueueSnackbar('Failed to top up wallet', { variant: 'error' })
    }
  }

  const columns = [
    {
      title: 'Date',
      dataIndex: 'transactionDate',
      key: 'transactionDate',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `$${amount?.toFixed(2)}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
    },
  ]

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>My Wallet</Title>
        <Card>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Space align="center">
              <WalletOutlined style={{ fontSize: '24px' }} />
              <Title level={4}>Wallet Balance</Title>
            </Space>
            <Text strong style={{ fontSize: '24px' }}>
              ${walletBalance.toFixed(2)}
            </Text>
            <Button
              type="primary"
              icon={<ReloadOutlined />}
              onClick={() => setIsTopUpModalVisible(true)}
            >
              Top Up Wallet
            </Button>
          </Space>
        </Card>

        <Card>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Space align="center">
              <HistoryOutlined style={{ fontSize: '24px' }} />
              <Title level={4}>Transaction History</Title>
            </Space>
            <Table
              dataSource={transactions}
              columns={columns}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </Space>
        </Card>
      </Space>

      <Modal
        title="Top Up Wallet"
        open={isTopUpModalVisible}
        onOk={handleTopUp}
        onCancel={() => setIsTopUpModalVisible(false)}
      >
        <InputNumber
          style={{ width: '100%' }}
          placeholder="Enter amount"
          value={topUpAmount}
          onChange={value => setTopUpAmount(value)}
          prefix="$"
          min={0}
          precision={2}
        />
      </Modal>
    </PageLayout>
  )
}
