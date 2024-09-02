import axios from 'axios'

const link = process.env.NEXT_PUBLIC_CLOUDINARY_URL
// https://api.cloudinary.com/v1_1/dhwlkhbet/
const Cloudinary = axios.create({
  baseURL: link,
})

export default Cloudinary
