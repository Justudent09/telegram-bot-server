const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const STUDENTS_FILE = path.join('/data', 'students.json');

// 🛡️ Загрузка данных студентов
function loadStudents() {
    if (fs.existsSync(STUDENTS_FILE)) {
        return JSON.parse(fs.readFileSync(STUDENTS_FILE, 'utf8'));
    }
    return [
        { number: 0, surname: 'Мустафаев', name: 'Зелимхан', patronymic: 'Шахидович', telegramId: null },
        { number: 1, surname: 'Умаров', name: 'Зелимхан', patronymic: 'Русланович', telegramId: null }
    ];
}

// 🛡️ Сохранение данных студентов
function saveStudents(students) {
    fs.writeFileSync(STUDENTS_FILE, JSON.stringify(students, null, 2));
}

// 📌 Проверка Telegram ID
app.post('/api/check-telegram-id', (req, res) => {
    const { telegramId } = req.body;

    if (!telegramId) {
        return res.status(400).json({ success: false, message: 'Telegram ID не указан' });
    }

    const students = loadStudents();
    const isRegistered = students.some(student => student.telegramId === telegramId);

    return res.json({ success: isRegistered, message: isRegistered ? 'Telegram ID уже зарегистрирован' : 'Telegram ID не найден' });
});

// 📌 Привязка Telegram ID к студенту
app.post('/api/bind-telegram-id', (req, res) => {
    const { telegramId, surname, name, patronymic } = req.body;

    if (!telegramId || !surname || !name || !patronymic) {
        return res.status(400).json({ success: false, message: 'Отсутствуют обязательные поля' });
    }

    let students = loadStudents();
    const student = students.find(s => 
        s.surname === surname && s.name === name && s.patronymic === patronymic
    );

    if (!student) {
        return res.status(400).json({ success: false, message: 'Студент не найден' });
    }

    if (student.telegramId && student.telegramId !== telegramId) {
        return res.status(400).json({ success: false, message: 'Этот студент уже использует расписание' });
    }

    student.telegramId = telegramId;
    saveStudents(students);

    return res.json({ success: true, message: 'Telegram ID успешно привязан' });
});

// 📌 Добавление нового студента
app.post('/api/add-student', (req, res) => {
    const { surname, name, patronymic } = req.body;

    if (!surname || !name || !patronymic) {
        return res.status(400).json({ success: false, message: 'Все поля обязательны' });
    }

    let students = loadStudents();

    const newStudent = {
        number: students.length,
        surname,
        name,
        patronymic,
        telegramId: null
    };

    students.push(newStudent);
    saveStudents(students);

    return res.json({ success: true, message: 'Студент успешно добавлен', student: newStudent });
});

// 📌 Тестовый маршрут
app.get('/', (req, res) => {
    res.send('✅ Сервер работает корректно');
});

// 🚀 Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});