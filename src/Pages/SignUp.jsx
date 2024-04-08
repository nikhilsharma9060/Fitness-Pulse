
//original
/*import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, signUp } = UserAuth();
  const navigate = useNavigate();

  const goTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signUp(email, password);
      navigate("/#home");
      goTop();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section className="login-section ">
        <div className="login-banner relative justify-center flex">
          <h1 className="text-white absolute bottom-[25px] text-[3rem] font-bold">
            Sign Up
          </h1>
        </div>
        // form  
        <div className="py-[10rem] flex justify-center page-padding">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col py-40 px-20 bg-black w-[55rem] min450:w-full  shadow-xl"
          >
            <label className="text-[2rem] text-white mb-3 font-medium ">
              Email
            </label>
            <input
              className="text-[1.7rem] px-8 py-4 mb-10 w-full outline-[#ff0336] "
              placeholder="gymate@gymail.com"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>

            <label className="text-[2rem] text-white mb-3 font-medium outline-[#ff0336] outline-2">
              Password
            </label>
            <input
              className="text-[1.7rem] px-8 py-4 mb-10 w-full outline-[#ff0336] "
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>

            <button
              type="submit"
              className="bg-[#ff0336] text-white py-4 font-medium text-[2rem] w-full mt-10"
            >
              Sign Up
            </button>
            <div className="flex gap-4 items-center mt-16 min450:flex-col">
              <p className="text-white text-[1.5rem]">Already have account?</p>
              <Link
                to="/login"
                className="text-[#ff0336] font-bold text-[1.5rem]"
              >
                Sign In
              </Link>
            </div>
            
          </form>
        </div>
        <Footer />
      </section>
    </>
  );
}

export default Signup;*/

import React, { useState } from 'react'
// import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase.js'
import { collection, addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import Footer from "../components/Footer/Footer";
import './SignUp.css'

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("")
    const [phonenumber, setPhonenumber] = useState("")
    const [address, setAddress] = useState("")

    const navigate = useNavigate()

    const [errorMsg, setErrorMsg] = useState("")
    const [successMsg, setSuccessMsg] = useState("")

    const handleSignup = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
                const initialcartvalue = 0;
                console.log(user)
                addDoc(collection(db, "users"), { username: username, email: email, phonenumber: phonenumber, password: password, cart: initialcartvalue, address: address, uid: user.uid }).then(() => {
                    setSuccessMsg('New user added successfully, You will now be automatically redirected to login page.')
                    setUsername('')
                    setPhonenumber('')
                    setEmail('')
                    setPassword('')
                    setErrorMsg('')
                    setTimeout(() => {
                        setSuccessMsg('');
                        navigate('/login');
                    }, 4000);
                }).catch((error) => { setErrorMsg(error.message) });
            })
            .catch((error) => {
                // const errorCode = error.code;
                // const errorMessage = error.message;
                console.log(error.message)
                if (error.message == 'Firebase: Error (auth/invalid-email).') {
                    setErrorMsg('Please fill all required fields')
                }
                if (error.message == 'Firebase: Error (auth/email-already-in-use).') {
                    setErrorMsg('User already exists');
                }
            });
    }


    return (
        <div>
            {/* <Navbar /> */}
            <div className='signup-container'>
                <form onSubmit={handleSignup} className='signup-form'>
                    <p>Create Account</p>
                    {successMsg && <>
                        <div className='success-msg'>{successMsg}</div>
                    </>}
                    {errorMsg && <>
                        <div className='error-msg'>{errorMsg}</div>
                    </>}
                    <label>Your name</label>
                    <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="First and last name" />
                    <label>Mobile Number</label>
                    <input onChange={(e) => setPhonenumber(e.target.value)} type="tel" placeholder="Mobile Number" />
                    <label>Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email" />
                    <label>Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter your password" />
                    <label>Address</label>
                    <textarea onChange={(e) => setAddress(e.target.value)} placeholder="Enter your address"></textarea>
                    <button type='submit'>Sign up</button>
                    <div>
                        <span>Already have an account ?</span>
                        <Link to="/login">Sign in</Link>
                    </div>
                </form>
            </div>
            <Footer/>
        </div>
    )
}

export default Signup