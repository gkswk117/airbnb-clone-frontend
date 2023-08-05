import { QueryFunctionContext } from "@tanstack/react-query"
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
export const getAllRooms = ()=> axiosInstance.get("rooms/").then(response=>response.data)
export const getOneRoom = (something:QueryFunctionContext) => {
  console.log(something)
  const [_, roomPk] = something.queryKey
  return axiosInstance.get(`rooms/${roomPk}`).then(response=>response.data)
}

export const getRoomReviews = ({ queryKey }: QueryFunctionContext) => {
  const [_, roomPk] = queryKey;
  return axiosInstance
    .get(`rooms/${roomPk}/reviews`)
    .then((response) => response.data);
};