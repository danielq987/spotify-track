import { MongoClient, Db } from "mongodb";
import { SingleActivity, uri, User } from "../../custom_typings/types";
import dotenv from "dotenv";

dotenv.config();

// Database connection string
const URI = process.env.DB_URI;

// Database name
const db = "spotify";

// Collections
const HISTORY = "history";
const USERS = "users";

class Mongo {
  client!: MongoClient;
  db!: Db;
  constructor() {
    if (URI) this.client = new MongoClient(URI);
  }

  async init() {
    if (this.client) {
      await this.client.connect();
      this.db = this.client.db(db);
      console.log("Mongo client started!");
    }
  }

  async #execute(fn: Promise<any>) {
    if (this.client) {
      return await fn;
    }
  }

  async insertHistory(activity: SingleActivity) {
    return await this.#execute(this.db.collection(HISTORY).insertOne(activity));
  }

  async getMostRecent(userUri: uri) {
    return await this.#execute(
      this.db
        .collection(HISTORY)
        .findOne({ "user.uri": userUri }, { sort: { timestamp: -1 } })
    );
  }

  async updateUser(user: User) {
    return await this.#execute(
      this.db
        .collection(USERS)
        .updateOne({ uri: user.uri }, { $set: { ...user } }, { upsert: true })
    );
  }
}

export default new Mongo();
