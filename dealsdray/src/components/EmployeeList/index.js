import React, { useEffect, useState } from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import Header from '../Header';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data from the backend API
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('http://your-backend-api-url/employees'); // Replace with your actual API URL
                if (!response.ok) {
                    throw new Error('Failed to fetch employee data');
                }
                const data = await response.json();
                setEmployees(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <Header />
            <div>
                <h3>Employee List</h3>
                <div>
                    <p>Total Count: {employees.length}</p>
                    <Link to="/createemployee">
                        <p>Create Employee</p>
                    </Link>
                </div>
                <div>
                    <input type="search" placeholder="Search by name..." />
                </div>
                <div className='employee-list-container'>
                    <table>
                        <thead>
                            <tr>
                                <th>Unique ID</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile Number</th>
                                <th>Designation</th>
                                <th>Gender</th>
                                <th>Course</th>
                                <th>Create Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.length > 0 ? (
                                employees.map((employee) => (
                                    <tr key={employee.id}>
                                        <td>{employee.id}</td>
                                        <td>
                                            {employee.image && (
                                                <img
                                                    src={URL.createObjectURL(employee.image)}
                                                    alt="Employee"
                                                    width="50"
                                                    height="50"
                                                />
                                            )}
                                        </td>
                                        <td>{employee.name}</td>
                                        <td>{employee.email}</td>
                                        <td>{employee.mobile}</td>
                                        <td>{employee.designation}</td>
                                        <td>{employee.gender}</td>
                                        <td>{employee.courses.join(', ')}</td>
                                        <td>{employee.createDate}</td>
                                        <td>
                                            <button>Edit</button>
                                            <button>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="10">No employees found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default EmployeeList;
