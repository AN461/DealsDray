import {Link} from 'react-router-dom'
import './index.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegistrationForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault(); 

        const registrationData = { username, password, email };

        try {
            const response = await axios.post('http://localhost:5000/api/managers/register',registrationData);

            console.log(response)
        } catch (error) {
            console.error('Error registering:', error);
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <div className='registration-main-container'>
            <h1>Register Here</h1>
            <form className='formContainer' onSubmit={handleSubmit}>
                <div className='form-item'>
                    <label htmlFor="username">USERNAME</label>
                    <input
                        id="username"
                        placeholder='USERNAME'
                        className='input-ele'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} // Update username state
                    />
                </div>
                <div className='form-item'>
                    <label htmlFor="email">EMAIL</label>
                    <input
                        id="email"
                        placeholder='EMAIL'
                        className='input-ele'
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Update email state
                    />
                </div>
                <div className='form-item'>
                    <label htmlFor="password">PASSWORD</label>
                    <input
                        id="password"
                        placeholder='PASSWORD'
                        className='input-ele'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Update password state
                    />
                </div>
                {error && <p className='error-message'>{error}</p>}
                <button type="submit" className="register-button">Register</button>
            </form>
            <p>Already have an account?</p>
            <Link to="/login">
                <button className='login-button'>Login</button>
            </Link>
        </div>
    );
}

export default RegistrationForm;
