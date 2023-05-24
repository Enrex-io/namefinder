import { useMemo } from "react";
import classes from "./LoadingMessage.module.scss";

interface Props {}

const messages = [
  "AI is like Frankenstein - amazing, but a little slow...",
  "AI is like dial up internet - you need to give it some time to boot up.",
  "Do you too start to feel how your hair is growing, while waiting for AI to load?",
  "It may be taking long to load, but aren't you excited about the results?",
  "So while we're waiting for AI to load, how was your day today?",
];

const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const LoadingMessage = ({}) => {
  const message = useMemo(() => messages[getRandomNumber(0, 4)], []);

  return (
    <div className={classes.container}>
      <h2 className={classes.heading}>{message}</h2>
    </div>
  );
};

export default LoadingMessage;
