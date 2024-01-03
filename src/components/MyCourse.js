import './CourseList.css'
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyCourse() {
    const [courses, setCourses] = useState([])

    // const fetchCourses = () => { 
    //     const token = localStorage.getItem('token')
    //     return fetch('http://localhost:3001/my-courses?token='+token) 
    //             .then((res) => {
    //                 return res.json()
    //             }) 
    //             .then((data) => {
    //                     console.log("JSON DATA ", data)
    //                     return setCourses(data.data.items)
    //                 }
    //             )
        
    //     }

    

    const fetchCourses = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3001/my-courses?token=${token}`);
            const data = await response.json();
            
            console.log("JSON DATA ", data);
            setCourses(data.data.items);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };
        
        useEffect(() => {
            fetchCourses();
        }, [])
    
        const handleDelete =(course_id) => {
            console.log("COURSE ID", course_id)
            fetch("http://localhost:3001/courses/delete", {
                method: "DELETE",
                body: JSON.stringify({
                    token: localStorage.getItem('token'),
                    course_id: course_id
                }),
                headers: {
                    "Content-type": "application/json;"
                }
            }).then(response => response.json())
            
            .then(json =>{
                console.log(json)
                if (json.error){
                    toast.error(json.error.message, {
                        position: "top-right",
                        autoClose: 3000, // Close the toast after 3 seconds
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                }
                else {
                    console.log("API succ", json.data.message)
                    toast.success(json.data.message, {
                        position: "top-right",
                        autoClose: 3000, // Close the toast after 3 seconds
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                    // window.location.reload();
                    fetchCourses();
                }
            } )
            .catch(error => console.log(error))
            ;
        }
    
    return(
        <div>
            <h1> My Courses</h1>
            <table>
                <thead>
                    <tr>
                        <th> Name </th>
                        <th> Description</th>
                        <th>Tags</th>
                        <th colSpan={2}>Actions</th>
                    </tr>
                </thead>
                
                { courses.map((course, index) => {
                    return ( <tbody>
                        <tr key={index}>
                        <td>{ course.name }</td>
                        <td> { course.description}</td>
                        <td> { course.tags}</td>
                        <td> <button>View</button></td>
                        <td> <button onClick={() => handleDelete(course.id)}>Delete</button></td>
                    </tr>
                    </tbody>)
                })}
            </table>
            <ToastContainer />
        </div>
    )
}
export default MyCourse;
