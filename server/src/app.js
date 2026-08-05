import dotenv from "dotenv";
import express from 'express'
import {getAllItem, postItems} from './controllers/itemController.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || '8080';

// body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/get-items', getAllItem)
// app.post('post-items' postItems)

async function start() {
  app.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT}`);
  })
}

start()
