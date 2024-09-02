import { useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export let url =
  process.env.NEXT_PUBLIC_ENV === 'prod'
    ? process.env.NEXT_PUBLIC_PROD
    : process.env.NEXT_PUBLIC_DEV

const Axios = axios.create({
  baseURL: url,
})


export { Axios }
