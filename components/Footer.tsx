import styles from './Footer.module.css';
import Link from 'next/link';
import { AppBar, Box, Button, Grid } from '@mui/material';
export default function footer() {
  return (
  
    <AppBar sx={{  flexDirection:'row', flexGrow:0, justifyContent:'flex-end', alignItems: 'center'}} color='transparent' position='relative' >
      <Box sx={{p:'2px'}}>
        <Link href="/privacy">
          <Button variant="text" color="primary">
            Privacy Policy
          </Button>
        </Link>
        <Link href="/TOS">
          <Button variant="text" color="primary">
            TOS
          </Button>
        </Link>
      </Box>
    </AppBar>

  );
}