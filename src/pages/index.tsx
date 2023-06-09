import { Header, Hero, Modal, Row, SubscriptionPlan } from "@/components";
import { API_REQUEST } from "@/services/api.service";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { ITrendingMovie, MyList, Product } from "@/interfaces/app.interface";
import { useInfoStore } from "@/store";
import { getList } from "@/helpers/lists";
import { useState } from "react";

export default function Home({
  trending,
  topRated,
  tv_top_rated,
  popular,
  documentary,
  drama,
  animation,
  history,
  comedy,
  products,
  subscription,
  list,
}: HomeProps): JSX.Element {
  const { setModal, modal } = useInfoStore();
  const [isMember, setIsMember] = useState<boolean>(true);

  const handleClick = () => {
    setIsMember(!isMember);
  };
  //!subscription.length ||
  if (!isMember)
    return <SubscriptionPlan products={products} handleClick={handleClick} />;
  return (
    <div className="relative min-h-screen">
      <Head>
        <title>Home - Movies</title>
        <meta name="description" content="Your favourite movie app" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/Logo.svg" />
      </Head>
      <Header setIsMember={handleClick} />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <Hero trending={trending} />
        <section className="pt-[100px] md:pt-[200px]">
          <Row title="Top Rated Movies" movies={topRated} />
          {list.length ? <Row title="My List" movies={list} /> : null}
          <Row title="TV Show" movies={tv_top_rated} isBig={true} />
          <Row title="Popular Movies" movies={popular} />
          <Row title="Animation Movies" movies={animation} isBig={true} />
          <Row title="History Movies" movies={history} />
          <Row title="Comedy Movies" movies={comedy} isBig={true} />
          <Row title="Documentary Movies" movies={documentary} />
          <Row title="Drama Movies" movies={drama} isBig={true} />
        </section>
      </main>
      {modal && <Modal />}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({
  req,
}) => {
  const user_id = req.cookies.user_id;

  if (!user_id) {
    return {
      redirect: { destination: "/auth", permanent: false },
    };
  }
  const [
    trending,
    topRated,
    popular,
    tv_top_rated,
    documentary,
    comedy,
    animation,
    history,
    drama,
    products,
    subscription,
  ] = await Promise.all([
    fetch(API_REQUEST.trending).then((res) => res.json()),
    fetch(API_REQUEST.top_rated).then((res) => res.json()),
    fetch(API_REQUEST.popular).then((res) => res.json()),
    fetch(API_REQUEST.tv_top_rated).then((res) => res.json()),
    fetch(API_REQUEST.documentary).then((res) => res.json()),
    fetch(API_REQUEST.comedy).then((res) => res.json()),
    fetch(API_REQUEST.animation).then((res) => res.json()),
    fetch(API_REQUEST.history).then((res) => res.json()),
    fetch(API_REQUEST.drama).then((res) => res.json()),
    fetch(API_REQUEST.products_list).then((res) => res.json()),
    fetch(`${API_REQUEST.subscription}/${user_id}`).then((res) => res.json()),
  ]);

  const myList: MyList[] = await getList(user_id);
  // const trending = await fetch(API_REQUEST.trending).then((res) => res.json());
  // const topRated = await fetch(API_REQUEST.top_rated).then((res) => res.json());
  // const popular = await fetch(API_REQUEST.popular).then((res) => res.json());
  // const tv_top_rated = await fetch(API_REQUEST.tv_top_rated).then((res) =>
  //   res.json()
  // );
  // const documentary = await fetch(API_REQUEST.documentary).then((res) =>
  //   res.json()
  // );
  // const comedy = await fetch(API_REQUEST.comedy).then((res) => res.json());
  // const animation = await fetch(API_REQUEST.animation).then((res) =>
  //   res.json()
  // );
  // const history = await fetch(API_REQUEST.history).then((res) => res.json());
  // const drama = await fetch(API_REQUEST.drama).then((res) => res.json());

  return {
    props: {
      trending: trending.results,
      topRated: topRated.results,
      tv_top_rated: tv_top_rated.results,
      popular: popular.results,
      documentary: documentary.results,
      comedy: comedy.results,
      history: history.results,
      drama: drama.results,
      animation: animation.results,
      products: products.products.data,
      subscription: subscription.subscription.data,
      list: myList.map((c) => c.product),
    },
  };
};
interface HomeProps {
  trending: ITrendingMovie[];
  topRated: ITrendingMovie[];
  tv_top_rated: ITrendingMovie[];
  popular: ITrendingMovie[];
  documentary: ITrendingMovie[];
  comedy: ITrendingMovie[];
  history: ITrendingMovie[];
  animation: ITrendingMovie[];
  drama: ITrendingMovie[];
  products: Product[];
  subscription: string;
  list: ITrendingMovie[];
}
