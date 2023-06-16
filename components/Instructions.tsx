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
  );
}