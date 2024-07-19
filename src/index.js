const express = require('express');
const serverConfig = require('./config/serverConfig');
const connectDB = require('./config/dbConfig');
const userRouter = require('./routes/userRoute');
const cartRouter = require('./routes/cartRoute');

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

//Routing Middleware
//if your req route starts with/users then handle it using userRouter
app.use('/users', userRouter);//connects the router to the server
app.use('/carts', cartRouter);

app.listen(serverConfig.PORT, async () => {
    await connectDB();
    console.log(`Server started at port: ${serverConfig.PORT}`);
});

