import { SessionProvider } from "next-auth/react";

import { Toast } from "../components/Toast";

import { AuthProvider } from "../contexts/authContext";
import { CalenderProvider } from "../contexts/calendarContext";
import { NotificationProvider } from "../contexts/notificationContext";
import { TagProvider } from "../contexts/TagContext";

import "../styles/global.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <CalenderProvider>
        <SessionProvider session={session}>
          <NotificationProvider>
            <TagProvider>
              <AuthProvider>
                <Component {...pageProps} />
                <Toast />
              </AuthProvider>
            </TagProvider>
          </NotificationProvider>
        </SessionProvider>
      </CalenderProvider>
    </>
  );
}

export default MyApp;
