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
  return (
    <div>
      <div className='flex flex-col items-center  bg-slate-600 m-2 mt-2 pt-0 rounded'>     
        <div className='bg-[#457b9dc3] rounded text-lg pr-1 pl-1 w-full p-2 mb-0 '><p className='ml-2 font font-bold '>Style Selector</p></div> 
        <div className={styles.modelButtonsContainer}>
          {models && Object.values(models).map((model: { style: string, label: string, background_url: string }) => {
            return <StyleButton key={model.style} style={model.style} label={model.label} bg={model.background_url} predict={predict} loading={loading} />;
          })}
        </div>
      </div>
    </div>
  );
}