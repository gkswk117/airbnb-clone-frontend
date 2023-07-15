import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import * as React from "react"
import * as ReactDOM from "react-dom/client"
import router from "./router"
import { RouterProvider } from "react-router-dom"

const container = document.getElementById("root")
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container)

export const theme = extendTheme({
  colors: {
    braand: {
      100: "#000000",
      200: "#000000",
      300: "#000000",
      400: "#000000",
      500: "#666666",
      600: "#009900",
      700: "#FF00FF",
      800: "#000000",
      900: "#000000",
    }
  }
})

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router}/>
    </ChakraProvider>
  </React.StrictMode>,
)
