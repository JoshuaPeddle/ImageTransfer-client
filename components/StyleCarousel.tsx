import styles from './StyleButton.module.css';
import dynamic from 'next/dynamic';
const SimpleSlider = dynamic(import('./Slider'), {ssr: false} );
import { Model } from '../lib/models';
import Image from 'next/image';
import { Box, Button, Grid } from '@mui/material';
function limit (string = '', limit = 0) {  
  return string.substring(0, limit);
}

const ParentComponent = ({ models, predict, loading }: { models: { [key: string]: Model }, predict: (model: string) => void, loading: boolean }) => {
  const styleItems = Object.values(models).map((model: { style: string, label: string, background_url: string }) => {
    return (
            
      <Grid key={model.style} container justifyContent="center" alignItems={'center'}>
        {/* <Image src={model.background_url} alt={model.label} width={200} height={100} /> */}
        <Box   sx={{p:'0px', backgroundColor: 'accent.light', borderRadius:'5px'}}>
          <button id={'style_btn_'+model.style} style={{background:'url(' +model.background_url+') no-repeat top left'}} className={styles.imageButton} onClick={() => predict(model.style)}> <p className={styles.imageButtonLabel}> {model.label} </p></button>
        </Box>
      </Grid>
    
    );
  });
  return <SimpleSlider items={styleItems} />;
};
export default ParentComponent;