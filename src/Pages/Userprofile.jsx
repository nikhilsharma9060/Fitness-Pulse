// import { useEffect, useState } from "react";
// import { UserAuth } from "../context/AuthContext";
// import { Link, useNavigate } from "react-router-dom";
// import Footer from "../components/Footer/Footer";

// function UserProfile() {
//   const { currentUser } = UserAuth();
//   const navigate = useNavigate();
//   const [userDetails, setUserDetails] = useState(null);

//   useEffect(() => {
//     if (currentUser) {
//       // Assuming you have a getUserDetails function to fetch user details
//       getUserDetails(currentUser.uid)
//         .then((data) => {
//           setUserDetails(data);
//         })
//         .catch((error) => {
//           console.error("Error fetching user details:", error);
//         });
//     } else {
//       // If user is not logged in, redirect to login page
//       navigate("/login");
//     }
//   }, [currentUser, navigate]);

//   return (
//     <>
//       <section className="profile-section">
//         {userDetails ? (
//           <div className="profile-container">
//             <h2>Welcome, {userDetails.username}!</h2>
//             <p>Email: {userDetails.email}</p>
//             {/* Add other user details as needed */}
//             <Link to="/edit-profile">Edit Profile</Link>
//           </div>
//         ) : (
//           <p>Loading user profile...</p>
//         )}
//       </section>
//       <Footer />
//     </>
//   );
// }

// export default UserProfile;
import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Navbar from '../components/Nav/Navbar';
import Footer from "../components/Footer/Footer";

async function getUserDetails(uid) {
    try {
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const data = await getDocs(q);
        if (data.docs.length > 0) {
            return data.docs.map(doc => ({ ...doc.data(), id: doc.id }))[0];
        } else {
            return null; // User not found
        }
    } catch (error) {
        console.error("Error fetching user details:", error);
        throw error;
    }
}

const UserProfile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                auth.onAuthStateChanged(userlogged => {
                    if (userlogged) {
                        getUserDetails(userlogged.uid)
                            .then(userData => setUser(userData))
                            .catch(error => console.error("Error setting user data:", error));
                    } else {
                        setUser(null);
                    }
                });
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        getCurrentUser();
    }, []);

    return (
        <div style={{ backgroundColor: '#000000' }}>
            <Navbar />
            <div className='userprofile-outercontainer' style={{ backgroundColor: '#000000' }}>
                {user ? (
                    <div className='user-profile'>
                        <p className="heading">Your Account Details</p>
                        <div className='details'>
                            <div className='data-row'>
                                <span>Your Name</span>
                                <span>{user.username}</span>
                            </div>
                            <div className='data-row'>
                                <span>Your Email</span>
                                <span>{user.email}</span>
                            </div>
                            <div className='data-row'>
                                <span>Your Phone Number</span>
                                <span>{user.phonenumber}</span>
                            </div>
                            <div className='data-row'>
                                <span>Your Address</span>
                                <span>{user.address}</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>You are Not Logged In</div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default UserProfile;
