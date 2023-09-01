import { useState } from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import './utils/home.css'
import './utils/input.js'


const API_KEY = "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";
const systemMessage = { 
  "role": "system", "content": "Explain things like you're talking to a software professional with 2 years of experience."
}

const  Home = () => {
  const [tcase, setTcase] = useState(0);
  const [title, setTitle] = useState("Title");
  const [steps, setSteps] = useState("");
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState("");
  const [allQuery,setAllQuery] = useState([]);


  const handleForm = (e) => {
    alert(tcase+" "+title+" "+steps+" "+notes+" "+result)

    setTcase(1+tcase);
    setTitle("");
    setSteps("");
    setNotes("");
    setResult("");
  }
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm Prompt GPT! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];
    
    setMessages(newMessages);

    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) { 

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message}
    });

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,  
        ...apiMessages 
      ]
    }

    await fetch("https://api.openai.com/v1/chat/completions", 
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      setMessages([...chatMessages, {
        message: data.choices[0].message.content,
        sender: "ChatGPT"
      }]);
      setIsTyping(false);
    });
  }

  return (
    <>
      <div class="container">
        <div class="left-panel">
            <div class="top-bar">
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
            </div>
            <div class="form">
                 <div class="form__group field">
                  <input type="input" class="form__field" placeholder="Name" name="name" id='name' required />
                  <label for="name" class="form__label">Test ID CASE</label>
                </div>
                 <div class="form__group field">
                  <input type="input" class="form__field" placeholder="Name" name="name" id='name' required />
                  <label for="name" class="form__label">TITLE</label>
                </div>
                <div class="form__group field">
                  <textarea type="input" class="form__field" placeholder="Name" name="name" id='name' required />
                  <label for="name" class="form__label">STEPS</label>
                </div>
                <div class="form__group field">
                  <textarea type="input" class="form__field" placeholder="Name" name="name" id='name' required />
                  <label for="name" class="form__label">NOTES</label>
                </div>
            </div>
            <div class="submit-button">
                <button type="button" class="btn">Submit</button>
            </div>
        </div>
        <div class="right-panel">
            <div class="expected-result-header">
                Expected Result
            </div>
            <div class="form__group field">
                  <textarea type="input" class="form__field" placeholder="Name" name="name" id='name' required />
                  <label for="name" class="form__label">Expected Result...</label>
                </div>
        </div>
    </div>
    </>   
            
  )
}
export default Home
