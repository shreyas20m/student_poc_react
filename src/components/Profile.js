import { useState, useEffect } from "react";
import './SignUp.css'
import CourseList from './CourseList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, json, useNavigate } from 'react-router-dom';

function Profile() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [dateOfBirth, setdateOfBirth] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [profileData, setProfileData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const handleName = (e) => {
        setName(e.target.value);
    };
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };
    const handleGender = (e) => {
        console.log("gender", e.target.value)
        setGender(e.target.value);
    };

    const handleDateOfBirth = (e) => {
        setdateOfBirth(e.target.value);
    };

    const handlePhoneNumber = (e) => {
        setPhoneNumber(e.target.value);
    };
    
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await fetch('http://127.0.0.1:3001/profile?token='+token)
                const data = await response.json();
              setProfileData(data.data);
            } catch (error) {
              console.error('Error fetching profile data:', error);
            } finally {
              setIsLoading(false);
            }
        };
        fetchProfileData();
        if (profileData) {
            setName(profileData.name)
            setEmail(profileData.email_id)
            setPhoneNumber(profileData.phone_number)
            setGender(profileData.gender)
            setdateOfBirth(profileData.date_of_birth)
            console.log(profileData); 
        }

    }, [] )
    useEffect(() => {
        // Update state only after the data has been fetched
        if (profileData) {
            setName(profileData.name);
            setEmail(profileData.email_id);
            setPhoneNumber(profileData.phone_number);
            setGender(profileData.gender);
            setdateOfBirth(profileData.date_of_birth);
            console.log(profileData);
        }
    }, [profileData]);
    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        fetch("http://localhost:3001/profile", {
            method: "PUT",
            body: JSON.stringify({
                token: localStorage.getItem('token'),
                student: {
                    name: name,
                    gender: gender,
                    date_of_birth: dateOfBirth,
                    phone_number: phoneNumber
                }
            }),
            headers: {
                "Content-type": "application/json;"
            }
        }).then(response => response.json())
        .then(json => {
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
            navigate('/');
        })
    }
    return (
        <div className="form">
            <form>
                <div className="input_feild">
                    <label className="label">Name</label>
                    <input
                        onChange={handleName}
                        className="input"
                        value={name}
                        type="text"
                        placeholder="name"
                    />
                </div>
                <div className="input_feild">
                    <label className="label">Email</label>
                    <input
                        onChange={handleEmail}
                        className="input"
                        value={email}
                        type="text"
                        placeholder="email"
                    />
                </div>

                <div className="input_feild">
                    <label className="label">Gender</label>
                    <div className="radio-container">
                        <label className="radio-label">Male</label>
                        <input
                            onChange={handleGender}
                            checked={gender === 'male'}
                            className="input"
                            name="Male"
                            value='male'
                            type="radio"
                        />
                        <label className="radio-label">Female</label>
                        <input
                            onChange={handleGender}
                            checked={gender === 'female'}
                            className="input"
                            name="FeMale"
                            value='female'
                            type="radio"
                        />
                    </div>
                </div>

                <div className="input_feild">
                    <label className="label">dateOfBirth</label>
                    <input
                        onChange={handleDateOfBirth}
                        className="input"
                        value={dateOfBirth}
                        type="text"
                        placeholder="Date of Birth - YYYY-MM-DD"
                    />
                </div>

                <div className="input_feild">
                <label className="label">Phone Number</label>
                <input
                    onChange={handlePhoneNumber}
                    className="input"
                    value={phoneNumber}
                    type="text"
                    placeholder="Phone Number"
                />
                </div>
            </form>
            <button onClick={handleUpdateProfile} className="btn" type="submit">Update</button>

        </div>
      );
}
export default Profile;