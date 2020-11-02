import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  console.log("suposed to print");
  return (
    <div className={styles.container}>
      <Head>
        <title>CruiseBD</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <Link href="/booking">CruiseBD</Link>
        </h1>

      </main>

    </div>
  )
}
