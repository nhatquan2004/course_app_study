const express = require('express');
const morgan = require('morgan');
const courseRoute = require('./routes/course');
const categoryRoute = require('./routes/category');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');

const app = express();
const fetchDB = require('./database');
const cors = require('cors');
const port = 3001;
fetchDB();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use('/courses', courseRoute);
app.use('/category', categoryRoute);
app.use('/user', userRoute);
app.use('/auth', authRoute);

app.get('/', (rep, res) => {
	res.send('hello');
});

app.listen(port, () => {
	console.log('start port', port);
});
