import "./globals.css";
import { AuthProvider } from '@/app/(frontend)/context/AuthProvider';

export const metadata = {
  title: "Portal",
  description: "Creative site templates for artists",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
