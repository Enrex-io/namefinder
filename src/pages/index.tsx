import Head from "next/head";
import { META } from "@/consts/meta";
import Sustainability from "@/containers/Sustainability/Sustainability";
import classes from "./index.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>{META.title}</title>
        <link rel="icon" href={META.favicon} />
        <meta name="description" content={META.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={classes.container}>
        <Sustainability />
      </div>
    </>
  );
}
