import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import io from 'socket.io-client';
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";

import './Chat.css';

let socket;
const Chat = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState([]);
    const [messages, setMessages] = useState([]);
    const [searchParams] = useSearchParams();

    const ENDPOINT = "http://localhost:5000"

    useEffect(() => {
        const name = searchParams.get("name");
        const room = searchParams.get("room")
        setName(name);
        setRoom(room);
        socket = io.connect(ENDPOINT);
        socket.emit('join', {name, room}, (error) => {
            if(error) {
                alert(error);
            }
        });

        return () => {
            socket.emit('disconnect');

            socket.off();
        }
    }, [ENDPOINT]);


    useEffect(() => {
        socket.on('message', message => {
            setMessages([...messages, message]);
        });
    }, [messages]);

    // function for sending messages
    
    const sendMessage = (event) => {
        event.preventDefault();
        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    )
}

export default Chat;