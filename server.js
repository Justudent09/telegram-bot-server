const express = require('express');
const cors = require('cors'); // Добавим CORS
const app = express();

app.use(cors()); // Разрешаем CORS
app.use(express.json()); // Обрабатываем JSON

const students = [
    { number: 0, surname: 'Мустафаев', name: 'Зелимхан', patronymic: 'Шахидович' },
    { number: 1, surname: 'Умаров', name: 'Зелимхан', patronymic: 'Русланович' }
];

let telegramIds = Array(students.length).fill(null);

// Логируем все запросы
app.use((req, res, next) => {
    console.log(`Запрос: ${req.method} ${req.url}`);
    console.log('Тело запроса:', req.body);
    next();
});

// Маршрут для привязки Telegram ID
app.post('/api/bind-telegram-id', (req, res) => {
    const { telegramId, surname, name, patronymic } = req.body;

    console.log('Полученные данные:', { telegramId, surname, name, patronymic });

    if (!telegramId || !surname || !name || !patronymic) {
        console.log('Ошибка: отсутствуют обязательные поля');
        return res.status(400).json({ success: false, message: 'Отсутствуют обязательные поля' });
    }

    const student = students.find(s => 
        s.surname === surname && s.name === name && s.patronymic === patronymic
    );

    if (!student) {
        console.log('Ошибка: студент не найден');
        return res.status(400).json({ success: false, message: 'Студент не найден' });
    }

    if (telegramIds[student.number]) {
        console.log('Ошибка: студент уже зарегистрирован');
        return res.status(400).json({ success: false, message: 'Этот студент уже зарегистрирован' });
    }

    telegramIds[student.number] = telegramId;
    console.log('Успешная привязка Telegram ID');
    return res.json({ success: true, message: 'Telegram ID успешно привязан' });
});

// Маршрут для проверки доступности сервера
app.get('/', (req, res) => {
    res.send('Сервер работает корректно');
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));