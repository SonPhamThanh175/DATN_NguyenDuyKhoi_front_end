import {
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    makeStyles,
    Paper,
    styled,
    Typography,
} from '@material-ui/core';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { Form, Formik } from 'formik';
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import orderApi from '../../api/ordersApi';
import { formatPrice } from '../../utils/common';
import OrderIframe from './components/OrderIframe';
import UpdateShippingInfo from './components/UpdateShippingInfo';

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: '#fff',
      paddingTop: theme.spacing(12),
    },
    paper: {
      backgroundColor: '#fff',
      borderRadius: 0,
      border: '1px solid #e0e0e0',
      marginBottom: theme.spacing(2),
    },
    container: {
      padding: theme.spacing(3),
    },
    sectionTitle: {
      fontFamily: 'sans-serif',
      fontSize: '1.1rem',
      fontWeight: 500,
      marginBottom: theme.spacing(3),
      color: '#000',
    },
    addressBox: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: theme.spacing(2),
    },
    changeAddressButton: {
      border: 'none',
      textDecoration: 'underline',
      padding: 0,
      margin: 0,
      color: '#000',
      '&:hover': {
        backgroundColor: 'transparent',
        textDecoration: 'none',
      },
    },
    productHeader: {
      display: 'flex',
      justifyContent: 'space-around',
      width: '100%',
      padding: theme.spacing(2),
      backgroundColor: '#000',
      color: '#fff',
      marginBottom: theme.spacing(2),
    },
    productRow: {
      display: 'flex',
      justifyContent: 'space-around',
      width: '100%',
      padding: theme.spacing(2),
      borderBottom: '1px solid #e0e0e0',
    },
    totalAmount: {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: theme.spacing(2),
      fontWeight: 600,
    },
    submitButton: {
      backgroundColor: '#000',
      color: '#fff',
      borderRadius: 0,
      padding: '8px 24px',
      '&:hover': {
        backgroundColor: '#333',
      },
    }
  }));

const CustomRadio = styled(Radio)({
    '&.Mui-checked': {
        color: 'black',
    },
});

const OrderPage = () => {
    const classes = useStyles();
    const [isIframeVisible, setIsIframeVisible] = useState(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const orderId = queryParams.get('id');
    const [itemsList, setItemsList] = useState([]);
    const [paymentUrl, setPaymentUrl] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const navigate = useNavigate();

    const totalAmount = itemsList.reduce((total, item) => {
        return total + item.quantity * item.price;
    }, 0);
    const [shippingInfo, setShippingInfo] = useState({
        receiver: ' ',
        phone: ' ',
        address: ' ',
        addressDetail: ' ',
    });

    const validationSchema = Yup.object().shape({
        paymentMethod: Yup.string().required('Vui lòng chọn phương thức thanh toán'),
    });

    const handleBuyNow = async (values) => {
        const { paymentMethod } = values;
        if (paymentMethod==='cash') {
            enqueueSnackbar("Đặt hàng thành công ",{variant:"success"})
            navigate('/success-page')
        }
        try {
            const res = await orderApi.payment(orderId, paymentMethod);
            console.log("test call zalo pay" ,res);
            
            const paymentUrl = res.paymentUrl.paymentInf.order_url;
            // console.log("Link thanh toan :",paymentUrl);
            
            setPaymentUrl(paymentUrl);

            // Hiển thị iframe sau khi gọi API
            setIsIframeVisible(true);
        } catch (error) {
            console.error('Error fetching order:', error);
        }
    };

    const handleCloseIframe = () => {
        setIsIframeVisible(false);
    };

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await orderApi.get(orderId);
                const itemsList = res.products;
                const shippingInfo = res.shippingInfo;
                setShippingInfo(shippingInfo);
                setItemsList(itemsList);
            } catch (error) {
                console.error('Error fetching order:', error);
            }
        };

        if (orderId) {
            fetchOrder();
        }
    }, [orderId]);
    return (
        <Box style={{ marginTop: "100px" }}>
          <Container style={{ marginTop: "120px", width: "1072px" }}>
            <Paper elevation={0} className={classes.paper}>
              <Box className={classes.root}>
                {/* Shipping Address Section */}
                <Container maxWidth="lg">
                  <Paper elevation={0} className={classes.paper}>
                    <Grid className={classes.container}>
                      <Box className={classes.addressBox}>
                        <Typography className={classes.sectionTitle}>
                          Địa chỉ nhận hàng
                        </Typography>
                        <Button
                          onClick={handleOpenDialog}
                          className={classes.changeAddressButton}
                        >
                          Thay đổi địa chỉ nhận hàng
                        </Button>
                      </Box>
                      <Box sx={{ display: "flex", gap: 2 }}>
                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                          {shippingInfo.receiver}
                        </Typography>
                        <Typography variant="body2">
                          ({shippingInfo.phone})
                        </Typography>
                        <Typography variant="body2">
                          {shippingInfo.addressDetail}.
                        </Typography>
                        <Typography variant="body2">
                          {shippingInfo.address}
                        </Typography>
                      </Box>
                    </Grid>
                  </Paper>
                </Container>
    
                {/* Product Information Section */}
                <Container maxWidth="lg">
                  <Paper elevation={0} className={classes.paper}>
                    <Grid className={classes.container}>
                      <Typography className={classes.sectionTitle}>
                        Thông tin sản phẩm
                      </Typography>
    
                      <Box className={classes.productHeader}>
                        <Box sx={{ width: "20%", textAlign: "center" }}></Box>
                        <Box sx={{ width: "20%", textAlign: "center" }}>
                          <Typography>Giá</Typography>
                        </Box>
                        <Box sx={{ width: "20%", textAlign: "center" }}>
                          <Typography>Số lượng</Typography>
                        </Box>
                        <Box sx={{ width: "20%", textAlign: "center" }}>
                          <Typography>Thành tiền</Typography>
                        </Box>
                      </Box>
    
                      {/* Product Rows */}
                      {itemsList.map((item, index) => (
                        <Box
                          key={index}
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                            width: "100%",
                            marginBottom: "10px",
                            padding: "10px",
                            borderBottom: "1px solid #e0e0e0",
                          }}
                        >
                          <Box
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "20%",
                            }}
                          >
                            <img
                              src={
                                item.urlImage
                                  ? `${item.urlImage}`
                                  : "https://via.placeholder.com/444"
                              }
                              alt={item.name}
                              style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                              }}
                            />
                          </Box>
                          <Box
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "20%",
                            }}
                          >
                            <Typography variant="body2">
                              {formatPrice(item.price)}
                            </Typography>
                          </Box>
                          <Box
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "20%",
                            }}
                          >
                            <Typography variant="body2">{item.quantity}</Typography>
                          </Box>
                          <Box
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "20%",
                            }}
                          >
                            <Typography variant="body2" style={{ fontWeight: "600" }}>
                              {formatPrice(item.quantity * item.price)}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
    
                      <Box
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          width: "100%",
                          marginTop: "10px",
                          padding: "10px",
                        }}
                      >
                        <Typography variant="h6" style={{ fontWeight: "600" }}>
                          Tổng tiền: {formatPrice(totalAmount)}
                        </Typography>
                      </Box>
                    </Grid>
                  </Paper>
                </Container>
    
                {/* Payment Method Section */}
                <Container maxWidth="lg">
                  <Paper elevation={0} className={classes.paper}>
                    <Grid className={classes.container}>
                      <Typography className={classes.sectionTitle}>
                        Phương thức thanh toán
                      </Typography>
                      <Formik
                        initialValues={{ paymentMethod: "" }}
                        validationSchema={validationSchema}
                        onSubmit={handleBuyNow}
                      >
                        {({ values, handleChange, handleSubmit }) => (
                          <Form onSubmit={handleSubmit}>
                            <FormControl component="fieldset">
                              <RadioGroup
                                name="paymentMethod"
                                value={values.paymentMethod}
                                onChange={handleChange}
                              >
                                {/* Payment options here */}
                              </RadioGroup>
                            </FormControl>
                            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                              <Button type="submit" className={classes.submitButton}>
                                Đặt hàng
                              </Button>
                            </Box>
                          </Form>
                        )}
                      </Formik>
                    </Grid>
                  </Paper>
                </Container>
    
                {/* Order Iframe */}
                <OrderIframe
                  isVisible={isIframeVisible}
                  handleClose={handleCloseIframe}
                  url={paymentUrl}
                  orderId={orderId}
                />
    
                {/* Change Address Dialog */}
                <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                  <DialogTitle>Thay đổi địa chỉ nhận hàng</DialogTitle>
                  <DialogContent>
                    <UpdateShippingInfo
                      shippingInfo={shippingInfo}
                      setShippingInfo={setShippingInfo}
                      onClose={handleCloseDialog}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseDialog} color="black">
                      Đóng
                    </Button>
                  </DialogActions>
                </Dialog>
              </Box>
            </Paper>
          </Container>
        </Box>
      );
    };

    export default OrderPage;