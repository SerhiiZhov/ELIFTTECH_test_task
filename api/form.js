const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

module.exports = async (req, res) => {
  try {
    await client.connect();
    const { name, email, selectedDate, option, postId, currentDate } = req.body;
    const database = client.db('asd');
    const collection = database.collection('registrations');
    const result = await collection.insertOne({ name, email, date: selectedDate, option, postId, currentDate });
    res.status(201).json({ message: 'Регистрация прошла успешно!' });
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    res.status(500).json({ error: 'Ошибка регистрации' });
  }
};
