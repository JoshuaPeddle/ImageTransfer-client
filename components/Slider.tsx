
import { Box } from '@mui/material';
import Slider from 'react-slick';

interface Props {
  items: JSX.Element[];
}

const SimpleSlider: React.FC<Props> = ({ items }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,

        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]

  };
  return (
    
    <Box sx={{maxWidth:'90vw', minWidth:'90vw' }}>

      <Slider {...settings}>
        {items.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </Slider>
    </Box>
  );
};
export default SimpleSlider;