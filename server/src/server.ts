import express from 'express';
import cors from 'cors';
import { routes } from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/feedbacks', routes)

app.listen(3333, () => {
  console.log('It\'s alive!')
})