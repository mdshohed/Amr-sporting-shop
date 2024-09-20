import axios from 'axios'

// Image upload
export const imageUpload = async (image: any) => {
  // const value = import.meta.env.VITE_IMGBB_API_KEY;
  // console.log("imgvalue", image, value);
  
  const formData = new FormData()
  formData.append('image', image)
  const { data } = await axios.post(
    // `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    `https://api.imgbb.com/1/upload?key=9e27602245bf52bfa9d649ab92057569`,
    formData
  )
  return data.data.display_url
}