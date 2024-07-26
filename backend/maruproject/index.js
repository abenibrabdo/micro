const express = require('express');
const cors = require('cors');
const { PORT } = require('./config');
const connectDB = require('./config/db');
const projectsRouter = require('./routes/project');
const usersRouter = require('./routes/user');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cors());
app.use(express.static(__dirname + '/public'));

// Routes
app.use('/api/projects', projectsRouter);
app.use('/api/users', usersRouter);







//  rabit mQ


const connect = require('./rabbitmq');

app.use(express.json());

app.post('/send', async (req, res) => {
    try {
        const channel = await connect();
        const queue = 'my_queue';
        const message = req.body.message || 'Hello RabbitMQ!';

        await channel.assertQueue(queue);
        channel.sendToQueue(queue, Buffer.from(message));
        
        res.send('Message sent to RabbitMQ');
    } catch (error) {
        res.status(500).send('Error sending message');
    }
});



// Default Route
app.use('/', (req, res) => {
  res.send({ message: "Fasil's Service!" });
});

// Start Server
const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Listening at port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();
