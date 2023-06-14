import dynamic from 'next/dynamic';
const Image = dynamic(() => import('next/image'));
import AppBar  from '@mui/material/AppBar';
import { Box, IconButton, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

declare module '@mui/material/AppBar' {
  interface AppBarPropsColorOverrides {
    accent: true;
  }
}

export default function TopBar() {
  return (
    <Box sx={{ flexGrow: 0}}>
      <AppBar sx={{  flexDirection:'row', alignItems: 'center' }} color='transparent' position="static" >
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ ml: 0}}
        >
          <Image  src="/logo.webp" width={20} height={20} placeholder='empty' quality={10} alt="Logo" />

        </IconButton>
        <Typography variant="h5" component="div" sx={{  flexGrow: 1, textShadow: '2px 2px 8px #000000'}} >
            StyleSwap.art
        </Typography>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ ml: 0}}
        >
          <LoginIcon/>
        </IconButton>
      </AppBar>
    </Box>
   
  );
}