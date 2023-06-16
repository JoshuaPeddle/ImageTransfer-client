import Link from 'next/link';
import { AppBar, Box, Button } from '@mui/material';
export default function footer() {
  return (
  
    <AppBar 
      sx={{  
        flexDirection:'row', 
        flexGrow:0,     
        backgroundColor: 'rgb(255,255,255,0.02)',
        justifyContent:'flex-end', 
        alignItems: 'center', 
        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 3px 3px rgba(0,0,0,0.2)'}} 
      color='transparent' 
      position='relative' >
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