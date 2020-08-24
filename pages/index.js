import Head from 'next/head'
import Nav from '../components/Global/Nav'
import Container from '../components/Global/Container'
import Cryptosphere from '../components/Cryptosphere/Cryptosphere'
import Overview from '../components/Overview/Overview'
import CurrentPrice from '../components/CurrentPrice/CurrentPrice'
import Markets from '../components/Markets/Markets'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />
      <Container>
        <div className="col-span-1">
          <Cryptosphere />
        </div>
        <Overview />
        <div className="col-span-1">
          <CurrentPrice />
          <Markets />
        </div>
      </Container>
    </div>
  )
}
