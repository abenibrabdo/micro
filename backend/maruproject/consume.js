const amqp = require('amqplib');

const RABBITMQ_URL = 'amqp://localhost'; // Default RabbitMQ URL

async function consume() {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        const queue = 'my_queue';

        await channel.assertQueue(queue);
        console.log('Waiting for messages in %s', queue);

        channel.consume(queue, (msg) => {
            if (msg !== null) {
                console.log('Received:', msg.content.toString());
                channel.ack(msg);
            }
        });
    } catch (error) {
        console.error('Error consuming message', error);
        process.exit(1);
    }
}

consume();
