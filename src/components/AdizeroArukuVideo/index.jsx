import { useState } from 'react';
import { Button, Typography, Box, IconButton } from '@mui/material';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import FeedbackIcon from '@mui/icons-material/Feedback';

const AdizeroArukuVideo = () => {
    const [isPlaying, setIsPlaying] = useState(true);

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
        const videoElement = document.getElementById('background-video');
        if (isPlaying) {
            videoElement.pause();
        } else {
            videoElement.play();
        }
    };

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: '100vh',
                overflow: 'hidden',
            }}
        >
            /* Background Video */
            <video
                id='background-video'
                autoPlay
                muted
                loop
                style={{
                    position: 'absolute',
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: -1,
                }}
            >
                <source
                    src={require('../../assets/video/video.mp4')}
                    type='video/mp4'
                />
                Your browser does not support the video tag.
            </video>
            {/* Pause/Play Button */}
            <IconButton
                onClick={togglePlayPause}
                sx={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    },
                    width: '40px',
                    height: '40px',
                }}
            >
                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
            {/* Feedback Button */}
            <Box
                sx={{
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'white',
                    padding: '10px 5px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                }}
            >
                <FeedbackIcon />
                <Typography
                    variant='caption'
                    sx={{
                        writingMode: 'vertical-rl',
                        textOrientation: 'mixed',
                        transform: 'rotate(180deg)',
                        marginTop: '5px',
                        fontWeight: 'bold',
                    }}
                >
                    FEEDBACK
                </Typography>
            </Box>
            {/* Adidas Logo */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '20px',
                    right: '20px',
                    width: '50px',
                    height: '50px',
                }}
            >
                <svg
                    viewBox='0 0 24 24'
                    fill='white'
                >
                    <path d='M16.94 6.9l-4.47 2.83-4.47-2.83L12 1.59l4.94 5.31M7.47 8.07l4.47 2.83V16l-4.47-5.37v-2.56M16.52 8.07l-4.47 2.83V16l4.47-5.37v-2.56' />
                </svg>
            </Box>
            {/* Product Info */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '100px',
                    left: '100px',
                    color: 'white',
                }}
            >
                <Typography
                    variant='h5'
                    sx={{
                        fontWeight: 'bold',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        color: 'black',
                        padding: '5px 10px',
                        display: 'inline-block',
                    }}
                >
                    ADIZERO ARUKU
                </Typography>
                <Typography
                    variant='subtitle1'
                    sx={{
                        marginTop: '5px',
                        marginBottom: '15px',
                        color: 'black',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    }}
                >
                    Thiết kế cho cuộc sống năng động
                </Typography>
                <Button
                    variant='outlined'
                    endIcon={<ArrowRightAltIcon />}
                    sx={{
                        backgroundColor: 'white',
                        color: 'black',
                        borderColor: 'black',
                        padding: '5px 15px',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            borderColor: 'black',
                        },
                    }}
                >
                    <a
                        href='http://localhost:3000/products/view-all'
                        style={{ textDecoration: 'none', fontWeight: 'bold' }}
                    >
                        XEM TẤT CẢ
                    </a>
                </Button>
            </Box>
        </Box>
    );
};

export default AdizeroArukuVideo;
