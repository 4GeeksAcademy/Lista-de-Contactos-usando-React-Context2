import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

export const ContactAdd = () => {

    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [direccion, setDireccion] = useState("");
    const navigate = useNavigate(); 

    const { store, dispatch } = useGlobalReducer();

    const addContact = async () => {
        const contact = {
            name: nombre,
            phone: telefono,
            email: email,
            address: direccion,
        }


        fetch("https://playground.4geeks.com/contact/agendas/" + store.username + "/contacts", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(contact)
        })
        navigate('/')
        return

    }

    return (
        <div>

            <h1>Añadimos contacto a la agenda de: {store.username}</h1>
            <form>
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" />
                <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Telefono" />
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} placeholder="Direccion" />
            </form>
            <button onClick={addContact}>Añadir contacto</button>
        </div>
    )
}