import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import bodyParser from "body-parser";
import appController from "./Controllers/appController.js";

dotenv.config();
const app = express()
app.use(express.json());

// const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY, });



app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send('hellow world!')
})

app.post('/prompts',appController.post);

app.listen(process.env.PORT, (req, res) => {
    console.log(`Listening on port ${process.env.PORT}...`)
})