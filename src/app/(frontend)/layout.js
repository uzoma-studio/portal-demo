import "./globals.css";

export const metadata = {
  title: "Portal",
  description: "Creative site templates for artists",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
