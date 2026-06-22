import "./globals.css";
import { Toaster } from "../components/ui/sonner";
import SiteFooter from "../components/section/siteFooter";
import NavigationBar from "../components/section/navigationBar.jsx"
import StoreProvider from "../components/redux/provider/storeProvider";
import AuthProvider from "@/components/redux/provider/authProvider.jsx";


export const metadata = {
  title: "StreamVault",
  description: "A next JS video straming application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <AuthProvider>
            <NavigationBar/>
              {children}
            <SiteFooter/>
            <Toaster theme="dark" richColors/>
        </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
