import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {systemMeta} from "../funcs/meta";


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

enum language_enum {
  English,
  Japanese,
}

const EnglishHelpContent = () => {
  return (
    <Typography>
      <p style={{fontSize: "24px"}}># {systemMeta.name}</p>
      <div>{systemMeta.desc}</div>
      <p style={{fontSize: "24px"}}>## usage</p>
      <div>1. choose one image and upload (share it as a secret key with someone who talk with)</div>
      <div>2. choose peace flower or psyche flower by clicking the image🌸</div>
      <div>*  just select randomly. you can call 50% chance</div>
      <div>3. wait for the peer (might be able to call, might not💔)</div>
      <div>4. now enjoy calling! if no response, REFRESH the page and select the another flower</div>
    </Typography>
  )
}

const JapaneseHelpContent = () => {
  return (
    <Typography>
      <p style={{fontSize: "24px"}}># {systemMeta.name}</p>
      <div>セキュアでシンプルなp3p電話アプリ</div>
      <p style={{fontSize: "24px"}}>## 使い方</p>
      <div>1. 話したい人と共通の画像を決めて本サイトにアップロード (画像はハッシュ化されるので鍵の役割をします)</div>
      <div>2. '平和お花' もしくは 'サイケお花' のどちらかを選ぶ🌸</div>
      <div>*  無造作に選んでみてください。50%の確率で相手と電話することができます。</div>
      <div>3. 相手のpeerが応答するまで待ちます (もしかするとつながるかもしれません、繋がらないときは諦めちゃう？💔)</div>
      <div>4. 秘密の会話を始めましょう! もし応答がない場合、画面を更新して違うお花を選択するとつながる可能性があります</div>
    </Typography>
  )
}

const Help = () => {
  const [cur_language, set_cur_language] = React.useState<language_enum>(language_enum.English)

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
           <Button
             variant="outlined"
             disabled={cur_language === language_enum.English}
             onClick={() => set_cur_language(language_enum.English)}>
             english
           </Button>
           <Button
             style={{marginLeft: "10px"}}
             variant="outlined"
             disabled={cur_language === language_enum.Japanese}
             onClick={() => set_cur_language(language_enum.Japanese)}>
             日本語
           </Button>
            {cur_language === language_enum.English ? <EnglishHelpContent /> : <JapaneseHelpContent />}
         </AccordionDetails>
       </Accordion>
     </ThemeProvider>
   </div>
  )
}

export default Help;
