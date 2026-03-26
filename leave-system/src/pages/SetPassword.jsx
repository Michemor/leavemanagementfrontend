import { useAlert } from "../hooks/alerthook";
import { resetPassword } from "../services/ApiClient";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function SetPasswordPage () {
    const { uid, token } = useParams();
    const [formData, setFormData] = useState({ password: "", confirm: "" });
    const { showSuccess, showError } = useAlert();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Pass all four required fields to your ApiClient
        resetPassword(uid, token, formData.password, formData.confirm)
            .then(() => {
                showSuccess('Password set! Redirecting...');
                setTimeout(() => window.location.href = '/login', 3000);
            })
            .catch((err) => showError(err.response?.data?.detail || 'Error setting password'));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input 
                type="password" 
                placeholder="New Password"
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
            />
            <input 
                type="password" 
                placeholder="Confirm Password"
                onChange={(e) => setFormData({...formData, confirm: e.target.value})} 
            />
            <button type="submit">Set Password</button>
        </form>
    );
}