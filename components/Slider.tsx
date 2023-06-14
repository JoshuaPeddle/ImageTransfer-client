import { Box } from '@mui/material';
//import Slider from 'react-slick';
import dynamic from 'next/dynamic';

const Slider = dynamic(import('react-slick'), {ssr: false} );
interface Props {
  items: JSX.Element[];
}

const SimpleSlider: React.FC<Props> = ({ items }) => {
  const settings = {
    infinite: false,
    dots:true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 0,
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 0,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 0,
        }
      }
    ]

  };
  return (
    
    <Box sx= {{
      maxWidth:'1200px', 
      backgroundColor: 'rgb(255,255,255,0.2)', 

      width:'min(86%, 1200px)', 
      pt:'30px', 
      pb:'30px', 
      px:'30px', 
      borderRadius:'10px',
      height:'fit-content'}}>
      <Slider   {...settings}>
        {items.map((item, index) => (
          <Box key={index}>{item}</Box>
        ))}
      </Slider>
    </Box>
  );
};
export default SimpleSlider;