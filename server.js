const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

// 🔑 Инициализация Firebase Admin SDK
const serviceAccount = require('./fir-16f0f-firebase-adminsdk-e925d-49823bb9bc.json'); // Убедись, что файл добавлен в проект

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fir-16f0f-default-rtdb.firebaseio.com"
});

const db = admin.database();

const app = express();
app.use(cors());
app.use(express.json());

// 📌 Проверка Telegram ID
app.post('/api/check-telegram-id', async (req, res) => {
    const { telegramId } = req.body;

    if (!telegramId) {
        return res.status(400).json({ success: false, message: 'Telegram ID не указан' });
    }

    try {
        const snapshot = await db.ref('/students').once('value');
        const students = snapshot.val() || [];
        const isRegistered = Object.values(students).some(student => student.telegramId === telegramId);

        return res.json({ 
            success: isRegistered, 
            message: isRegistered ? 'Telegram ID уже зарегистрирован' : 'Telegram ID не найден' 
        });
    } catch (error) {
        console.error('Ошибка при проверке Telegram ID:', error);
        return res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
});

// 📌 Привязка Telegram ID к студенту
app.post('/api/bind-telegram-id', async (req, res) => {
    const { telegramId, surname, name, patronymic } = req.body;

    if (!telegramId || !surname || !name || !patronymic) {
        return res.status(400).json({ success: false, message: 'Отсутствуют обязательные поля' });
    }

    try {
        const snapshot = await db.ref('/students').once('value');
        const students = snapshot.val() || [];

        const studentKey = Object.keys(students).find(key => 
            students[key].surname === surname && 
            students[key].name === name && 
            students[key].patronymic === patronymic
        );

        if (!studentKey) {
            return res.status(400).json({ success: false, message: 'Студент не найден' });
        }

        if (students[studentKey].telegramId && students[studentKey].telegramId !== telegramId) {
            return res.status(400).json({ success: false, message: 'Этот студент уже использует расписание' });
        }

        students[studentKey].telegramId = telegramId;
        await db.ref(`/students/${studentKey}`).update({ telegramId });

        return res.json({ success: true, message: 'Telegram ID успешно привязан' });
    } catch (error) {
        console.error('Ошибка при привязке Telegram ID:', error);
        return res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
});

// 📌 Добавление нового студента
app.post('/api/add-student', async (req, res) => {
    const { surname, name, patronymic } = req.body;

    if (!surname || !name || !patronymic) {
        return res.status(400).json({ success: false, message: 'Все поля обязательны' });
    }

    try {
        const snapshot = await db.ref('/students').once('value');
        const students = snapshot.val() || [];

        const newStudent = {
            number: Object.keys(students).length,
            surname,
            name,
            patronymic,
            telegramId: null
        };

        await db.ref(`/students/${newStudent.number}`).set(newStudent);

        return res.json({ success: true, message: 'Студент успешно добавлен', student: newStudent });
    } catch (error) {
        console.error('Ошибка при добавлении студента:', error);
        return res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
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