const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        logging: false,
    }
);

if (process.env.NODE_ENV !== 'production') {
sequelize
    .authenticate()
    .then(() => {
        console.log('Соединение с базой данных установлено успешно.');
    })
    .catch((error) => {
        console.error('Ошибка при установлении соединения с базой данных:', error);
    });

sequelize.sync()
    .then(() => {
        console.log('Синхронизация моделей успешно завершена.');
    })
    .catch((error) => {
        console.error('Ошибка при синхронизации моделей:', error);
    });
}

module.exports = sequelize;
