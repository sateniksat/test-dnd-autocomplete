import { Provider } from "react-redux";
import store from "./redux/store";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import Login from "./pages/Login";
import Home from "./pages/Home";
import FirstPage from "./pages/FirstPage";
import ProtectedRout from "./components/ProtectedRoute";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import "./assets/font/font.css";
// import { create } from "jss";
// import rtl from "jss-rtl";
// import { StylesProvider, jssPreset } from "@mui/styles";
import { StyleSheetManager } from "styled-components";

// Configure JSS
// const jss = create({
//   plugins: [...jssPreset().plugins, rtl()],
// });

const THEME = createTheme({
  typography: {
    fontFamily: ["IRANSans"].join(","),
  },
});

export const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
function App() {
  return (
    <>
      <Provider store={store}>
        <CacheProvider value={cacheRtl}>
          {/* <StylesProvider jss={jss}> */}
            <StyleSheetManager stylisPlugins={[rtlPlugin]}>
              <ThemeProvider theme={THEME}>
                <Routes>
                  <Route path={"/"} element={<FirstPage />} />

                  <Route path={"login"} element={<Login />} />
                  <Route
                    path="home"
                    element={
                      <ProtectedRout>
                        <Home />
                      </ProtectedRout>
                    }
                  />
                </Routes>
              </ThemeProvider>
            </StyleSheetManager>

          {/* </StylesProvider> */}
        </CacheProvider>
      </Provider>
    </>
  );
}

export default App;
