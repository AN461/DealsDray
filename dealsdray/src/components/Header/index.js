import {Link} from 'react-router-dom';
import './index.css'
import { useContext } from 'react';
import UserContext from '../../Context/userContext';
const Header =() =>{
    const {user,setUser}= useContext(UserContext)
    const onclickLogout=()=>{
        localStorage.removeItem('token');
        setUser({})
    }
    return(
        <>
            <div className='nav-container'>
                <ul className="header-list">
                    <Link to="/" className='home-route'>
                        <li>Home</li>
                    </Link>
                    <Link to="/employeelist" className='employeelist-route'>
                        <li>Employee List </li>
                    </Link>
                    <li>{user.username}</li>
                    <button className='logout-button' onClick={onclickLogout}>Logout</button>
                    
                </ul>
            </div>
        </>
    )
}
export default Header;