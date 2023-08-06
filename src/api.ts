import Cookie from "js-cookie"
import { QueryFunctionContext } from "@tanstack/react-query"
import axios from "axios"
// fetcher function을 모아둔 파일

/* noob
const BASE_URL = "http://127.0.0.1:8000/api/v1"
export async function getRooms(){
  const response = await fetch(`${BASE_URL}/rooms/`)
  const json = await response.json()
  return json
}
*/
// pro
const axiosInstance = axios.create({
  baseURL:"http://127.0.0.1:8000/api/v1",
  withCredentials: true,
  // 브라우저에서 "http://127.0.0.1:8000/api/v1"로 접속할 때는(get request를 보낼 때는) 자동으로 cookie를 포함시켜서 django 서버로 request를 보낸다.
  // airbnb-clone-frontend 자바스크립트 코드에서 "http://127.0.0.1:8000/api/v1"로 request를 보낼때 자동으로 cookie가 포함되지 않는다.
  // 그래서 withCredentials: true 를 추가시켜주고, airbnb-clone-backend의 settings.py에 CORS_ALLOW_CREDENTIALS = True를 적어준다.
})
export const getAllRooms = ()=> axiosInstance.get("rooms/").then(response=>response.data)
export const getOneRoom = (something:QueryFunctionContext) => {
  console.log(something)
  // useQuery의 두 번째 인자로 콜백함수(getOneRoom)를 넣어주면,
  // useQuery가 호출될 때 자동으로 콜백함수에 something을 인자로 넣어서 호출해준다.
  const [_, roomPk] = something.queryKey
  return axiosInstance.get(`rooms/${roomPk}`).then(response=>response.data)
}

export const getRoomReviews = ({ queryKey }: QueryFunctionContext) => {
  const [_, roomPk] = queryKey;
  return axiosInstance
    .get(`rooms/${roomPk}/reviews`)
    .then((response) => response.data);
    // http://127.0.0.1:8000/api/v1/rooms/15/reviews?page=2 로 get request를 보내면 두 번째 리뷰3개묶음을 볼 수 있다.
    // 디폴트로 첫 번째 리뷰3개를 받는다.
};

export const getMe = () => {
  return axiosInstance.get(`users/mypage`).then((response)=>response.data).catch(error => {
    console.log(error)
    return error
  })
}

export const logOut = () => {
  return axiosInstance.post(`users/log-out`,null, {
    headers:{
      "X-CSRFToken":Cookie.get("csrftoken") || ""
    }
    // js-cookie 패키지 설치.
    // request의 header에 브라우저의 쿠키에 저장된 CSRF Token을 담아서 보낸다.
  }).then((response)=>response.data)
}