// @ts-ignore
import CryptoJS from 'crypto-js';
import {useCallback} from "react";
import {useDropzone} from "react-dropzone";

type Props = {
  setP2PKeyImgHash: React.Dispatch<React.SetStateAction<string | undefined>>,
}

const ImgHashUi: React.FC<Props> = ({setP2PKeyImgHash}) => {
  const onDrop = useCallback((acceptedFiles: any) => {
    const dist_file = acceptedFiles[0]

    // image file validation, only accept image file
    if (dist_file.type.indexOf('image') === -1) {
      alert('only accept image file which is in the format of jpg, png, gif')
      return
    }

    if (dist_file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const contents = e.target?.result as string
        let hash = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(contents));
        hash = hash.toString(CryptoJS.enc.Hex);
        setP2PKeyImgHash(hash)
        console.log(hash)
      }

      reader.readAsText(dist_file)
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (

    <div style={{
      margin: "32px 0",
      width: "100%",
      height: "256px",
      backgroundColor: "#111",
      border: "1px solid gray",
    }}
         {...getRootProps()}
    >
      <input {...getInputProps()} />
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        fontSize: "24px",
        color: "white",
      }}> 🔑 drop image here
      </div>
    </div>
  )
}

export default ImgHashUi;
