const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3008;
const secretKey = 'твій_секретний_ключ'; // Зберігай у .env у реальному проєкті!

// Middleware для обробки JSON-запитів
app.use(bodyParser.json());

// Імітація бази даних (масив користувачів)
const users = [];

// Реєстрація користувача
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Перевірка, чи користувач уже існує
  if (users.find(user => user.username === username)) {
    return res.status(400).json({ message: 'Користувач уже існує' });
  }

  // Хешування пароля
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Збереження користувача
  users.push({ username, password: hashedPassword });
  res.status(201).json({ message: 'Користувач успішно зареєстрований' });
});

// Вхід користувача з видачею JWT
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Пошук користувача
  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(400).json({ message: 'Користувача не знайдено' });
  }

  // Перевірка пароля
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Невірний пароль' });
  }

  // Генерація JWT
  const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
  res.status(200).json({ message: 'Успішний вхід', token });
});

// Middleware для перевірки JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'Токен відсутній' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Недійсний токен' });
    }
    req.user = user; // Додаємо користувача до запиту
    next();
  });
}

// Захищений маршрут
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: `Привіт, ${req.user.username}! Ти в захищеній зоні.` });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущено на http://localhost:${PORT}`);
});