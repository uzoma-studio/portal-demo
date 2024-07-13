import "./globals.css";
import { getData, dataMapper } from '../../data/fetchContent'
import { AppProvider } from '../../context'

export const metadata = {
  title: "Portal",
  description: "Creative site templates for artists",
};

// Retrieve data from the server at build time
const pages = await getData('pages')
const siteSettings = await getData('setting')

// Take the data from the CMS and transform it to a format template files can use instead of interacting with CMS schema directly
const pagesData = dataMapper(pages.data)

export const appState = {
  pages: pagesData,
  siteSettings: siteSettings.data.attributes
}

export default async function RootLayout({ children }) {

  return (
    <html lang="en">
      <AppProvider value={appState}>
        <body>{children}</body>
      </AppProvider>
    </html>
  );
}
