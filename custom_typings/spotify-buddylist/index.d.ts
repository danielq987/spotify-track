declare module "spotify-buddylist" {
  export function getWebAccessToken(spdcCookie: string): Promise<{
    accessToken: string;
  }>;
  export function getFriendActivity(accessToken: string): Promise<Activity>;
}
