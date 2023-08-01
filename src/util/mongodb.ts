import { Db, MongoClient } from "mongodb";
import { NewOffer, Offer } from "./types";

const URI = process.env.MONGODB_URI ?? "";
const COLLECTION_NAME = process.env.DB_COLLECTION ?? "insurance";

let mongoClient: MongoClient;
let database: Db;

export async function connectToDatabase() {
  try {
    if (mongoClient && database) {
      return { mongoClient, database };
    }

    mongoClient = await new MongoClient(URI).connect();
    database = mongoClient.db(process.env.DB_NAME);
    return { mongoClient, database };
  } catch (e) {
    console.error(e);
  }
}

export const saveOffer = async (offer: NewOffer) => {
  try {
    const client = await connectToDatabase();
    const insuranceCollection = client?.database?.collection(COLLECTION_NAME);

    const result = await insuranceCollection?.insertOne(offer);
    return result;
  } catch (e) {
    console.error(e);
  }
};

export const getOffers = async () => {
  try {
    const client = await connectToDatabase();
    const insuranceCollection = client?.database.collection(COLLECTION_NAME);

    const offers = (await insuranceCollection?.find({}).toArray()) as Offer[];
    return {
      offers,
    };
  } catch (e) {
    return {
      offers: [],
    };
  }
};
