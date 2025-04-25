import React, { useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';
import { Timeline, Tag } from 'antd';
import { ClockCircleOutlined, CheckCircleOutlined, CarryOutOutlined, CloseCircleOutlined } from '@ant-design/icons';
import orderApi from '../../../api/ordersApi';

function AccountAdditional() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderApi.getOrderHistory(userId);
        console.log('response:', response);
        
        setOrders(response || []);
      } catch (error) {
        console.error('Lỗi khi lấy đơn hàng:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  const getTimelineItems = (shippingStatus) => {
    const steps = [
      { status: 'pending', label: 'Chờ xử lý', color: 'orange', icon: <ClockCircleOutlined style={{ fontSize: 16 }} /> },
      { status: 'shipping', label: 'Đang vận chuyển', color: 'blue', icon: <CarryOutOutlined style={{ fontSize: 16 }} /> },
      { status: 'delivered', label: 'Đã giao', color: 'green', icon: <CheckCircleOutlined style={{ fontSize: 16 }} /> },
      { status: 'cancelled', label: 'Đã hủy', color: 'red', icon: <CloseCircleOutlined style={{ fontSize: 16 }} /> },
    ];

    const index = steps.findIndex(step => step.status === shippingStatus);
    const activeSteps = steps.slice(0, index + 1);

    return activeSteps.map((step, idx) => ({
      color: step.color,
      dot: idx === 0 ? step.icon : undefined,
      children: step.label,
    }));
  };

  if (loading) return <div>Đang tải danh sách đơn hàng...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {orders.map((order) => (
        <Paper
          key={order._id}
          elevation={0}
          style={{ padding: '16px', marginBottom: '12px' }}
        >
          <h3>Trạng thái đơn hàng</h3>
          <Timeline mode="left" items={getTimelineItems(order.shippingStatus)} />

          <div style={{ marginTop: '16px' }}>
            <div><strong>Mã đơn hàng:</strong> {order._id}</div>
            <div>
              <strong>Trạng thái giao hàng:</strong>{' '}
              <Tag color={
                order.shippingStatus === 'pending' ? 'orange' :
                order.shippingStatus === 'shipping' ? 'blue' :
                order.shippingStatus === 'delivered' ? 'green' :
                'red'
              }>
                {
                  order.shippingStatus === 'pending' ? 'Chờ xử lý' :
                  order.shippingStatus === 'shipping' ? 'Đang vận chuyển' :
                  order.shippingStatus === 'delivered' ? 'Đã giao' :
                  'Đã hủy'
                }
              </Tag>
            </div>
            <div>
              <strong>Trạng thái thanh toán:</strong>{' '}
              <Tag color={order.paymentStatus === 'paid' ? 'greenvolcano' : 'green'}>
                {order.paymentStatus === 'paid' ? 'Chưa hoàn thành' : 'Đã hoàn thành'}
              </Tag>
            </div>
            <div>
              <strong>Tổng tiền:</strong> {order.totalAmount?.toLocaleString()}₫
            </div>
          </div>
        </Paper>
      ))}
    </div>
  );
}

export default AccountAdditional;
