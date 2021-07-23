import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.DB_URI;
const db = "spotify";

class Mongo {
  client: MongoClient;
  db!: Db;
  constructor() {
    this.client = new MongoClient(URI);
  }

  async init() {
    await this.client.connect();
    this.db = this.client.db(db);
    console.log("Mongo client started!");
  }
}

export default new Mongo();
