require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
sequelize = require('./db/db');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3001;

const employeesRoutes = require('./routes/employeesRoutes');
const patientRecordsRoutes = require('./routes/patientRecordsRoutes');

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '../client/public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.use('/api', employeesRoutes);
app.use('/api', patientRecordsRoutes);


const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`Сервер запущен на http://localhost:${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
};

start();
