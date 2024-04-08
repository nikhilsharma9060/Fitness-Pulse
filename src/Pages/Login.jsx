/*import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
//original
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, logIn } = UserAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const goTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/#home");
      goTop();
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <>
      <section className="login-section">
        <div className="login-banner relative justify-center flex">
          <h1 className="text-white absolute bottom-[25px] text-[3rem] font-bold">
            Sign In
          </h1>
        </div>
        //form  
        <div className="page-padding py-[10rem] flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col py-40 px-20 bg-black w-[55rem] min450:w-full  shadow-xl"
          >
            {error ? (
              <p className="text-white bg-[#ff0336] font-bold text-[1.6rem] px-10 py-5 text-center mb-10">
                Wrong email or password
              </p>
            ) : null}
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
              Sign In
            </button>
            <div className="flex gap-4 items-center mt-16 min450:flex-col">
              <p className="text-white text-[1.5rem]">New to Fitness Pulse?</p>
              <Link
                to="/signup"
                className="text-[#ff0336] font-bold text-[1.5rem]"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
        <Footer />
      </section>
    </>
  );
}

export default Login;*/

import React, { useState } from 'react'
// import Navbar from './Navbar'
import Navbar from '../components/Nav/Navbar';
import './Login.css'
import { Link } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import Footer from "../components/Footer/Footer";
const Login = () => {
  // const goTop = () => {
  //   window.scrollTo({
  //     top: 0,
  //   });
  // };
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")

  const auth = getAuth();
  const navigate = useNavigate()


  const handleLogin = (e) => {
      e.preventDefault();
      // goTop();
      signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
              setSuccessMsg('Logged in successfully, you will be redirected to homepage')

              // console.log(loggeduser.email)
              setEmail('')
              setPassword('')
              setErrorMsg('')
              setTimeout(() => {
                  setSuccessMsg('');
                  navigate('/#home');
              }, 3000);
          })
          .catch((error) => {
              const errorCode = error.code;
              console.log(error.message)
              if (error.message == 'Firebase: Error (auth/invalid-email).') {
                  setErrorMsg('Please fill all required fields')
              }
              if (error.message == 'Firebase: Error (auth/user-not-found).') {
                  setErrorMsg('Email not found');
              }
              if (error.message == 'Firebase: Error (auth/wrong-password).') {
                  setErrorMsg('Wrong Password');
              }
          });
  }

  return (
      <div >
          {/* <Navbar /> */}
          <div className='signin-container'>
              <form className='signin-form'>
                  <p>Login</p>
                  {successMsg && <>
                      <div className='success-msg'>{successMsg}</div>
                  </>}
                  {errorMsg && <>
                      <div className='error-msg'>{errorMsg}</div>
                  </>}
                  <label>Email</label>
                  <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email" />
                  <label>Password</label>
                  <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter your password" />
                  <button onClick={handleLogin}>Login</button>
                  <div>
                      <span>Don't have an account ?</span>
                      <Link to="/signup">Sign up</Link>
                  </div>
              </form>
          </div>
          <Footer/>
      </div>
  )
}

export default Login


