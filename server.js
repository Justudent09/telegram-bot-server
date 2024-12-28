const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { exec } = require('child_process');

const app = express();
app.use(cors());
app.use(express.json());

// 📌 Путь к students.json
const STUDENTS_FILE = 'students.json';

// 🛡️ Загрузка данных из JSON
function loadStudents() {
    if (fs.existsSync(STUDENTS_FILE)) {
        return JSON.parse(fs.readFileSync(STUDENTS_FILE, 'utf8'));
    }
    return [
        { number: 0, surname: 'Мустафаев', name: 'Зелимхан', patronymic: 'Шахидович', telegramId: null },
        { number: 1, surname: 'Умаров', name: 'Зелимхан', patronymic: 'Русланович', telegramId: null }
    ];
}

// 🛡️ Сохранение данных в JSON
function saveStudents(data) {
    fs.writeFileSync(STUDENTS_FILE, JSON.stringify(data, null, 2), 'utf8');
    pushChangesToGit();
}

// 🚀 Автоматический push изменений в GitHub
function pushChangesToGit() {
    exec('git add students.json && git commit -m "Update students.json on server" && git push', (err, stdout, stderr) => {
        if (err) {
            console.error('❌ Ошибка при пуше изменений:', stderr);
            return;
        }
        console.log('✅ Изменения успешно отправлены в GitHub:', stdout);
    });
}

// Инициализация данных
let students = loadStudents();

// 📌 Проверка Telegram ID
app.post('/api/check-telegram-id', (req, res) => {
    const { telegramId } = req.body;

    console.log('🔍 Проверка Telegram ID:', telegramId);

    if (!telegramId) {
        console.log('❌ Telegram ID не указан');
        return res.status(400).json({ success: false, message: 'Telegram ID не указан' });
    }

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

    // Ищем студента по ФИО
    const student = students.find(s => 
        s.surname === surname && s.name === name && s.patronymic === patronymic
    );

    if (!student) {
        console.log('❌ Студент не найден');
        return res.status(400).json({ success: false, message: 'Студент не найден' });
    }

    // Проверяем, что этот студент уже привязан к другому Telegram ID
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

// 📌 Эндпоинт для просмотра данных (для отладки)
app.get('/api/students', (req, res) => {
    res.json({ success: true, students });
});

// 📌 Тестовый маршрут для проверки работы сервера
app.get('/', (req, res) => {
    res.send('✅ Сервер работает корректно');
});

// 🛡️ Обработчик завершения процесса для сохранения данных
process.on('SIGINT', () => {
    saveStudents(students);
    console.log('💾 Telegram ID сохранены');
    process.exit();
});

// 🚀 Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});