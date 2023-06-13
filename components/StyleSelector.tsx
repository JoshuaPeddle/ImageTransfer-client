import dynamic from 'next/dynamic';
import styles from './StyleSelector.module.css';
import styleButtonStyle from './StyleButton.module.css';
const StyleButton = dynamic(() => import('./StyleButton'), { loading: () => 
  <button className={styleButtonStyle.imageButton} >
    <p className={styles.imageButtonLabel}>
        Loading...
    </p>
  </button> });
import { Model } from '../lib/models';

export default function StyleSelector( { models, predict, loading }: { models: { [key: string]: Model }, predict: (model: string) => void, loading: boolean }) {
  const expected_num_styles = parseInt(process.env.NEXT_PUBLIC_NUM_STYLES || '9');
  if (Object.values(models).length < 1) return (
    <div>
      <div className='flex flex-col items-center  bg-slate-600 m-2 mt-2 pt-0 rounded'>     
        <div className={styles.modelButtonsContainer}>
          { Object.values(Array(expected_num_styles).fill(0)).map((_, i) => {
            return <StyleButton key={i} style={''} label={'Loading...'} bg={'/blank-dark.png'} predict={predict} loading={true} />;
          })}
        </div>
      </div>
    </div>
  );
  return (
    <div>
      <div className='flex flex-col items-center  bg-slate-600 m-2 mt-2 pt-0 rounded'>     
        <div className={styles.modelButtonsContainer}>
          {Object.values(models).map((model: { style: string, label: string, background_url: string }) => {
            return <StyleButton key={model.style} style={model.style} label={model.label} bg={model.background_url} predict={predict} loading={loading} />;
          })}
        </div>
      </div>
    </div>
  );
}