const express = require('express');

const loginRouter = require('./routers/login.router');
const userRouter = require('./routers/user.router');

const errorHandler = require('./middlewares/error.middleware');

// ...

const app = express();

app.use(express.json());

// ...

app.use('/login', loginRouter);
app.use('/user', userRouter);

app.use(errorHandler);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
