
export const get_img_arr_convoluted = (img_arr: Uint8ClampedArray): Uint8ClampedArray => {
  // img_arr to Array of Color
  let rtn_img_arr: Uint8ClampedArray = Object.assign([], img_arr);
  const bit_divide_value = 255 / 16
  for (let i = 0; i < rtn_img_arr.length / 4; i++) {
    const r = rtn_img_arr[i * 4] / bit_divide_value;
    const g = rtn_img_arr[i * 4 + 1] / bit_divide_value;
    const b = rtn_img_arr[i * 4 + 2] / bit_divide_value;
    const a = rtn_img_arr[i * 4 + 3] / bit_divide_value;
    rtn_img_arr[i * 4] = r;
    rtn_img_arr[i * 4 + 1] = g;
    rtn_img_arr[i * 4 + 2] = b;
    rtn_img_arr[i * 4 + 3] = a;
  }

  return rtn_img_arr
}

// 4ea5c508a6566e76240543f8feb06fd457777be39549c4016436afda65d2330e
// 4ea5c508a6566e76240543f8feb06fd457777be39549c4016436afda65d2330e
