// 1st approach to connect database

// require("dotenv").config()

import dotenv from "dotenv"
import connectDB from "./db/index.js"

dotenv.config({
    path : './env'
})


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000 , () =>{
        console.log(`The port is running at port : ${process.env.PORT}`);
    })
})
.catch((err) =>{
    console.log("MongoDB connection Failed !!!", err);
})

/*
import express from "express"
const app = express()

(async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("Error", (Error)=>{
            console.log("Error: ", Error);
            throw error

        })

        app.listen(process.env.PORT, () =>{
            console.log(`App is listening on port ${process.env.PORT}`);
        })


    } catch (error) {
        console.error("Error", error);
        throw error
    }

}) ()
*/