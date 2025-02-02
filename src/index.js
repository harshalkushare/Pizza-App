const express = require('express');
const serverConfig = require('./config/serverConfig');
const connectDB = require('./config/dbConfig');
const userRouter = require('./routes/userRoute');
const cartRouter = require('./routes/cartRoute');
const authRouter = require('./routes/authRoute');
const cookieParser = require('cookie-parser');
const productRouter = require('./routes/productRoute');
const orderRouter = require('./routes/orderRoutes');
const cors = require('cors');

const app = express();
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
}));
//Middlewares
app.use(cookieParser()); 
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

//Routing Middlewares
app.use('/users', userRouter);
app.use('/carts', cartRouter);
app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/orders',orderRouter);

app.listen(serverConfig.PORT, async () => {
    await connectDB();
    console.log(`Server started at port: ${serverConfig.PORT}`);
});

