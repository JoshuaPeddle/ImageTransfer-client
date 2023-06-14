import dynamic from 'next/dynamic';
import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { nextVariant, Model } from '../lib/models';
import _predict from '../lib/predict';

import { compressImage } from '../lib/compress';
import { generateUUID } from '@/lib/uuid';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionSummary, AppBar, Box, Button, ButtonGroup, Card, CardContent, Typography } from '@mui/material';
const StyleCarousel = dynamic(() => import('./StyleCarousel'), {ssr: false});
const LocalImageLoader = dynamic(() => import('./LocalImageLoader'));
const ImageView = dynamic(() => import('./imageView'));
const ExportPopup = dynamic(() => import('./exportPopup'));
export default function TFView() {
  const [ image, setImage ] = useState(null as null | string);
  const [ result, setResult ] = useState(null);
  const [ error, setError ] = useState(false);
  const [ models, setModels ] = useState({} as { [key: string]: Model });
  const [ loading, setLoading ] = useState(false);
  const [ uuid, setUuid ] = useState(null as null | string);
  const [ compressed, setCompressed ] = useState(null as null | Blob);
  const [ exportPopup, setExportPopup ] = useState(false);
  const [ sourceImageSize, setSourceImageSize ] = useState([ 384, 256 ] as [number, number]);
  const { data: session, update } = useSession();
  useEffect(() => {
    if (!image) return;
    generateUUID().then(setUuid);
    compressImage(image, setCompressed);
  }, [ image ]);
  const predict = async (model: string) => {
    if ((session && session?.user.num_tokens <= 0)  ) {
      return alert('Out of tokens? Don\'t worry! Registered users receive 300 free tokens daily, up to a 1000-token cap. Check back in 24 hours!');
    }
    if (!compressed) return;
    if (loading) return;
    setResult(null);
    setLoading(true);
    setError(false);
    // Determine variant
    const variant = nextVariant(models[model]);
    if (!uuid) return setLoading(false);
    const pred = _predict(model, compressed, setResult, setError, setLoading, variant, uuid);
    if (!session) {
      await pred;
      return setLoading(false);
    }
    const res = await fetch(`/api/charge/${session.user.uuid}`, { method: 'POST' });
    const data = await res.json();
    await pred;
    await update({num_tokens: data.num_tokens});
    setLoading(false);
  };
  const resultToImage = () => {
    if (!result) return;
    _setImage(result);
    setResult(null);
  };
  const fetchRandomImage = useCallback(async () => {
    // This function sends send a GET request to the generator server to get a url for a random image
    const prefetchImage = async (url: string) => {
      const img = new Image();
      img.src = url;
    };
    _setImage(null);
    const res = await fetch('/api/randomImage', { method: 'GET' });
    const data = await res.json();
    // Prefetch the image
    prefetchImage(data.url);
    setSourceImageSize([ 384, 256 ]);
    _setImage(data.url);
  }, []);
  const _open_export_popup = () => {
    setExportPopup(true);
  };
  useEffect(() => {
    const fetchModels = async () => {
      // Make a call to /api/models to get the models
      const res = await fetch('/api/models', { method: 'GET' });
      const data = await res.json();
      setModels(data);
    }; 
    fetchModels();
    fetchRandomImage();
  }, [  fetchRandomImage ]);
  const _setImage = (img: string | null) => {
    setImage(img);
    setResult(null);
    setCompressed(null);
  };
  return (
    <>
      {image && result && exportPopup ? <ExportPopup image={image} result={result} setExportPopup={setExportPopup} /> : null}

      <Box sx={{display:'flex', flexGrow:1, justifyContent:'center', alignItems:'center', flexDirection:'column'}} >
        <Box sx={{flexGrow:1, display:'flex', justifyContent:'center', alignItems:'center'}}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Instructions: </Typography>
            </AccordionSummary>
            <Card variant="outlined">
              <CardContent>
                <div >
                  <ol >
                    <li>Upload an image</li>
                    <li>Choose a style from the Style Selector</li>
                    <li>Export as a GIF or MP4</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </Accordion>
        </Box>
        
        <Box sx={{ display:'flex', flexGrow:2, flexDirection:'column', justifyContent: 'center', alignItems:'center', maxWidth: 'fit-content', mx: 'auto'}} color='transparent'>
          <ButtonGroup color="secondary" variant="contained" aria-label="outlined primary button group">
            <LocalImageLoader  setImage={_setImage} setSize={setSourceImageSize} loading={loading} />
            <Button disabled={loading? true :false} id='random_image_btn' className='' onClick={fetchRandomImage} >Random Image</Button>
            <Button disabled={result && !loading? false :true} className='' onClick={resultToImage} >Result to Source</Button>
            <Button disabled={result && !loading? false :true} id="export_popup_btn" className='' onClick={_open_export_popup} >Export</Button>
          </ButtonGroup>
        
          <ImageView image={image} result={result} loading={loading} size={sourceImageSize} />
        </Box >
        {/* <StyleSelector models={models} predict={predict} loading={loading} /> */}
        <Box sx={{      width:'min(86%, 1200px)', maxWidth:'1200px', flexGrow:1, display:'flex', justifyContent:'center', alignItems:'center'}}>
          <StyleCarousel models={models} predict={predict} loading={loading}/>
        </Box>
      </Box>
      
    </>
  );
}