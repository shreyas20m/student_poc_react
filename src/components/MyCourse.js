import './CourseList.css'
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyCourse() {
    const [courses, setCourses] = useState([])

    const fetchCourses = () => { 
        const token = localStorage.getItem('token')
        return fetch('http://localhost:3001/my-courses?token='+token) 
                .then((res) => {
                    // console.log (" COURSES ", res)
                    return res.json()
                }) 
                .then((data) => {
                        console.log("JSON DATA ", data)
                        return setCourses(data.data.items)
                    }
                )
        
        }
        
        useEffect(() => {
            fetchCourses();
        }, [])

    return(
        <div>
            <h1> My Courses</h1>
            <table>
                <thead>
                    <tr>
                        <th> Name </th>
                        <th> Description</th>
                        <th>Tags</th>
                        {/* <th>Trainer</th> */}
                        <th>Actions</th>
                    </tr>
                </thead>
                
                { courses.map((course, index) => {
                    return ( <tbody>
                        <tr key={index}>
                        <td>{ course.name }</td>
                        <td> { course.description}</td>
                        <td> { course.tags}</td>
                        {/* <td> {course.trainer_obj.name}</td> */}
                        <td> <button>View</button></td>
                    </tr>
                    </tbody>)
                })}
            </table>
        </div>
    )
}
export default MyCourse;
