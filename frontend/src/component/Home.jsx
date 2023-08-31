import { useState } from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import './utils/home.css'


const API_KEY = "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";
const systemMessage = { 
  "role": "system", "content": "Explain things like you're talking to a software professional with 2 years of experience."
}

function Home() {
  const [tcase, setTcase] = useState(0);
  const [title, setTitle] = useState("Title");
  const [steps, setSteps] = useState("");
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState("");


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
      <div className="home_container">
        <div className="home_box">
          <div className="home_box_details">
            <div className="home_title">
              <h1>Prompt to Code Generator</h1>
            </div>
            <div className="home_box_1">
              <div className="home_box_1_testcase">
                <h6>TEST CASE ID</h6>
                <input
                  type="text"
                  className="testcase"
                  onChange={(e) => setTcase(e.target.value)}
                  value={tcase}
                />
              </div>
              <div className="home_box_1_title">
                <h6>TITLE</h6>
                <input
                  type="text"
                  className="title"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>
            </div>
            <div className="home_box_1">
              <div className="home_box_1_steps">
                <h6>STEPS</h6>
                {/* <textarea type="text" value={steps} onChange={(e) => setSteps(e.target.value)}/> */}
                <MessageInput placeholder="Enter the Prompt" onSend={handleSend} />  
              </div>
              <div className="home_box_1_notes">
                <h6>NOTES</h6>
                <textarea type="text" value={notes} onChange={(e) => setNotes(e.target.value)}/>
              </div>
            </div>
            <div className="home_box_3">
              <div className="home_box_1_result">
                <h6>RESULT</h6>
                {/* <textarea type="text" value={result} onChange={(e) => setResult(e.target.value)}/> */}
                <MessageList 
                scrollBehavior="smooth" 
                typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
              >
              {messages.map((message, i) => {
                return <Message key={i} model={message} />
              })}
            </MessageList>
              </div>
            </div>
            <div className="home_button">
              <button className="button-1" onClick={handleForm}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </>   
            
  )
}
export default Home
