import { Header } from "@/components";
import Head from "next/head";
export default function Home() {
  return (
    <div className="relative h-screen">
      <Head>
        <title>Home - Movies</title>
        <meta name="description" content="Your favourite movie app" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/Logo.svg" />
      </Head>
      <Header />
      <main></main>
    </div>
  );
}
