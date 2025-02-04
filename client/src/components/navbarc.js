import React from 'react'

import {AppBar , Typography,Toolbar} from '@mui/material'
import Logout from './logout';

export default function Navbarc() {

  return (
    <div>
      <AppBar>
        <Toolbar>
            <Typography  variant='h4'sx={{flexGrow:1}}>
                LitVerse
            </Typography>
            
            <Logout/>
        </Toolbar>
      </AppBar>
      
    </div>
  )
}
