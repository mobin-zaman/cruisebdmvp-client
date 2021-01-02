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
          Welcome to CruiseBD
        </h1>
        <h1 className={styles.title}>
        <Link href="/login">Login</Link>

        </h1>
        <h2>General Instructions to follow before using the website</h2>  
        <h3>1. You are strongly recommended to use this application in incognito mode of the browser.</h3> 
        <h3> 2. Google Chrome is recommended browser</h3> 
        <h3>3. If page takes to much time to load, return to this page </h3> 
        <h3>4. If you want to be confirmed whether your ticket purchase was successful or not, check the history page.</h3>

      </main>

    </div>
  )
}
