const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const {OpenAIApi} = require('openai');

const openai = new OpenAIApi({
    apiKey: "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",
});

// setup server
const app = express();  
app.use(bodyParser.json());
app.use(cors());

// endPoint for chat gpt
app.post('/chat', async(req, res) => {
    const {prompt} = req.body;

    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        max_tokens:500,
        temperature:0,
        prompt: prompt,
    });
    res.send(completion.data.choices[0].text);
})

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost${PORT}`);
})