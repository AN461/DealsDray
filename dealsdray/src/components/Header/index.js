import {Link} from 'react-router-dom';
import './index.css'

const Header =() =>{
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
                    <li>Name</li>
                    <Link to="/login">
                        <button className='logout-button'>Logout</button>
                    </Link>
                </ul>
            </div>
        </>
    )
}
export default Header;