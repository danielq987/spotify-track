import { getWebAccessToken, getFriendActivity } from "spotify-buddylist";
import dotenv from "dotenv";

dotenv.config();

const SPDC_COOKIE = process.env.SPDC_COOKIE;

let accessToken: string;

const getActivity = async () => {
  const getAccessToken = async () => {
    if (!SPDC_COOKIE) {
      console.error(
        "Error: Please provide SP_DC cookie. See README.md for details."
      );
    }
    try {
      const { accessToken } = await getWebAccessToken(SPDC_COOKIE);
      return accessToken;
    } catch (error) {
      console.error(error);
    }
    return "";
  };

  accessToken = await getAccessToken();

  if (accessToken) {
    return await getFriendActivity(accessToken);
  }
  return {};
};

export { getActivity };
