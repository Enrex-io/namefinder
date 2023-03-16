import { memo, useMemo } from "react";
import Chip from "@/components/Chip/Chip";
import Button from "@/components/Button/Button";
import classes from "./Share.module.scss";
import Paper from "@/components/Paper/Paper";
import {
  TwitterIcon,
  LinkedinIcon,
  TelegramIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  LinkedinShareButton,
  TelegramShareButton,
} from "react-share";

const HEADING_TEXT = "Invite others to join the sustainability movement!";
const MESSAGE = "My personalized sustainability goals were generated in just few clicks. Create your own path to sustainability with https://greengoals.ai";
const TITLE = "My personalized sustainability goals"
const LINK = "https://greengoals.ai";
const HASHTAG = "goals";

interface Props {}

const Share = ({}: Props) => {
  return (
    <div className={classes.container}>
      <h2 className={classes.heading}>{HEADING_TEXT}</h2>
      <Paper
        direction="row"
        wrap="wrap"
        alignItems="center"
        spacing={1}
        hasBorder
        className={classes.fieldsContainer}
      >
        <FacebookShareButton 
          quote={MESSAGE}
          hashtag={`#${HASHTAG}`}
          url={LINK}
        >
          <FacebookIcon />
        </FacebookShareButton>
        <TwitterShareButton 
          url={LINK}
          hashtags={[HASHTAG]}
          title={MESSAGE}
        >
          <TwitterIcon />
        </TwitterShareButton>
        <LinkedinShareButton 
          url={LINK}
          // source={LINK}
          // summary={MESSAGE}
          // title={TITLE}
        >
          <LinkedinIcon />
        </LinkedinShareButton>
        <TelegramShareButton 
          url={LINK}
          title={MESSAGE}
        >
          <TelegramIcon />
        </TelegramShareButton>
      </Paper>
    </div>
  );
};

export default memo(Share);
