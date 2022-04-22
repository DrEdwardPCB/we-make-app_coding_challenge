import '../styles/globals.css'
import type { AppProps } from 'next/app'
import DefaultLayouts from '../components/Layouts/default';

function MyApp({ Component, pageProps }: AppProps) {
    return <DefaultLayouts><Component {...pageProps} /></DefaultLayouts>
}

export default MyApp
