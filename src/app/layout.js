import "./globals.css";

export const metadata = {
  title: "Portal",
  description: "Windows into projects/practices",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
