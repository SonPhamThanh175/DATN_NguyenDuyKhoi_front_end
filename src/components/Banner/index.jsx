'use client';

import { Box, Typography } from '@mui/material';

const Banner = () => {
    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: { xs: '300px', sm: '350px', md: '400px' },
                overflow: 'hidden',
            }}
        >
            <Box
                component='img'
                src='https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-bwQqSxzdbYAUrKWsVn90rit4gvGast.png'
                alt='Adizero Aruku'
                sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                }}
            />

            <Box
                sx={{
                    position: 'absolute',
                    bottom: { xs: '20px', md: '40px' },
                    left: { xs: '20px', md: '40px' },
                    zIndex: 2,
                    display: 'none',
                }}
            >
                <Typography
                    variant='h2'
                    sx={{
                        color: 'white',
                        fontWeight: 700,
                        fontSize: { xs: '28px', sm: '36px', md: '48px' },
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        marginBottom: '8px',
                    }}
                >
                    Adizero Aruku
                </Typography>
                <Typography
                    variant='subtitle1'
                    sx={{
                        color: 'white',
                        fontSize: { xs: '14px', sm: '16px', md: '18px' },
                        fontWeight: 400,
                    }}
                >
                    Thiết kế cho cuộc sống năng động
                </Typography>
            </Box>
        </Box>
    );
};

export default Banner;
