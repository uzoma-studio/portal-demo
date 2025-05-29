import "./globals.css";
import { AuthProvider } from '@/app/(frontend)/context/AuthProvider';

export const metadata = {
  //TODO: Update to use siteTitle and siteDescription set in CMS
  title: "Portal",
  description: "Creative site templates for artists",
};

export default function RootLayout({ children }) {
  return (
    <div className="app">
      <AuthProvider>
        {children}
      </AuthProvider>
    </div>
  );
}
