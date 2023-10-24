import Head from 'next/head'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css';

import WeatherModal from '@/modals/WeatherModal';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href="/static/cloudy-day-1.svg" />
        <title>Weather Dashboard</title>
      </Head>
      <WeatherModal />
      <footer style={{position:'absolute', bottom:'0%', color:'white', width:'100%', justifyContent:'center', display:'inline-flex'}}>
        <i>Developed By Kolby, Steven, Parker, and Craig</i>
      </footer>
    </>
  )
}
