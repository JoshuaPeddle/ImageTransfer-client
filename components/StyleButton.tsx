// Desc: Let the user load a local image

import styles from './StyleButton.module.css';

export default function StyleButton({style, predict, label, bg}: {style: string, predict: Function, label: string, bg: string}) {
  return (
    <button id={'style_btn_'+style} style={{background:'url(' +bg+') no-repeat top left'}} className={styles.imageButton} onClick={() => predict(style)}> <p className={styles.imageButtonLabel}> {label} </p></button>
  );
}