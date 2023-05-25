// Desc: Let the user load a local image

import { use, useCallback, useEffect } from 'react';

import styles from './StyleButton.module.css';

export default function StyleButton({style, predict, label, bg}) {
  return (
    <button id={'style_btn_'+style} style={{background:'url(' +bg+') no-repeat top left'}} className={styles.imageButton} onClick={() => predict(style)}> {label}</button>
  );
}