import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: "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", 
});

async function main() {
  const params = {
    messages: [{ role: 'user', content: 'Say this is a test' }],
    model: 'gpt-3.5-turbo',
  };
  try {
    const completion = await openai.chat.completions.create(params);
    console.log(completion)
    
  } catch (error) {
     console.log(error)
  }
}

main();