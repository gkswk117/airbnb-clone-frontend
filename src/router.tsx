import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import Users from "./routes/Users";
const router = createBrowserRouter([
    {
        path:"/",
        element:<Root/>,
        //children과 Outlet의 조합
        children: [
            {
                path:"",
                element:<Home/>
            },
            {
                path:"users",
                element:<Users/>
            }
        ]
    }
])

export default router