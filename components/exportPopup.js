import { useState } from 'react';
import styles from './exportPopup.module.css';
import tfViewStyle from './TFView.module.css';
import {exportImages, exportGIF, exportMP4} from '../lib/ImageExporter.js';
export default function ExportPopup({image, result, loading, exportPopup, setExportPopup}) {
  const [ exportType, setExportType ] = useState('image');
  const [ exportLoading, setExportLoading ] = useState(false);
  const [ exportMessage, setExportMessage ] = useState(null);
  const [ exportError, setExportError ] = useState(false);
  const _export_image = () => {
    exportImages(image, result);
  };
  const _export_GIF = () => {
    setExportLoading(true);
    exportGIF(image, result, setExportLoading, setExportError, setExportMessage);
  };
  const _export_MP4 = () => {
    setExportLoading(true);
    exportMP4(image, result, setExportLoading, setExportError, setExportMessage);
  };
  const _export = () => {
    console.log('here');
    if (exportType === 'image') {
      _export_image();
    } else if (exportType === 'gif') {
      _export_GIF();
    } else if (exportType === 'mp4') {
      _export_MP4();
    }
  };
  const _setExportType = (e) => {
    console.log(e.target.value);
    setExportType(e.target.value);
  };
  return (
    <>
      <div className={styles.popup}>
        <div className={styles.popup_inner}>
          <div className={styles.popup_header}>
            <h1>Exporter</h1>
            <button className={styles.close_button} onClick={() => setExportPopup(false)}>Quit</button>
          </div>
          <div className={styles.popup_body}>
            <div className={styles.export_type}>
              <h2>Export Type</h2>
              <select className={styles.select} value={exportType} onChange={_setExportType}>
                <option className={styles.option} value="image">Image</option>
                <option className={styles.option} value="gif">GIF</option>
                <option className={styles.option} value="mp4">MP4</option>
              </select>
            </div>
            <div className={styles.export_button}>
              <button onClick={_export}>Export</button>
            </div>
            <div className={styles.export_loading}>
              {exportLoading ? <p>{exportMessage}</p> : null}
              {exportError ? <p>Error: {exportMessage}</p> : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
