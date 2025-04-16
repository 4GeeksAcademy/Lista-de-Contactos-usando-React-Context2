import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

export const ContactAdd = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { store } = useGlobalReducer();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.name.trim()) {
            setError("Name is required");
            return;
        }
        
        setLoading(true);
        try {
            const response = await fetch(
                `https://playground.4geeks.com/contact/agendas/${store.username}/contacts`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || "Failed to add contact");
            }

            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1>Add New Contact to {store.username}'s Agenda</h1>
            
            <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                    <label>Full Name *</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label>Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 234 567 890"
                    />
                </div>
                
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                    />
                </div>
                
                <div className="form-group">
                    <label>Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="123 Main St, City"
                    />
                </div>
                
                {error && <p className="error">{error}</p>}
                
                <div className="form-actions">
                    <button type="submit" disabled={loading}>
                        {loading ? "Saving..." : "Save Contact"}
                    </button>
                    <button 
                        type="button" 
                        onClick={() => navigate('/')}
                        className="secondary-btn"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};