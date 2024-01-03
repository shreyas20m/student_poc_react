import { useState } from "react";
import './SignUp.css'
import CourseList from './CourseList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';


function Signup(props) { 
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUpRequired, setisSignUpRequired] = useState(null);
    const [action, setAction] = useState("Sign In");
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

    const validateInputs = () => {
        if (!email) {
            toast.error("Email is required");
            return false;
        }
        if (!password) {
            toast.error("Password is required");
            return false;
        }
        if (action === 'Sign Up') {
            if (!name) {
                toast.error("Name is required");
                return false;
            }
        }      
    }
    const handleSignup = (e) => {
        e.preventDefault();
        // if (!validateInputs()) {
        //     return; // Exit if validation fails
        // }
        fetch("http://localhost:3001/students", {
            method: "POST",
            body: JSON.stringify({
                student: {
                    name: name,
                    email_id: email,
                    password: password
                }
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
                setisSignUpRequired(false)
                // setSuccessMessage("Sign up successful! You can now sign in.");
                toast.success("Sign up successful! You can now sign in.", {
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
    };
    const handleSignin = (e) => {
        e.preventDefault();
        fetch("http://localhost:3001/signin", {
            method: "POST",
            body: JSON.stringify({
                user_id: email,
                password: password
            }),
            headers: {
                "Content-type": "application/json;"
            }
        }).then(response => response.json())
        .then(json =>{
            if (json.error){
                console.log(json.error, "ERROR msg")
                // setisSignUpRequired(true)
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
                console.log(json)
                localStorage.setItem('token', json.data.token)
                props.setisTokenValid(true)
                console.log("toen_status",props.isTokenValid)
                console.log(json.data.token)
                toast.success('login success', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                  });
                //   navigate('/');

            }
        } )
        .catch(error => console.log(error))
        ;

    };

    const toggleForm = () => {
        setisSignUpRequired(!isSignUpRequired);
        setAction(isSignUpRequired ? "Sign In" : "Sign Up");
      };
 
    return (
        props.isTokenValid ? <CourseList/>:
        <div className="form">
            <div>
                {/* <h1>Student {isSignUpRequired ? 'Registration' : 'Login'}</h1> */}
                <h1>{action}</h1>

            </div>

            {/* Calling to the methods */}
            {/* <div className="messages">
                {errorMessage()}
                {successMessage()}
            </div> */}
 
            <form>
                {/* Labels and inputs for form data */}
                <div className="input_feild">
                {isSignUpRequired && <label className="label">Name</label>}
                {isSignUpRequired && <input
                    onChange={handleName}
                    className="input"
                    value={name}
                    type="text"
                    placeholder="name"
                    required
                />}
                </div>
                    
                <div className="input_feild">
                <label className="label">Email</label>
                <input
                    onChange={handleEmail}
                    className="input"
                    value={email}
                    type="email"
                    placeholder="email"
                    required
                />
                </div>
                <div className="input_feild">
                <label className="label">Password</label>
                <input
                    onChange={handlePassword}
                    className="input"
                    value={password}
                    type="password"
                    placeholder="password"
                    required
                />

                </div>
                {isSignUpRequired ? <button onClick={handleSignup} className="btn" type="submit"> Sign Up</button> : 
                       <button onClick={handleSignin} className="btn" type="submit">Sign In</button>
                }

            </form>
            <p onClick={toggleForm} className="toggle-link">
                {isSignUpRequired ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
            </p>
            <ToastContainer />
        </div>
    );
}

export default Signup;