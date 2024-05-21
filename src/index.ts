import express, { NextFunction, Request, Response } from 'express';
import  {connectDB}  from './utils/db';
import config from './utils/config';
import cors from 'cors'
import userRouter from './routes/user.route';
import listItemRouter from './routes/userListItem.route'
import contentRouter from './routes/content.route';
import path from 'path';
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger_output.json')

connectDB()
const app = express();
app.use(cors())
app.use(express.json());



app.use('/user',userRouter);
app.use('/listItem', listItemRouter);
app.use('/content',contentRouter)
app.get('/health', (req:Request, res:Response,next:NextFunction) => {
    res.status(200).json({ status: 'ok' });
  });
  app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.listen(config.PORT||3000,()=>{
    console.log("server started on port",config.PORT);
  //  console.log(`${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@mongo:27017/${process.env.MONGO_INITDB_DATABASE}?authSource=admin`)
})

export default app;