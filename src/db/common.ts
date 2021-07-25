import { Activity, SingleActivity, uri } from "../../custom_typings/types";
import Mongo from "./base";

const lastTimestamps = new Map();

/**
 * Update collection of all users.
 */
const updateUsers = async (users: SingleActivity[]): Promise<void> => {
  if (!users) {
    console.log("Access token expired, probably");
    return;
  }
  users.forEach(async (user) => {
    const updated = await Mongo.updateUser(user.user);
    if (updated.modifiedCount !== 0) {
      console.log(`NEW USER - ${user.user.name}`);
    }
  });
};

/**
 * Compares the current user track with his/her most recent listened track.
 * Prevents unecessary inserts into collection.
 */
const hasChanged = async (
  userUri: uri,
  timestamp: number
): Promise<boolean> => {
  // If timestamp is still the same as last update, then nothing has changed.
  const storedTimestamp = lastTimestamps.get(userUri);
  if (storedTimestamp) {
    return lastTimestamps.get(userUri) !== timestamp;
  }
  // console.log("querying");

  const mostRecent = await Mongo.getMostRecent(userUri);

  // No most recent entry found.
  if (!mostRecent) {
    return true;
  }

  return mostRecent.timestamp !== timestamp;
};

/**
 * Insert single activity in collection.
 */
const insertOneActivity = async (activity: SingleActivity): Promise<void> => {
  const { user, timestamp, track } = activity;

  if (await hasChanged(user.uri, timestamp)) {
    console.log(`~~ ${user.name} is listening to - ${track.name}`);
    await Mongo.insertHistory(activity);
  }

  lastTimestamps.set(user.uri, timestamp);
  // else {
  //   console.log(`// ${user.name} - no update`);
  // }
};

/**
 * Parses the JSON returned by spotify-buddylist and inserts into Mongo.
 */
const insertAllActivity = async (activity: Activity): Promise<void> => {
  const friends = activity.friends;
  if (!friends) {
    console.log("Access token expired, probably", activity);
    return;
  }
  await Promise.all(
    friends.map(async (friendActivity) => {
      await insertOneActivity(friendActivity);
    })
  );
};

export { insertAllActivity, updateUsers };
