import { Feedback } from "@/types";
import axios from "axios";

const fetcher = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_API_URL,
  method: "POST",
});

export class FeedbackService {
  public static sendFeedback = async (feedback: Feedback): Promise<boolean> => {
    try {
      const response = await fetcher.post("/recordUser", feedback);
      return response.status === 200;
    } catch (error) {
      console.error("FeedbackService.sendFeedback: ", error);
      return false;
    }
  };
}
