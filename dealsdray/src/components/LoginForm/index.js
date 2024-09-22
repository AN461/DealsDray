import {Link} from 'react-router-dom'
import axios from 'axios'
import './index.css';
import { useState,useContext } from 'react';
import { useNavigate,Navigate } from 'react-router-dom';
import userContext from '../../Context/userContext';


function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {user}=useContext(userContext);
    
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent page refresh

        const loginData = { username, password };

        try {
            const response = await axios.post('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();
            console.log(data)
            if (response.ok) {
                // If login is successful, navigate to home page
                navigate('/');
            } else {
                // Handle error (e.g., wrong credentials)
                setError(data.message);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Something went wrong. Please try again.');
        }
    };
    
    if(user && user.length!=0){
        return <Navigate to='/'/>
    }
    return (
        <div className='login-main-container'>
            <h1>Logo Here</h1>
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
                <button type="submit" className="login-btn">Login</button>
                
            </form>
            <p>Not yet register?</p>
            <Link to="/register">
                <button className='register-button'>Register</button>
            </Link>
        </div>
    );
}

export default LoginForm;
