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
const LINK = "https://greengoalsai.com";
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
        justifyContent="center"
        spacing={1}
        hasBorder
        className={classes.fieldsContainer}
      >
        <FacebookShareButton 
          quote={MESSAGE}
          hashtag={`#${HASHTAG}`}
          url={LINK}
          style={{ height: 40 }}
        >
          <FacebookIcon round={true} size={40} />
        </FacebookShareButton>
        <TwitterShareButton 
          url={LINK}
          hashtags={[HASHTAG]}
          title={MESSAGE}
          style={{ height: 40 }}
        >
          <TwitterIcon round={true} size={40} />
        </TwitterShareButton>
        <LinkedinShareButton 
          url={LINK}
          source={LINK}
          summary={MESSAGE}
          title={TITLE}
          style={{ height: 40 }}
        >
          <LinkedinIcon round={true} size={40} />
        </LinkedinShareButton>
        <TelegramShareButton 
          url={LINK}
          title={MESSAGE}
          style={{ height: 40 }}
        >
          <TelegramIcon round={true} size={40} />
        </TelegramShareButton>
      </Paper>
    </div>
  );
};

export default memo(Share);
