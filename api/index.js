import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
console.log("MONGODB_URI:", process.env.MONGODB_URI);

const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await client.connect();
      console.log("Успешное подключение");

      const database = client.db("asd");
      const collection = database.collection("users1");

      const users = await collection.find({}).toArray();
      console.log("Записи из коллекции users1:", users);

      res.status(200).json(users);
    } catch (error) {
      console.error("Ошибка получения данных:", error);
      res.status(500).json({ error: "Ошибка получения данных" });
    } finally {
      await client.close();
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Метод ${req.method} не поддерживается`);
  }
}
