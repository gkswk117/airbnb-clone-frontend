import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import * as React from "react"
import * as ReactDOM from "react-dom/client"
import router from "./router"
import { RouterProvider } from "react-router-dom"
import theme from "./theme";

const container = document.getElementById("root")
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container)

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode}></ColorModeScript>
      <RouterProvider router={router}/>
    </ChakraProvider>
  </React.StrictMode>,
)
