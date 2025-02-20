import GlobalStyle from "../styles";
import { SWRConfig } from "swr";

const fetcher = async (URL) => {
  const response = await fetch(URL)
  return await response.json()
}

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig
    value={{ fetcher }}
  >
    <GlobalStyle/>
    <Component {...pageProps} />
  </SWRConfig>
)}
