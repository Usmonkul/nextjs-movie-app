import { TextField } from "@/components";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
const Auth = () => {
  const [auth, setAuth] = useState<"signin" | "signup">("signin");
  const toggleAuth = (state: "signin" | "signup") => {
    setAuth(state);
  };
  const onSubmit = (formData: { email: string; password: string }) => {
    alert(JSON.stringify(formData, null, 2));
  };
  const validation = Yup.object({
    email: Yup.string()
      .email("Enter vailid Email")
      .required("Email is required"),
    password: Yup.string()
      .min(4, "Minimum 4 characters or letters")
      .required("Password is required"),
  });
  return (
    <div className="relative h-screen w-screen flex flex-col md:items-center md:justify-center">
      <Head>
        <title>Auth</title>
        <meta
          name="description"
          content="For watching movies you should sign to app"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src={"https://cdn.wallpapersafari.com/24/74/zgeTuV.jpg"}
        fill
        alt="bg"
        className="object-cover !hidden sm:!inline opacity-60 -z-10"
      />
      <Image
        src={"/Logo.svg"}
        alt="Logo"
        height={70}
        width={70}
        className="cursor-pointer object-contain absolute top-5 left-5"
      />
      <div className="relative mt-24 space-y-8 rounded flex flex-col bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14">
        <h2 className="text-4xl font-semibold uppercase">
          {auth === "signin" ? "Sign In" : "Sign Up"}
        </h2>
        <Formik
          validationSchema={validation}
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={onSubmit}
        >
          <Form>
            <div className="space-y-4">
              <TextField name="email" type="text" placeholder="Enter Your ID" />
              <TextField
                name="password"
                type="password"
                placeholder="Enter Your Password"
              />
            </div>
            {auth === "signin" ? (
              <button
                className="w-full mt-4 bg-[#E10856] py-3 font-semibold uppercase"
                type="submit"
              >
                Sign In
              </button>
            ) : (
              <button
                className="w-full mt-4 bg-[#E10856] py-3 font-semibold uppercase"
                type="submit"
              >
                Sign Up
              </button>
            )}
          </Form>
        </Formik>

        {auth === "signin" ? (
          <div className="text-[gray]">
            No account yet?{" "}
            <button
              type="button"
              className="text-white hover:underline"
              onClick={() => toggleAuth("signup")}
            >
              Sign Up Now
            </button>
          </div>
        ) : (
          <div className="text-[gray]">
            Already have account?{" "}
            <button
              type="button"
              className="text-white hover:underline"
              onClick={() => toggleAuth("signin")}
            >
              Sign In Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
