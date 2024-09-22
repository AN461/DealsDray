import './index.css'
import axios from 'axios';
import { useContext, useState } from 'react';
import Header from '../Header';
import { Navigate } from 'react-router-dom';
import UserContext from '../../Context/userContext';

const CreateEmployee = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: 'HR',
        gender: '',
        courses: [],
        image: null
    });

    const {user} = useContext(UserContext);

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        
        if (type === "checkbox") {
            // Handle checkbox selection
            const updatedCourses = checked 
                ? [...formData.courses, value] 
                : formData.courses.filter(course => course !== value);
            setFormData({ ...formData, courses: updatedCourses });
        } else if (type === "file") {
            // Handle file input
            setFormData({ ...formData, image: e.target.files[0] });
        } else if (type === "radio") {
            // Handle radio button selection
            setFormData({ ...formData, gender: value });
        } else {
            // Handle text input
            setFormData({ ...formData, [id]: value });
        }
    };

    const handleSubmit = async (e) => {
        try{
            e.preventDefault(); // Prevent form from refreshing
            console.log("Form Data: ", formData);
            const response=await axios.post('http://localhost:5000/api/employees',formData);
            console.log(response);
        }catch(err){
            console.log(err);
        }
        
        // You can now use formData or store it in a list/array or send it to a server
    };

    if(!user || user&&!user.length){
        return <Navigate replace to='/login'/>
    }

    return (
        <>
            <Header />
            <div className='create-employee-container'>
                <h2>Create Employee</h2>
                <form className='create-form-container' onSubmit={handleSubmit}>
                    <div className='item'>
                        <label htmlFor="name">Name: </label>
                        <input id='name' type="text" placeholder='name' onChange={handleChange} />
                    </div>
                    <div className='item'>
                        <label htmlFor="email">Email: </label>
                        <input id='email' type="email" placeholder='email' onChange={handleChange} />
                    </div>
                    <div className='item'>
                        <label htmlFor="mobile">Mobile No: </label>
                        <input id='mobile' type="text" placeholder='Mobile Number' onChange={handleChange} />
                    </div>
                    <div className='item'>
                        <label htmlFor="designation">Designation: </label>
                        <select id='designation' className='designation-items' onChange={handleChange}>
                            <option value="HR">HR</option>
                            <option value="Manager">Manager</option>
                            <option value="Sales">Sales</option>
                        </select>  
                    </div>
                    
                    <div className='item'>
                        <label htmlFor='gender'>Gender:</label>
                        <div className='gender-items'>
                            <div>
                                <input type="radio" id="male" name="gender" value="male" onChange={handleChange}/>
                                <label htmlFor="male">Male</label>
                            </div>
                            <div>
                                <input type="radio" id="female" name="gender" value="female" onChange={handleChange}/>
                                <label htmlFor="female">Female</label>
                            </div>
                        </div>
                    </div>
                    <div className='item'>
                        <label>Course:</label>
                        <div className='course-items'>
                            <input type="checkbox" id="mca" value="MCA" onChange={handleChange}/>
                            <label htmlFor="mca"> MCA</label><br/>
                            <input type="checkbox" id="bca" value="BCA" onChange={handleChange}/>
                            <label htmlFor="bca"> BCA</label><br/>
                            <input type="checkbox" id="bsc" value="BSC" onChange={handleChange}/>
                            <label htmlFor="bsc"> BSC</label><br/>
                        </div>
                    </div>
                    <div className='item'>
                        <label htmlFor='imgFile'>Image Upload</label>
                        <input type="file" id="imgFile" onChange={handleChange} />
                    </div>
                    <div className="submit-button-class">
                        <button type='submit' className='submit-btn'>Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CreateEmployee;
