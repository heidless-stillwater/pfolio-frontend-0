import { useEffect, useState } from 'react';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

const Portfolios = () => {
  const theme = useTheme();

  const [portfolios, setPortfolios] = useState([]);

  const fetchPortfolios = () => {
    axios
      .get('/portfolios', {
        headers: {
          Accept: 'application/json',
          'Access-Control-Allow-Origin': process.env.BACKEND_URL,
        },
      })
      .then((response) => {
        setPortfolios(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  return (
    <div id='portfolios'>
      <Box
        maxWidth={{ sm: 720, md: 1236 }}
        width={1}
        margin='0 auto'
        paddingX={2}
        paddingY={{ xs: 4, sm: 6, md: 8 }}
      >
        <Box marginBottom={4}>
          <Typography
            variant='h3'
            align='center'
            fontWeight={700}
            marginTop={theme.spacing(1)}
            data-aos='fade-up'
            gutterBottom
          >
            Sample Projects
          </Typography>
          <Typography
            variant='h6'
            color={theme.palette.text.secondary}
            align='center'
            data-aos='fade-up'
            marginTop={4}
            marginBottom={6}
          >
            Projects of interest.
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {portfolios.map((item, i) => (
            <Grid
              key={i}
              item
              xs={12}
              md={4}
              data-aos='fade-up'
              data-aos-delay={100}
              data-aos-offset={100}
              data-aos-duration={600}
            >
              <Box
                display='block'
                width={1}
                height={1}
                sx={{
                  transition: 'all .2s ease-in-out',
                  '&:hover': {
                    transform: `translateY(-${theme.spacing(1 / 2)})`,
                  },
                }}
              >
                <Box
                  component={Card}
                  width={1}
                  height={1}
                  display='flex'
                  flexDirection='column'
                  sx={{ backgroundImage: 'none' }}
                >
                  <CardMedia
                    title={item.name}
                    sx={{
                      position: 'relative',
                      height: { xs: 240, sm: 340, md: 280 },
                      overflow: 'hidden',
                      '& .slick-slide img': {
                        objectFit: 'cover',
                      },
                      '& .slick-prev, & .slick-next': {
                        zIndex: 2,
                        top: 0,
                        bottom: '100%',
                        left: '100%',
                        right: 0,
                        transform: 'translate(-100%, 50%)',
                        marginLeft: theme.spacing(-2),
                        width: 32,
                        height: 32,
                        '&:before': {
                          fontSize: theme.spacing(3),
                        },
                      },
                      '& .slick-prev': {
                        marginLeft: theme.spacing(-6),
                      },
                      '& .lazy-load-image-background.lazy-load-image-loaded': {
                        display: 'flex !important',
                      },
                    }}
                  >
                    <Box
                      component={LazyLoadImage}
                      effect='blur'
                      src={item.image}
                      height={{ xs: 240, sm: 340, md: 280 }}
                      width='100%'
                      sx={{ objectFit: 'cover' }}
                    />
                  </CardMedia>
                  <CardContent>
                    <Typography
                      variant='h6'
                      gutterBottom
                      align='left'
                      fontWeight={700}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      variant='subtitle2'
                      color={theme.palette.text.secondary}
                      align='left'
                    >
                      {item.description}
                    </Typography>
                    <Box
                      marginTop={2}
                      display='flex'
                      justifyContent='space-between'
                    >
                      <Box marginTop={2}>
                        {item.tags.map((tag, i) => (
                          <Chip
                            key={i}
                            label={tag.name}
                            variant='outlined'
                            sx={{ m: 1 }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </CardContent>
                  <Box flexGrow={1} />
                  <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button
                      component='a'
                      href={item.link}
                      target='_blank'
                      sx={{ textTransform: 'none' }}
                    >
                      Visit
                    </Button>
                  </CardActions>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Divider />
    </div>
  );
};

export default Portfolios;