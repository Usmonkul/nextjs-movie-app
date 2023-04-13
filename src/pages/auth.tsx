import Head from "next/head";

const Auth = () => {
  return (
    <>
      <Head>
        <title>Auth</title>
        <meta
          name="description"
          content="For using our application, You should sign in first"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <h1 className="text-2xl font-bold text-center">Sign in</h1>
    </>
  );
};

export default Auth;
