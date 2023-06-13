
import SimpleSlider from './Slider';
import { Model } from '../lib/models';
import Image from 'next/image';
import { Button } from '@mui/material';
const ParentComponent = ({ models, predict, loading }: { models: { [key: string]: Model }, predict: (model: string) => void, loading: boolean }) => {
  const styleItems = Object.values(models).map((model: { style: string, label: string, background_url: string }) => {
    return (
            
      <div key={model.style}> 
        <Button onClick={() => predict(model.style)}> <Image src={model.background_url} alt={model.label} width={240} height={120} /></Button>
      </div>
    
    );
  });
  return <SimpleSlider items={styleItems} />;
};
export default ParentComponent;