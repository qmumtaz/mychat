import { useState } from "react";
import './index.css';

const App =() => {
  const [error , setError] = useState("")
  const [value , setValue] = useState("")
  const [chatHistory , setChatHistory] = useState([])

  const supriseOptions = [
    "who won the lastest peace prize?",
    "Where do pizza come from?",
    "how to make an a nice chicken pasta dish?"

  ]

  const suprise = () => {
    const randomValue = supriseOptions[Math.floor(Math.random() * supriseOptions.length)]

    setValue(randomValue)
  }

  const getReponse = async () => {
    if (!value) {
      setError("EROOR PLEASE ENTER A QUESTION")
      return
    }

    try {
      const options = {
        method : "POST",
        body : JSON.stringify({
          history : chatHistory,
          message : value
        }),
        headers : {
          "Content-Type" :  "application/json"
        }

      }

      const response = await fetch("http://localhost:8000/gemini", options)
      const data = await response.text()
      console.log(data);

      setChatHistory(oldChatHistory => [...oldChatHistory, {
        role : "user",
        parts: [{ text: value }],
      },
      {
        role : "model",
        parts: [{ text: data }],
      }
    ])

    setValue("")

    } catch (error) {
      console.log(error);
      setError("Something went wrong")
    }
  }

  const clear = () => {
    setValue("")
    setError("")
    setChatHistory([])
  }

  return (
    
      <div className="app">
        <p>Ask me anything !!!!  <button className="suprise" onClick={suprise} disabled={!chatHistory}>Suprise me</button></p>

        <div className="input-container">
          <input type="text" value={value} placeholder="wehn is christmas?"  onChange={(e) => setValue(e.target.value)}/>
         {!error && <button onClick={getReponse}>ask me</button>  } 
         {error && <button onClick={clear}>clear</button>  } 
          
        </div>

        {error && <p>{error}</p>}

        <div className="search-results">
         {chatHistory.map((chatItem , index) => <div key={index}>
            <p className="answer">
              {chatItem.role} : {chatItem.parts[0].text}
            </p>
          </div>)}  
        </div>

    
      </div>
    
    
  );
}

export default App;
