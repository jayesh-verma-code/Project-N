//15.1
//Project-N/components/Auth/signup.tsx
"use client"
import React from 'react'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Profile from './Profile';

const signup = () => {
  //16.0
 const [user, setUser] = useState(null);
 const router = useRouter();
 //17.1
 const [isProfileOpen, setIsProfileOpen] = useState(false);
 

 //16.1
 const handleSignIn = () => {
    router.push("/signup");
 };

 //17.2
 const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen);
 }

 //16.2
  useEffect(() => {
    axios
      .get("http://localhost:8080/auth/user", {
        withCredentials: true, //  cookie send to backend to deserialize user
      })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  return (
    <div className='absolute top-[2.2rem] right-[7rem] text-[0.8rem] md:text-[1rem] md:right-[3rem] z-[500]'>
      {/* //16.3 */}
        {user ? (
  <div className="flex justify-center items-center">
    {user.avatar ? (
      <div onClick={handleProfileToggle} className='flex flex-col relative'>
        <img
        src={user.avatar}
        alt="avatar"
        className="relative cursor-pointer top-[-0.5rem] md:top-0 w-[2rem] h-[2rem] md:w-[2.5rem] md:h-[2.5rem] rounded-full object-cover"
        />
        {/* // 17.0 */}
        {isProfileOpen && <Profile user={user} />}
      </div>
    ) : (
      <div onClick={handleProfileToggle} className="relative cursor-pointer top-[-0.5rem] md:top-0 w-[2rem] h-[2rem] md:w-[2.5rem] md:h-[2.5rem] rounded-full bg-pink-600 text-[1.2rem] flex justify-center items-center">
        {user.firstName && user.firstName[0].toUpperCase()}
      </div>
    )}
  </div>
) : (
  <p onClick={handleSignIn} className="cursor-pointer">Sign up</p>
)}

    </div>
  )
}

export default signup