// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
import readline from "readline";
import {Configuration,OpenAIApi} from "openai";
import dotenv from 'dotenv';
dotenv.config();


const configuration = new Configuration({
    organization: "org-0nmrFWw6wSm6xIJXSbx4FpTw",
    apiKey: process.env.API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "Hello" }],
  })
  .then((res) => {
    console.log(res.data.choices[0].message.content);
  })
  .catch((e) => {
    console.log(e);
  });

  const userInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  userInterface.prompt();

  userInterface.on("line", async (input) => {
    await openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: input }],
      })
      .then((res) => {
        console.log(res.data.choices[0].message.content);
        userInterface.prompt();
      })
      .catch((e) => {
        console.log(e);
      });
  });

// setup server
// const app = express();  
// app.use(bodyParser.json());
// app.use(cors());

// // endPoint for chat gpt
// app.post('/chat', async(req, res) => {
//     const {prompt} = req.body;

//     const completion = await openai.createCompletion({
//         model: "text-davinci-003",
//         max_tokens:500,
//         temperature:0,
//         prompt: prompt,
//     });
//     res.send(completion.data.choices[0].text);
// })

// const PORT = 8000;
// app.listen(PORT, () => {
//     console.log(`Server listening on http://localhost${PORT}`);
// })