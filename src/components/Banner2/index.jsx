import { Box, Typography, IconButton } from '@mui/material';
import PauseIcon from '@mui/icons-material/Pause';

const Banner2 = () => {
    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: { xs: '300px', sm: '400px', md: '500px' },
                overflow: 'hidden',
                backgroundColor: '#000',
            }}
        >
            {/* Static Image Background */}
            <Box
                component='img'
                src='https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sf9fDYt1Q38w8AC0HamUwIqMODm1Fb.png'
                alt='Adizero Aruku'
                sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                }}
            />

            {/* Text Overlay - Only if you want to add the text programmatically instead of using the image */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%',
                    textAlign: 'center',
                    zIndex: 2,
                    display: 'none', // Hidden because the image already contains text
                }}
            >
                <Typography
                    variant='h3'
                    sx={{
                        color: 'white',
                        fontWeight: 700,
                        fontSize: { xs: '18px', sm: '24px', md: '32px' },
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        lineHeight: 1.4,
                        marginBottom: '24px',
                    }}
                >
                    TRẢI NGHIỆM LỚP ĐỆM ÊM ÁI NHẸ NHƯ MÂY. ĐÔI GIÀY PHONG CÁCH SỐNG NÀY GIÚP BẠN
                    THOẢI MÁI SUỐT NGÀY DÀI.
                </Typography>
                <Typography
                    variant='subtitle1'
                    sx={{
                        color: 'white',
                        fontSize: { xs: '14px', sm: '16px', md: '18px' },
                        fontWeight: 500,
                    }}
                >
                    -ADIZERO ARUKU
                </Typography>
            </Box>

            {/* Pause Button */}
            <IconButton
                sx={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    },
                    width: '40px',
                    height: '40px',
                    zIndex: 3,
                }}
            >
                <PauseIcon />
            </IconButton>
        </Box>
    );
};

export default Banner2;
