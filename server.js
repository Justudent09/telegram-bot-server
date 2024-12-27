const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// 📝 Студенты
const students = [
    { number: 0, surname: 'Мустафаев', name: 'Зелимхан', patronymic: 'Шахидович' },
    { number: 1, surname: 'Умаров', name: 'Зелимхан', patronymic: 'Русланович' }
];

// 📝 Telegram ID (загружаем из файла, если существует)
let telegramIds = [];
if (fs.existsSync('telegramIds.json')) {
    telegramIds = JSON.parse(fs.readFileSync('telegramIds.json'));
} else {
    telegramIds = Array(students.length).fill(null);
}

// 🛡️ Сохранение Telegram ID в файл при обновлении
function saveTelegramIds() {
    fs.writeFileSync('telegramIds.json', JSON.stringify(telegramIds));
}

// 📌 Проверка Telegram ID
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

// 📌 Привязка Telegram ID к студенту
app.post('/api/bind-telegram-id', (req, res) => {
    const { telegramId, surname, name, patronymic } = req.body;

    console.log('🔗 Попытка привязки Telegram ID:', { telegramId, surname, name, patronymic });

    if (!telegramId || !surname || !name || !patronymic) {
        console.log('❌ Отсутствуют обязательные поля');
        return res.status(400).json({ success: false, message: 'Отсутствуют обязательные поля' });
    }

    // Ищем студента по ФИО
    const student = students.find(s => 
        s.surname === surname && s.name === name && s.patronymic === patronymic
    );

    if (!student) {
        console.log('❌ Студент не найден');
        return res.status(400).json({ success: false, message: 'Студент не найден' });
    }

    // Проверяем, что этот студент уже привязан к другому Telegram ID
    if (telegramIds[student.number] && telegramIds[student.number] !== telegramId) {
        console.log('❌ Студент уже зарегистрирован другим Telegram ID');
        return res.status(400).json({ success: false, message: 'Этот студент уже использует расписание' });
    }

    // Если ID уже привязан к этому студенту
    if (telegramIds[student.number] === telegramId) {
        console.log('✅ Telegram ID уже привязан к этому студенту');
        return res.json({ success: true, message: 'Этот студент уже использует расписание' });
    }

    // Привязываем Telegram ID к студенту
    telegramIds[student.number] = telegramId;
    saveTelegramIds(); // Сохраняем изменения в файл
    console.log('✅ Telegram ID успешно привязан');
    return res.json({ success: true, message: 'Telegram ID успешно привязан' });
});

// 📌 Тестовый маршрут для проверки работы сервера
app.get('/', (req, res) => {
    res.send('✅ Сервер работает корректно');
});

// 🛡️ Обработчик завершения процесса для сохранения данных
process.on('SIGINT', () => {
    saveTelegramIds();
    console.log('💾 Telegram ID сохранены');
    process.exit();
});

// 🚀 Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});