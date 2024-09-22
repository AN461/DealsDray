import {Link} from 'react-router-dom'
import axios from 'axios'
import './index.css';
import { useState,useContext, useEffect } from 'react';
import { useNavigate,Navigate } from 'react-router-dom';
import userContext from '../../Context/userContext';


function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {user,setUser}=useContext(userContext);


    
    
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent page refresh

        const loginData = { username, password };

        try {
            const response = await axios.post('http://localhost:5000/api/managers/login',loginData)
            localStorage.setItem("token",response.data.userId);
            setUser(JSON.parse(atob(response.data.userId.split('.')[1])));
            navigate('/');
            
            console.log(response)
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Something went wrong. Please try again.');
        }
    };
    
    if(user&&user.username){
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
