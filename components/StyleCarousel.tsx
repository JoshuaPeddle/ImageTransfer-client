import styles from './StyleButton.module.css';
import dynamic from 'next/dynamic';
import {useEffect,  useState } from 'react';
const SimpleSlider = dynamic(import('./Slider'), { ssr: false });
import { Model } from '../lib/models';
import { Box, Grid } from '@mui/material';

const ParentComponent = ({ models, predict, loading }: { models: { [key: string]: Model }, predict: (model: string) => void, loading: boolean }) => {
  const [ styleItems, setStyleItems ] = useState(null as null | JSX.Element[]);
  useEffect(() => {
    if (!models) return;
    const styleItems = Object.values(models).map((model: { style: string, label: string, background_url: string }) => {
      return (
        <Grid key={model.style} container justifyContent="center" alignItems={'center'}>
          <Box sx={{ p: '0px', borderRadius: '5px' }}>
            <button disabled={loading} id={'style_btn_' + model.style}
              style={{ background: 'url(' + model.background_url + ') no-repeat top left' }}
              className={styles.imageButton}
              onClick={() =>
                predict(model.style)}>
              <p className={styles.imageButtonLabel}>
                {model.label}
              </p>
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
  Object.values(models).map((model: { style: string, label: string, background_url: string }) => {
    return (
      <Grid key={model.style} container justifyContent="center" alignItems={'center'}>
        <Box sx={{ p: '0px', borderRadius: '5px' }}>
          <button disabled={loading} id={'style_btn_' + model.style}
            style={{ background: 'url(' + model.background_url + ') no-repeat top left' }}
            className={styles.imageButton}
            onClick={() =>
              predict(model.style)}>
            <p className={styles.imageButtonLabel}>
              {model.label}
            </p>
          </button>
        </Box>
      </Grid>

    );
  });
  return <SimpleSlider items={styleItems} />;
};
export default ParentComponent;