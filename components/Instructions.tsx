import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionSummary,
  Card,
  CardContent,
  Typography,
} from '@mui/material';

export default function Instructions() {
  return (
    <Accordion sx={{maxWidth:'96vw'}}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{'&	.MuiAccordionSummary-content':{margin:'6px 0'}}}
      >
        <Typography variant='button'>Instructions </Typography>
      </AccordionSummary>
      <Card variant="outlined">
        <CardContent sx={{'&:last-child':{paddingBottom:'16px'}}}> 
          
          <ol style={{margin:'0px', paddingLeft:'15px'}}>
            
            <li><Typography variant='body2'>Upload an image</Typography></li>
            <li><Typography variant='body2'>Choose a style from the Style Selector below</Typography></li>
            <li><Typography variant='body2'>Export as an Image, GIF, or MP4</Typography></li>

          </ol>
      
        </CardContent>
      </Card>
    </Accordion>
  );
}