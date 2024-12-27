const express = require('express');
const cors = require('cors'); // Для поддержки кросс-доменных запросов

const app = express();

// Middleware
app.use(cors()); // Разрешаем кросс-доменные запросы
app.use(express.json()); // Для обработки JSON-тел

// Массив студентов
const students = [
    { number: 0, surname: 'Мустафаев', name: 'Зелимхан', patronymic: 'Шахидович' },
    { number: 1, surname: 'Умаров', name: 'Зелимхан', patronymic: 'Русланович' }
];

// Массив Telegram ID (null по умолчанию)
let telegramIds = Array(students.length).fill(null);

// 🛡️ Проверка Telegram ID (на входе в WebApp)
app.post('/api/check-telegram-id', (req, res) => {
    const { telegramId } = req.body;

    console.log('🔍 Проверка Telegram ID:', telegramId);

    if (!telegramId) {
        console.log('❌ Telegram ID не указан');
        return res.status(400).json({ success: false, message: 'Telegram ID не указан' });
    }

    const isRegistered = telegramIds.includes(telegramId);

    if (isRegistered) {
        console.log('✅ Telegram ID уже зарегистрирован');
        return res.json({ success: true, message: 'Telegram ID уже зарегистрирован' });
    }

    console.log('❌ Telegram ID не найден');
    return res.json({ success: false, message: 'Telegram ID не найден' });
});

// 📝 Привязка Telegram ID к студенту
app.post('/api/bind-telegram-id', (req, res) => {
    const { telegramId, surname, name, patronymic } = req.body;

    console.log('🔗 Попытка привязки Telegram ID:', { telegramId, surname, name, patronymic });

    if (!telegramId || !surname || !name || !patronymic) {
        console.log('❌ Отсутствуют обязательные поля');
        return res.status(400).json({ success: false, message: 'Отсутствуют обязательные поля' });
    }

    const student = students.find(s => 
        s.surname === surname && s.name === name && s.patronymic === patronymic
    );

    if (!student) {
        console.log('❌ Студент не найден');
        return res.status(400).json({ success: false, message: 'Студент не найден' });
    }

    if (telegramIds[student.number]) {
        console.log('❌ Этот студент уже зарегистрирован');
        return res.status(400).json({ success: false, message: 'Этот студент уже зарегистрирован' });
    }

    // Привязываем Telegram ID к студенту
    telegramIds[student.number] = telegramId;
    console.log('✅ Telegram ID успешно привязан');
    return res.json({ success: true, message: 'Telegram ID успешно привязан' });
});

// 🛠️ Тестовый маршрут для проверки работы сервера
app.get('/', (req, res) => {
    res.send('✅ Сервер работает корректно');
});

// 🚀 Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});