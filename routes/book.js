import express from 'express';
const booksRouter = express.Router();
// import { admin } from '../app.js';
import { db } from '../config.js'
import { doc } from 'firebase/firestore';

// const books = await fetch("../public/Goods/book/books.json", {
//     method: "GET",
//     // headers: {
//     //     "Content-Type": "application/json",
//     //     "Accept-Type": "application/json"
//     // }
// })

booksRouter.get("/", async (req, res, next) => {
    res.status(200).send("Hello, THIS IS STILL WIP");
})


export { booksRouter };
