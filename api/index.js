import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI; // Используем переменную окружения для безопасности
console.log('MONGODB_URI:', process.env.MONGODB_URI);

// Создание экземпляра MongoClient с параметрами
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === 'GET') { // Проверяем, что метод запроса - GET
    try {
      // Подключение клиента к серверу
      await client.connect();
      console.log("Успешное подключение");

      // Получаем доступ к базе данных и коллекции
      const database = client.db('asd'); // Укажите имя вашей базы данных
      const collection = database.collection('users1'); // Укажите имя коллекции

      const users = await collection.find({}).toArray(); // Получаем все документы из коллекции
      console.log('Записи из коллекции users1:', users); 

      // Возвращаем пользователям данные
      res.status(200).json(users);
    } catch (error) {
      console.error('Ошибка получения данных:', error);
      res.status(500).json({ error: 'Ошибка получения данных' });
    } finally {
      // Закрытие соединения
      await client.close();
    }
  } else {
    // Обработка других методов
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Метод ${req.method} не поддерживается`);
  }
}
