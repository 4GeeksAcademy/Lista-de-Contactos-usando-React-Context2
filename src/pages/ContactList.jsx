import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const ContactList = () => {
    const [username, setUsername] = useState("");
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();

    const createAgenda = async () => {
        if (!username.trim()) {
            setError("Please enter a username");
            return;
        }
        
        setLoading(true);
        try {
            const response = await fetch(
                `https://playground.4geeks.com/contact/agendas/${username}`, 
                { 
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || "Failed to create agenda");
            }
            
            dispatch({ type: "register_username", content: username });
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getContacts = async () => {
        if (!store.username) return;
        
        setLoading(true);
        try {
            const response = await fetch(
                `https://playground.4geeks.com/contact/agendas/${store.username}/contacts`
            );
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || "Failed to load contacts");
            }
            
            setContacts(data.contacts || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getContacts();
    }, [store.username]);

    return (
        <div className="container">
            {!store.username ? (
                <div className="welcome-section">
                    <h1>Create Your Contact Agenda</h1>
                    <div className="input-group">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                        />
                        <button 
                            onClick={createAgenda} 
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Create Agenda"}
                        </button>
                    </div>
                    {error && <p className="error">{error}</p>}
                </div>
            ) : (
                <>
                    <div className="header">
                        <h1>Welcome, {store.username}</h1>
                        <button 
                            onClick={() => navigate("/contact/add")}
                            className="add-btn"
                        >
                            + Add Contact
                        </button>
                    </div>

                    <div className="contacts-container">
                        <h2>Your Contacts</h2>
                        
                        {loading ? (
                            <p>Loading contacts...</p>
                        ) : error ? (
                            <p className="error">{error}</p>
                        ) : contacts.length > 0 ? (
                            <div className="contacts-grid">
                                {contacts.map((contact) => (
                                    <div key={contact.id} className="contact-card">
                                        <Link to={`/contact/${contact.id}`}>
                                            <h3>{contact.name}</h3>
                                            <p>{contact.phone}</p>
                                            <p>{contact.email}</p>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No contacts found. Add your first contact!</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};