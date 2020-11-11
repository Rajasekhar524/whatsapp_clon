import React,{useState} from 'react'
import './App.css'
import './Chat.css'
import InsertEmoticonOutlinedIcon from '@material-ui/icons/InsertEmoticonOutlined';
import {AttachFile,MoreVert,SearchOutlined} from "@material-ui/icons";
import {Avatar, IconButton} from '@material-ui/core';
import axios from './axios';

function Chat({messages}) {
    const [input,setInput]=useState("");
    const sendMessage=async(e)=>{
        e.preventDefault();

       await axios.post("/api/v1/messages/new",{
            message:input,
            name:"demo app",
            timestamp:"afasd",
            received:false,
        })
        setInput('');
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar />
                <div className="chat__headerInfo">
                    <h3>Room name</h3>
                    <p>last seen at...</p>
                </div>
                <div className="chat__headingRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map((message)=>(
                    <p className={`chat__message ${message.received &&"chat__receiver"}`}>
                    <span className="chat__name">{message.name}</span>
                    {message.message}
                <span className="chat__timestamp">{message.timestamp}</span>
                </p>
                ))}
                 <p className="chat__message chat__reciever">
                    <span className="chat__name">radad</span>
                    meeeaaga
                    <span className="chat__timestamp">{new Date().toUTCString()}</span>
                </p>
                
                
            </div>
            <div className="chat__footer">
                <InsertEmoticonOutlinedIcon  />
                <form>
                    <input value={input} onChange={e=>setInput(e.target.value)} placeholder="type msg" type="text" />
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
            </div>
            
        </div>
    )
}

export default Chat
