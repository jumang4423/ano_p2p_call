import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {systemMeta} from "../funcs/meta";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


const Help = () => {
  return (
   <div style={{
     marginTop: "42px",
   }}>
     <ThemeProvider theme={darkTheme}>
       <Accordion>
         <AccordionSummary
           expandIcon={<ExpandMoreIcon />}
           aria-controls="panel1a-content"
           id="panel1a-header"
         >
           <Typography>Help</Typography>
         </AccordionSummary>
         <AccordionDetails>
           <Typography>
             <div style={{fontSize: "24px"}}># {systemMeta.name}</div>
             <div>{systemMeta.desc}</div>
             <div style={{fontSize: "24px"}}>## usage</div>
             <div>1. choose one image and upload (share it as a secret key with someone who talk with)</div>
             <div>2. choose peace flower or psyche flower by clicking the image🌸</div>
             <div>*  just select randomly. you can call 50% chance</div>
             <div>3. wait for the peer (might be able to call, might not💔)</div>
             <div>4. now enjoy calling! if no response, REFRESH the page and select the another flower</div>
           </Typography>
         </AccordionDetails>
       </Accordion>
     </ThemeProvider>
   </div>
  )
}

export default Help;
