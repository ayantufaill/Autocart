import { useEffect, useMemo } from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

import { useRouter } from "next/router";
import { Box, CssBaseline } from "@mui/material";
import Header from "@/components/core/Header/Header";
import { ToastContainer } from "react-toastify";
import Sidebar from "@/components/core/Sidebar/Sidebar";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const hideHeaderRoutes = useMemo(
    () => ["/authentication/sign-in", "/authentication/sign-up"],
    []
  );

  const hideHeader = hideHeaderRoutes.includes(router.pathname);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const unprotectedRoutes = ["/", ...hideHeaderRoutes];

    const isProtected = !unprotectedRoutes.includes(router.pathname);

    if (!token && isProtected) {
      router.replace("/authentication/sign-in");
    }
  }, [hideHeaderRoutes, router]);

  return (
    <>
      <Provider store={store}>
        <CssBaseline />
        {!hideHeader && <Header />}
        {!hideHeader && (
          <Box
            sx={{
              width: { xs: "100%", md: "240px" },
              position: { xs: "fixed", md: "relative" },
              bottom: { xs: 0, md: "auto" },
              left: 0,
              zIndex: 1000,
            }}
          >
            <Sidebar />
          </Box>
        )}
        <Component {...pageProps} />
      </Provider>
      <ToastContainer />
    </>
  );
}
