import axios from "axios"
/* noob
const BASE_URL = "http://127.0.0.1:8000/api/v1"
export async function getRooms(){
  const response = await fetch(`${BASE_URL}/rooms/`)
  const json = await response.json()
  return json
*/
// pro
const axiosInstance = axios.create({
  baseURL:"http://127.0.0.1:8000/api/v1"
})
export const getRooms = ()=> axiosInstance.get("rooms/").then(response=>response.data)