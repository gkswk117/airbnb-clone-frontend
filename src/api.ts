import Cookie from "js-cookie"
import { QueryFunctionContext } from "@tanstack/react-query"
import axios from "axios"
// Fetcher Functions
// django api로 request를 보내는 functions
interface IFrom{username:string, password:string}
const BASE_URL = "http://127.0.0.1:8000/api/v1"
/* noob
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

export const getMe = async() => {
  // Error로 비로그인 상태 확인하는게 싫어서 is-loggid-in query 추가함.
  // 이제 더이상 브라우저 콘솔창에 빨간색으로 AxiosError가 뜨지 않음.
  // 로그인 된 상태 => resolved data = user
  // 로그아웃 된 상태 => resolved data = false
  const response = await fetch(`${BASE_URL}/users/is-logged-in`, {
    method: "GET",
    credentials: "include",
  });
  const json = await response.json()
  /*
  axiosInstance는 항상 Promise를 반환(return)한다. 그래서 then함수 안에서 resolved된 data와 관련된 모든 것을 처리해야 했다.
  아래의 코드에서 Promise를 생성해서 then 밖에서 resolved된 data를 받을 수 있는 방법을 시도해 봤지만 모두 실패했다.
  then함수 또한 Promise를 반환해서 외부 변수에서 resolved된 data값을 받는건 불가능했다.
  then함수 안에서 data와 관련된 모든 것을 처리하면 코드가 너무 복잡해질 것 같아서,
  is-logged-in에는 1) 비동기 처리를 할 수 있고 2) data 값을 바로 반환(return)하는 있는 fetch를 이용했다.

  아니 그럼 api.ts에 있는 함수들은 모두 Promise를 리턴하는데,
  Header.tsx와 UsernameLogin.tsx에서는 어떻게 resolved된 데이터를 바로 변수에 담아서 사용할 수 있는 거지? (es. const { data }= ... )
  => 그건 바로 useQuery, useMutation hook의 기능 덕분.
  useQuery, useMutation로부터 반환된 객체의 data에는 콜백 함수가 반환한 Promise의 resolved data가 들어있다. ㅇ0ㅇ
  아마 자체의 then 메소드 안에서 useState와 같은 기능을 사용한 듯.
  Docs에 들어가보면 둘 다 data에 대한 설명으로 The last successfully resolved data for the query.라고 되어있다.
  */

  if(json.result){
    /*test용 if문*/
    const test = new Promise(resolve => resolve('rulfilled')).then(v=>v)
    console.log("test is ")
    console.log(test)
    const test2 = axiosInstance.get(`users/mypage`).then((response)=>response)
    console.log("test2 is ")
    console.log(test2)
  }
  if(json.result){
    return axiosInstance.get(`users/mypage`).then((response)=>response.data).catch(error => {
      console.log(error)
      return error
    })
  } else{
    return new Promise(resolve =>resolve(false))
  }
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

export const githubLogIn =(code:string)=>{
  return axiosInstance
  .post(
    `/users/github`,
    { code },
    {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    }
  )
  .then((response) => response.status)
}

export const kakaoLogIn =(code:string)=>{
  return axiosInstance
  .post(
    `/users/kakao`,
    { code },
    {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    }
  )
  .then((response) => response.status)
}

export const logIn =({username, password}:IFrom)=>{
  return axiosInstance
  .post(
    `/users/log-in`,
    { username, password },
  )
  .then((response) => response)
}