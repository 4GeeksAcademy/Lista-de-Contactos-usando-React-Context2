import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";


export const ContactList = () => {

    const [username, setUsername] = useState("");
const navigate = useNavigate();
const { store, dispatch } = useGlobalReducer();


const createAgenda = async () => {    
     fetch("https://playground.4geeks.com/contact/agendas/alex" + username, {"method": "POST"})
     dispatch({ type: "register_username", content: username });
     getContacts();
     return
}

const getContacts = async () => {
    if (store.username === "") {
        return;
    }
    const response = await fetch("https://playground.4geeks.com/contact/agendas/" + store.username + "/contacts");
    const data = await response.json();
}

    return (
        <div>
            <h1>Contact list</h1>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" />
            <br />
            <h1>Bienvenido {store.username}</h1>
            <button onClick={createAgenda}>Create Agenda</button>
            <button onClick={() => navigate("/contact/add")}>Add contact</button>
        </div>     
              
    )
}



