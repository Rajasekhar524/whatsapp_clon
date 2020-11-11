import React,{useState,useEffect} from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import axios from "./axios";

function App() {
  const [messages,setMessages]=useState([]);
 
  useEffect(()=>{
    axios.get("/").then((response)=>{
     setMessages(response.data)
    });
  }, [messages]);
  // useEffect(()=>{
  //   setMessages([...messages,messages])
  // },[messages])
  console.log(messages);

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
