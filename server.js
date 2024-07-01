const PORT = 8000
const express = require("express")
const app = express()
const cors = require("cors")


app.use(cors())
app.use(express.json())
require("dotenv").config()

const {GoogleGenerativeAI} = require("@google/generative-ai")

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_API_KEY)


app.post("/gemini", async (req,res) => {

    console.log(req.body.history);
    console.log(req.body.message);

    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    const chat = model.startChat({
      history: req.body.history 
    });

    const message = req.body.message

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    res.send(text)
  
})


app.listen(PORT, () => console.log("LISTENING AT PORT "))

