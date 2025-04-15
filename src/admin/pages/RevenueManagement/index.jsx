import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Statistic, Typography, Spin } from 'antd';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const { Title } = Typography;

const RevenueManagement = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRevenueStats = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/orders/statistics/revenue');
      setData(res.data);
    } catch (err) {
      console.error('Error fetching revenue statistics:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRevenueStats();
  }, []);

  if (loading || !data) {
    return <Spin size="large" style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }} />;
  }

  const pieData = [
    { name: 'Đã thanh toán', value: data.successRevenue },
    { name: 'Chờ thanh toán', value: data.pendingRevenue },
  ];

  const COLORS = ['#52c41a', '#faad14'];

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Quản lý doanh thu</Title>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card>
            <Statistic title="Tổng doanh thu" value={data.totalRevenue} suffix="₫" />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Đã thanh toán" value={data.successRevenue} suffix="₫" />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Đang chờ thanh toán" value={data.pendingRevenue} suffix="₫" />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Tổng đơn hàng" value={data.totalOrders} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Đơn đã thanh toán" value={data.successOrders} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Đơn đang chờ" value={data.pendingOrders} />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: 32 }}>
        <Title level={4}>Biểu đồ doanh thu</Title>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              label
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default RevenueManagement;
