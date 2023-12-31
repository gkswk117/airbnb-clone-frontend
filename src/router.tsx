import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import RoomDetail from "./routes/RoomDetail";
import GithubConfirm from "./routes/GithubConfirm";
import KakaoConfirm from "./routes/KakaoConfirm";
import UploadRoom from "./routes/UploadRoom";
import ErrorPage from "./routes/ErrorPage";
import UploadPhotos from "./routes/UploadPhotos";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    //children과 Outlet의 조합
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "rooms",
        children: [
          {
            path: "upload",
            element: <UploadRoom />,
          },
          {
            path: ":roomPk",
            element: <RoomDetail />,
          },
          {
            path: ":roomPk/photos",
            element: <UploadPhotos />,
          },
        ],
      },
      {
        path: "social",
        children: [
          {
            path: "github",
            element: <GithubConfirm />,
          },
          {
            path: "kakao",
            element: <KakaoConfirm />,
          },
        ],
      },
    ],
  },
]);

export default router;
