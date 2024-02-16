import "./globals.css";

export const metadata = {
  title: "Portal",
  description: "Windows into practices & projects",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
