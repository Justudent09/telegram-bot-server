const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// 📝 Загрузка данных студентов из JSON-файла
const STUDENTS_FILE = 'students.json';

function loadStudents() {
    if (fs.existsSync(STUDENTS_FILE)) {
        return JSON.parse(fs.readFileSync(STUDENTS_FILE));
    }
    return [];
}

function saveStudents(students) {
    fs.writeFileSync(STUDENTS_FILE, JSON.stringify(students, null, 2));
}

// 📌 Проверка Telegram ID
app.post('/api/check-telegram-id', (req, res) => {
    const { telegramId } = req.body;

    console.log('🔍 Проверка Telegram ID:', telegramId);

    if (!telegramId) {
        console.log('❌ Telegram ID не указан');
        return res.status(400).json({ success: false, message: 'Telegram ID не указан' });
    }

    const students = loadStudents();
    const isRegistered = students.some(student => student.telegramId === telegramId);

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

    let students = loadStudents();

    // Ищем студента по ФИО
    const student = students.find(s => 
        s.surname === surname && s.name === name && s.patronymic === patronymic
    );

    if (!student) {
        console.log('❌ Студент не найден');
        return res.status(400).json({ success: false, message: 'Студент не найден' });
    }

    // Проверяем, что студент уже зарегистрирован
    if (student.telegramId && student.telegramId !== telegramId) {
        console.log('❌ Студент уже зарегистрирован другим Telegram ID');
        return res.status(400).json({ success: false, message: 'Этот студент уже использует расписание' });
    }

    // Если ID уже привязан к этому студенту
    if (student.telegramId === telegramId) {
        console.log('✅ Telegram ID уже привязан к этому студенту');
        return res.json({ success: true, message: 'Этот студент уже использует расписание' });
    }

    // Привязываем Telegram ID к студенту
    student.telegramId = telegramId;
    saveStudents(students); // Сохраняем изменения в файл

    console.log('✅ Telegram ID успешно привязан');
    return res.json({ success: true, message: 'Telegram ID успешно привязан' });
});

// 📌 Тестовый маршрут для проверки работы сервера
app.get('/', (req, res) => {
    res.send('✅ Сервер работает корректно');
});

// 🛡️ Обработчик завершения процесса для сохранения данных
process.on('SIGINT', () => {
    console.log('💾 Telegram ID сохранены');
    process.exit();
});

// 🚀 Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});