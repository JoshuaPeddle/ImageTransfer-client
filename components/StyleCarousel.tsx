import styles from './StyleButton.module.css';
import dynamic from 'next/dynamic';
import {useEffect,  useState } from 'react';
import styleButtonStyle from './StyleButton.module.css';
const SimpleSlider = dynamic(import('./Slider'), { ssr: false, loading: () =>  
  <Box className='modelButtonsContainer'
    sx={{
      maxWidth: '100%',
      backgroundColor: 'rgb(255,255,255,0.02)',
      boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
      width: '100%',
      minWidth: '100%',
      pt: '30px',
      pb: '30px',
      px: '30px',
      borderRadius: '10px',
      height: 'fit-content'
    }}>
    <button style={{ background: 'transparent'}} className={styleButtonStyle.imageButton}/>
  </Box> 
} );
import { Model } from '../lib/models';
import { Box, Grid } from '@mui/material';

import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
const ParentComponent = ({ models, predict, loading }: { models: { [key: string]: Model }, predict: (model: string) => void, loading: boolean }) => {
  const [ styleItems, setStyleItems ] = useState(null as null | JSX.Element[]);
  const [ clickedButton, setClickedButton ] = useState(false);
  useEffect(() => {
    if (!models) return;
    const styleItems = Object.values(models).map((model: { style: string, label: string, background_url: string }) => {
      return (
        <Grid key={model.style} container justifyContent="center" alignItems={'center'}>
          <Box sx={{ p: '0px', borderRadius: '5px' }}>
            <button
              disabled={loading}
              id={'style_btn_' + model.style}
              style={{ background: 'url(' + model.background_url + ') no-repeat top left' }}
              className={styles.imageButton}
              onClick={() => {
                predict(model.style);
                setClickedButton(true); // Set clickedButton to true
              }}
            >
              <p className={styles.imageButtonLabel}>{model.label}</p>
            </button>
          </Box>
        </Grid>
      );
    });
    setStyleItems(styleItems);
  }
  , [ loading, models, predict ]);
    
  if (!styleItems) {
    return (<></>);
  }
  return <SimpleSlider items={styleItems} clickedButton={clickedButton} />;
};
export default ParentComponent;