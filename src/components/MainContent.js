import * as React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import DownloadIcon from '@mui/icons-material/Download';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';

const SyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
        backgroundColor: 'transparent',
        cursor: 'pointer',
    },
    '&:focus-visible': {
        outline: '3px solid',
        outlineColor: 'hsla(210, 98%, 48%, 0.5)',
        outlineOffset: '2px',
    },
}));

const SyledCardContent = styled(CardContent)({
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    padding: 16,
    flexGrow: 1,
    '&:last-child': {
        paddingBottom: 16,
    },
});

const StyledTypography = styled(Typography)({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
});

function Footer({ data }) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
            }}
        >
            <Box
                sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
            >
                <AvatarGroup max={3}>
                    <Avatar
                        key={data.file}
                        alt={data.author}
                        src='/static/images/avatar/1.jpg'
                        sx={{ width: 24, height: 24 }}
                    />
                </AvatarGroup>
                <Typography variant="caption">
                    {data.author}
                </Typography>
            </Box>
            <Typography variant="caption">
                <IconButton onClick={() => { new Audio(data.media).play() }} sx={{ border: 0 }} aria-label="download" size="small" variant="text">
                    <HeadphonesIcon />
                </IconButton>
                <IconButton href={data.file} download sx={{ border: 0 }} aria-label="download" size="small" variant="text">
                    <DownloadIcon />
                </IconButton>
            </Typography>
        </Box>
    );
}

// Footer.propTypes = {
//     authors: PropTypes.arrayOf(
//         PropTypes.shape({
//             avatar: PropTypes.string.isRequired,
//             name: PropTypes.string.isRequired,
//         }),
//     ).isRequired,
// };

export default function MainContent() {
    const [focusedCardIndex, setFocusedCardIndex] = React.useState(null);
    const [searchVal, setSearchVal] = React.useState("");
    const getData = () => {
        return window.am2data.filter(item => item.file.toLowerCase().includes(searchVal.toLowerCase()));
    };
    const handleFocus = (index) => {
        setFocusedCardIndex(index);
    };

    const handleBlur = () => {
        setFocusedCardIndex(null);
    };

    const handleClick = () => {
        console.info('You clicked the filter chip.');
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div>
                <Typography variant="h1" gutterBottom>
                    M-VAVE Amp Model
                </Typography>
                <Typography>AM2data share website</Typography>
            </div>
            {/* <Box
                sx={{
                    display: { xs: 'flex', sm: 'none' },
                    flexDirection: 'row',
                    gap: 1,
                    width: { xs: '100%', md: 'fit-content' },
                    overflow: 'auto',
                }}
            >
                <Search />
            </Box> */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column-reverse', md: 'row' },
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: { xs: 'start', md: 'center' },
                    gap: 4,
                    overflow: 'auto',
                }}
            >
                <div sx={{
                    display: 'inline-flex',
                    flexDirection: 'row',
                    gap: 3,
                    overflow: 'auto',
                }} />
                <Box
                    sx={{
                        display: { xs: 'none', sm: 'flex' },
                        flexDirection: 'row',
                        gap: 1,
                        width: { xs: '100%', md: 'fit-content' },
                        overflow: 'auto',
                    }}
                >
                    <OutlinedInput
                        size="small"
                        id="search"
                        placeholder="Search…"
                        onChange={e => { setSearchVal(e.target.value) }}
                        value={searchVal}
                        sx={{ flexGrow: 1 }}
                        startAdornment={
                            <InputAdornment position="start" sx={{ color: 'text.primary' }}>
                                <SearchRoundedIcon fontSize="small" />
                            </InputAdornment>
                        }
                        inputProps={{
                            'aria-label': 'search',
                        }}
                    />
                </Box>
            </Box>
            <Grid container spacing={2} columns={12}>
                {getData().map((data, index) => {
                    return (<Grid size={{ xs: 12, md: 4 }}>
                        <SyledCard
                            variant="outlined"
                            onFocus={() => handleFocus(2)}
                            onBlur={handleBlur}
                            tabIndex={0}
                            className={focusedCardIndex === 2 ? 'Mui-focused' : ''}
                            sx={{ height: '100%' }}
                        >
                            <CardMedia
                                component="img"
                                alt="green iguana"
                                image={data.image}
                                sx={{
                                    height: { sm: 'auto', md: '50%' },
                                    aspectRatio: { sm: '16 / 9', md: '' },
                                }}
                            />
                            <SyledCardContent>
                                {/* <Typography gutterBottom variant="caption" component="div">
                                    {data.author}
                                </Typography> */}
                                <Typography gutterBottom variant="subtitle1" component="div">
                                    {data.file.substring(data.file.lastIndexOf('/') + 1)}
                                </Typography>
                                <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                                    {data.desc}
                                </StyledTypography>
                            </SyledCardContent>
                            <Footer data={data} />
                        </SyledCard>
                    </Grid>);
                })}
            </Grid>
        </Box>
    );
}
