import {Navigate} from 'react-router-dom';
import './index.css'
import Header from '../Header'
import { useContext, useEffect } from 'react';
import userContext from '../../Context/userContext';

const Home = () => {
    const {user} = useContext(userContext);

    useEffect((user)=>{
        console.log("from home:",user)
    },[user])


    if(!user || user && !user.username){
        return <Navigate replace to='/login'/>
    }



    return(
        <>
            <Header/>
            <div>
                <h1>Dashboard</h1>
            </div>
        </>
        
    )
}
export default Home;