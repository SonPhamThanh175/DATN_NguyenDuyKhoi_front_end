import { useEffect, useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    Divider,
    Chip,
    Grid,
    Skeleton,
    Card,
    CardContent,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import { Timeline } from 'antd';
import {
    ClockCircleOutlined,
    CheckCircleOutlined,
    CarryOutOutlined,
    CloseCircleOutlined,
    ShoppingOutlined,
    CalendarOutlined,
    DollarOutlined,
} from '@ant-design/icons';
import orderApi from '../../../api/ordersApi';
import { motion } from 'framer-motion';

// Remove the problematic CSS import
// import "antd/dist/antd.css"

// Add inline styles for Timeline components
const timelineStyles = {
    '.ant-timeline-item-tail': {
        borderInlineWidth: '2px !important',
    },
    '.ant-timeline-item-head': {
        width: '16px !important',
        height: '16px !important',
    },
    '.ant-timeline-item': {
        paddingBottom: '20px !important',
    },
    '.ant-timeline-item-content': {
        marginInlineStart: '20px !important',
    },
};

function AccountAdditional() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
            {
                status: 'pending',
                label: 'Chờ xử lý',
                color: '#ff9800',
                icon: <ClockCircleOutlined style={{ fontSize: 16 }} />,
            },
            {
                status: 'shipping',
                label: 'Đang vận chuyển',
                color: '#2196f3',
                icon: <CarryOutOutlined style={{ fontSize: 16 }} />,
            },
            {
                status: 'delivered',
                label: 'Đã giao',
                color: '#4caf50',
                icon: <CheckCircleOutlined style={{ fontSize: 16 }} />,
            },
            {
                status: 'cancelled',
                label: 'Đã hủy',
                color: '#f44336',
                icon: <CloseCircleOutlined style={{ fontSize: 16 }} />,
            },
        ];

        const index = steps.findIndex((step) => step.status === shippingStatus);
        const activeSteps = steps.slice(0, index + 1);

        return activeSteps.map((step, idx) => ({
            color: step.color,
            dot: step.icon,
            children: (
                <Typography
                    variant='body2'
                    sx={{
                        fontWeight: idx === activeSteps.length - 1 ? 'bold' : 'normal',
                        color: idx === activeSteps.length - 1 ? step.color : 'inherit',
                    }}
                >
                    {step.label}
                </Typography>
            ),
        }));
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return '#ff9800';
            case 'shipping':
                return '#2196f3';
            case 'delivered':
                return '#4caf50';
            case 'cancelled':
                return '#f44336';
            default:
                return '#9e9e9e';
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'pending':
                return 'Chờ xử lý';
            case 'shipping':
                return 'Đang vận chuyển';
            case 'delivered':
                return 'Đã giao';
            case 'cancelled':
                return 'Đã hủy';
            default:
                return 'Không xác định';
        }
    };

    const getPaymentStatusLabel = (status) => {
        return status === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán';
    };

    const getPaymentStatusColor = (status) => {
        return status === 'paid' ? '#4caf50' : '#ff9800';
    };

    if (loading) {
        return (
            <Box sx={{ padding: 2 }}>
                <Typography
                    variant='h5'
                    sx={{ mb: 3, fontWeight: 'bold' }}
                >
                    Lịch sử đơn hàng
                </Typography>
                {[1, 2].map((item) => (
                    <Paper
                        key={item}
                        elevation={2}
                        sx={{
                            p: 3,
                            mb: 3,
                            borderRadius: 2,
                            background: 'white',
                        }}
                    >
                        <Skeleton
                            variant='text'
                            width='60%'
                            height={30}
                        />
                        <Skeleton
                            variant='text'
                            width='80%'
                            height={20}
                            sx={{ mb: 2 }}
                        />
                        <Skeleton
                            variant='rectangular'
                            height={100}
                            sx={{ mb: 2 }}
                        />
                        <Grid
                            container
                            spacing={2}
                        >
                            <Grid
                                item
                                xs={12}
                                sm={6}
                            >
                                <Skeleton
                                    variant='text'
                                    width='90%'
                                />
                                <Skeleton
                                    variant='text'
                                    width='70%'
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={6}
                            >
                                <Skeleton
                                    variant='text'
                                    width='80%'
                                />
                                <Skeleton
                                    variant='text'
                                    width='60%'
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                ))}
            </Box>
        );
    }

    if (orders.length === 0) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 8,
                }}
            >
                <ShoppingOutlined style={{ fontSize: 64, color: '#9e9e9e', marginBottom: 16 }} />
                <Typography
                    variant='h5'
                    sx={{ mb: 1, fontWeight: 'medium' }}
                >
                    Chưa có đơn hàng nào
                </Typography>
                <Typography
                    variant='body1'
                    color='text.secondary'
                >
                    Các đơn hàng của bạn sẽ xuất hiện ở đây sau khi bạn mua sắm
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: { xs: 1, sm: 2 } }}>
            <Typography
                variant='h5'
                sx={{ mb: 3, fontWeight: 'bold' }}
            >
                Lịch sử đơn hàng
            </Typography>

            {orders.map((order, index) => (
                <motion.div
                    key={order._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                    <Paper
                        elevation={2}
                        sx={{
                            p: { xs: 2, sm: 3 },
                            mb: 3,
                            borderRadius: 2,
                            background: 'white',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                                transform: 'translateY(-4px)',
                            },
                            borderLeft: `4px solid ${getStatusColor(order.shippingStatus)}`,
                        }}
                    >
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                item
                                xs={12}
                                md={7}
                            >
                                <Box sx={{ mb: 2 }}>
                                    <Typography
                                        variant='h6'
                                        sx={{ fontWeight: 'bold', mb: 1 }}
                                    >
                                        Đơn hàng #{order._id.substring(order._id.length - 8)}
                                    </Typography>

                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                                        <Chip
                                            label={getStatusLabel(order.shippingStatus)}
                                            size='small'
                                            sx={{
                                                backgroundColor: getStatusColor(
                                                    order.shippingStatus,
                                                ),
                                                color: 'white',
                                                fontWeight: 'bold',
                                            }}
                                        />
                                        <Chip
                                            label={getPaymentStatusLabel(order.paymentStatus)}
                                            size='small'
                                            sx={{
                                                backgroundColor: getPaymentStatusColor(
                                                    order.paymentStatus,
                                                ),
                                                color: 'white',
                                            }}
                                        />
                                    </Box>
                                </Box>

                                <Box sx={{ mb: 3, ...timelineStyles }}>
                                    <Timeline
                                        mode={isMobile ? 'left' : 'alternate'}
                                        items={getTimelineItems(order.shippingStatus)}
                                    />
                                </Box>
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                md={5}
                            >
                                <Card
                                    variant='outlined'
                                    sx={{ height: '100%' }}
                                >
                                    <CardContent>
                                        <Typography
                                            variant='subtitle1'
                                            sx={{ fontWeight: 'bold', mb: 2 }}
                                        >
                                            Chi tiết đơn hàng
                                        </Typography>

                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <CalendarOutlined
                                                style={{ marginRight: 8, color: '#757575' }}
                                            />
                                            <Typography variant='body2'>
                                                <strong>Ngày đặt:</strong>{' '}
                                                {order?.orderDate
                                                    ? new Date(order.orderDate).toLocaleDateString(
                                                          'vi-VN',
                                                      )
                                                    : 'Không xác định'}
                                            </Typography>
                                        </Box>

                                        <Divider sx={{ my: 2 }} />

                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                            <DollarOutlined
                                                style={{ marginRight: 8, color: '#757575' }}
                                            />
                                            <Typography variant='body2'>
                                                <strong>Tổng tiền:</strong>
                                            </Typography>
                                        </Box>

                                        <Typography
                                            variant='h6'
                                            sx={{
                                                fontWeight: 'bold',
                                                color: '#f44336',
                                                ml: 3.5,
                                            }}
                                        >
                                            {order.totalAmount?.toLocaleString()}₫
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Paper>
                </motion.div>
            ))}
        </Box>
    );
}

export default AccountAdditional;
