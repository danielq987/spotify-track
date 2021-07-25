import Mongo from "./db/base";
import { insertAllActivity, updateUsers } from "./db/common";
import { getActivity } from "./utils/spt";
import { scheduleJob } from "node-schedule";

const run = async () => {
  await Mongo.init();

  // Logs activities.
  const logActivities = async () => {
    const activity = await getActivity();

    if (activity.friends) {
      console.log(`========${new Date().toLocaleTimeString("en-US")}=======`);
      await insertAllActivity(activity);
    }
  };

  const trackUsers = async () => {
    const activity = await getActivity();
    if (activity.friends) {
      await updateUsers(activity.friends);
    }
  };

  await logActivities();
  // await trackUsers();

  scheduleJob("*/20 * * * * *", async () => {
    await logActivities();
  });
  // scheduleJob("0 0 * * *", async () => {
  //   await trackUsers();
  // });
};

run();
