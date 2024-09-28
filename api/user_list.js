const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

module.exports = async (req, res) => {
  try {
    await client.connect();
    const id = req.query.postId;
    const database = client.db('asd');
    const collection = database.collection('registrations').find({ postId: id });
    const registration = await collection.toArray();
    res.status(200).json(registration);
  } catch (error) {
    console.error('Ошибка получения данных:', error);
    res.status(500).json({ error: 'Ошибка получения данных' });
  }
};
