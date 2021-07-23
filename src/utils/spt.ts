import { getWebAccessToken, getFriendActivity } from "spotify-buddylist";
import dotenv from "dotenv";

dotenv.config();

const SPDC_COOKIE = process.env.SPDC_COOKIE;

let accessToken: string;

const getActivity = async () => {
  const getAccessToken = async () => {
    try {
      const { accessToken } = await getWebAccessToken(SPDC_COOKIE);
      return accessToken;
    } catch (error) {
      console.error(error);
      return "";
    }
  };

  accessToken = await getAccessToken();

  return await getFriendActivity(accessToken);
};

export { getActivity };
