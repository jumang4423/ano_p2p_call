// @ts-ignore
import CryptoJS from 'crypto-js';
import {useCallback} from "react";
import {useDropzone} from "react-dropzone";
import {get_img_arr_convoluted} from "./ImgHashUi_func";

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
      // load the image file then get pixel data
      const img = new Image()
      img.width = 64
      img.height = 64
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (ctx) {
          canvas.width = img.width
          canvas.height = img.height
          ctx.drawImage(img, 0, 0)
          const img_data = ctx.getImageData(0, 0, img.width, img.height)

          // get the hash of the image
          const hash = CryptoJS.SHA256(get_img_arr_convoluted(img_data.data).toString()).toString()
          setP2PKeyImgHash(hash)
        }
      }
      img.src = URL.createObjectURL(dist_file)

    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (

    <div style={{
      margin: "32px 0",
      width: "100%",
      height: "256px",
      backgroundColor: "#111",
      border: "2px dotted gray",
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
