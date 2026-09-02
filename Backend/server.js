require('dotenv').config();

const express = require('express');
const { mongoDB } = require('./src/configs/db');
const cors = require('cors');
const dns = require('dns');
const { taskRouter } = require('./src/routes/task.route');
const { userRouter } = require('./src/routes/user.route');

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
    origin: process.env.FRONTEND_URL || 'https://voluble-dango-aabb31.netlify.app',
    credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoDB();

app.use('/api', userRouter);
app.use('/api', taskRouter);

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});


