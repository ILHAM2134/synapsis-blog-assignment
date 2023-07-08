// import { GetStaticProps } from "next";
import Head from "next/head";

const HeadComponent = () => {
  return (
    <>
      <Head>
        <title>Blog</title>
        <meta name="description" content="NextJS Blog App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
};

export default HeadComponent;

// export const getStaticProps: GetStaticProps = (context) => {
//   const { params } = context;
//   console.log(params);
//   return {
//     props: {
//       data: params,
//     },
//   };
// };
