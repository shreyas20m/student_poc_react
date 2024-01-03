import React, { useState, useEffect } from 'react';
import './CourseList.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function CourseList() {
    const [courses, setCourses] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });


    const fetchCourses = () => { 
        console.log("set value", searchQuery)
        return fetch('http://localhost:3001/search?q='+searchQuery+'&sort_by_key='+sortConfig.key+'&sort_by='+sortConfig.direction) 
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
        }, [searchQuery])
    
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        console.log('onchagen value',e.target.value)
        // console.log('set variable',searchQuery)

        // fetchCourses()
        // setSearchQuery(e.target.value, () => {
        //     console.log('onchange value', e.target.value);
        //     console.log('set variable', searchQuery);
        //     fetchCourses();
        // });
        };
    const handleSort =(key) =>{
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
        fetchCourses()
    }

    const handlebuy =(course_id) => {
        console.log("COURSE ID", course_id)
        fetch("http://localhost:3001/courses/buy", {
            method: "POST",
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
                toast.success(json.data.message, {
                    position: "top-right",
                    autoClose: 3000, // Close the toast after 3 seconds
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        } )
        .catch(error => console.log(error))
        ;
    }

    return(
        <div>

            <h1> CourseList Page</h1>
            <input
                type="text"
                placeholder="Search courses"
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <table>
                <thead>
                    <tr>
                        {/* <th  onClick={() => handleSort('name')} >Name {sortConfig.key === 'name' && <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}}</span></th> */}
                        <th>  <button className='th_button' onClick={() => handleSort('name')}>
                            Name {sortConfig.key === 'name' && <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>}
                        </button>
                        </th>
                        <th> Description</th>
                        <th>Tags</th>
                        <th>Trainer</th>
                        <th colSpan={2}>Actions</th>
                    </tr>
                </thead>
                
                { courses.map((course, index) => {
                    return ( <tbody>
                        <tr key={index}>
                        
                        <td>{ course.name }</td>
                        <td> { course.description}</td>
                        <td> { course.tags}</td>
                        <td> {course.trainer_obj.name}</td>
                        <td> <button>View</button></td>
                        <td> <button  onClick={() => handlebuy(course.id)}>Buy</button></td>
                    </tr>
                    </tbody>)
                })}
            </table>
            <ToastContainer />
        </div>
   
    )
}

export default CourseList;

