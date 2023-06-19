import { Button, ButtonGroup, Box } from '@mui/material';
import LocalImageLoader from './LocalImageLoader';

export default function EditorButtons({
  _setImage,
  fetchRandomImage,
  resultToImage,
  result,
  loading,
  _open_export_popup,
  setSourceImageSize,
  fetchingRandomImage }:
  {
    _setImage: (image: string) => void,
    fetchRandomImage: () => void,
    resultToImage: () => void,
    result: string | null,
    loading: boolean,
    _open_export_popup: () => void,
    setSourceImageSize: (size: [number, number]) => void,
    fetchingRandomImage: boolean
  }) {
  return (
    <Box justifyContent="center" alignItems={'center'} sx={{ width: '100%', display: 'flex', flexWrap: 'wrap' }} >
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <LocalImageLoader setImage={_setImage} setSize={setSourceImageSize} loading={loading || fetchingRandomImage} />
        <Button sx={{ width: '140px' }} disabled={loading || fetchingRandomImage ? true : false} id='random_image_btn' className='' onClick={fetchRandomImage} >Random</Button>
      </ButtonGroup>
      <ButtonGroup color="secondary" variant="contained" aria-label="outlined primary button group">
        <Button sx={{ width: '140px' }} disabled={result && !loading ? false : true} className='' onClick={resultToImage} >Source</Button>
        <Button sx={{ width: '140px' }} disabled={result && !loading ? false : true} id="export_popup_btn" className='' onClick={_open_export_popup} >Export</Button>
      </ButtonGroup>
    </Box>
  );
}
