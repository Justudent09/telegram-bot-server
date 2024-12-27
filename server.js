const express = require('express');
const app = express();
app.use(express.json());

const students = [
    { number: 0, surname: 'Мустафаев', name: 'Зелимхан', patronymic: 'Шахидович' },
    { number: 1, surname: 'Умаров', name: 'Зелимхан', patronymic: 'Русланович' }
];

let telegramIds = Array(students.length).fill(null);

app.post('/api/bind-telegram-id', (req, res) => {
    const { telegramId, surname, name, patronymic } = req.body;
    const student = students.find(s => 
        s.surname === surname && s.name === name && s.patronymic === patronymic
    );

    if (!student) {
        return res.status(400).json({ success: false, message: 'Студент не найден' });
    }

    if (telegramIds[student.number]) {
        return res.status(400).json({ success: false, message: 'Этот студент уже зарегистрирован' });
    }

    telegramIds[student.number] = telegramId;
    return res.json({ success: true, message: 'Telegram ID успешно привязан' });
});

app.listen(3000, () => console.log('Server is running on port 3000'));
