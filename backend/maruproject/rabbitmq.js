const amqp = require('amqplib');

const RABBITMQ_URL = 'amqp://localhost'; // Default RabbitMQ URL

async function connect() {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        console.log('Connected to RabbitMQ');
        return channel;
    } catch (error) {
        console.error('Error connecting to RabbitMQ', error);
        process.exit(1);
    }
}

module.exports = connect;
