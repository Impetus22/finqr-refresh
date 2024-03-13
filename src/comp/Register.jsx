import React from 'react'
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa6';
import Section from '../components/Section';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <Section >
      <div className="mx-auto flex-grow w-full mt-10 mb-10 max-w-[1200px] px-5" >
        <div className="container mx-auto border px-5 py-5 shadow-sm md:w-1/2 rounded-lg">
          <div className=" flex flex-col items-center">
            <p className="text-4xl font-bold">Register</p>
          </div>
          <form className="mt-6 flex flex-col">
            <label htmlFor="email">Your name</label>
            <input
              className="mb-3 mt-3 border px-4 py-2 rounded-lg bg-n-8"
              type="name"
              placeholder="Alexander"
            />
            <label htmlFor="email">Email Address</label>
            <input
              className="mb-3 mt-3 border px-4 py-2 rounded-lg bg-n-8"
              type="email"
              placeholder="youremail@domain.com"
            />
            <label htmlFor="email">Password</label>
            <input
              className="mb-3 mt-3 border px-4 py-2 rounded-lg bg-n-8"
              type="password"
              placeholder="•••••••"
            />
            <label htmlFor="email">Repeat password</label>
            <input
              className="mt-3 border px-4 py-2 rounded-lg bg-n-8"
              type="password"
              placeholder="•••••••"
            />
            
          </form>
          <button className="my-5 w-full bg-white transition-colors hover:bg-gray-200 py-2 text-black rounded-md">
            Register
          </button>
          <p className="text-center text-gray-500 ">Or continue with social</p>
          <div className="my-5 flex gap-2">
            <button className="w-1/2 bg-white py-2 text-blue-500 rounded-md transition-colors hover:text-blue-800 hover:bg-white flex justify-center gap-4 items-center">
              <FaFacebookF />
              Facebook
            </button>
            <button className="w-1/2 bg-white py-2 text-red-500 rounded-md transition-colors hover:text-orange-500 hover:bg-white flex justify-center gap-4 items-center">
              <FcGoogle />
              Google
            </button>
          </div>
          <p className="text-center">
            Already have an account?
            <Link to="/login"><a className="text-white text-sm underline transition-colors hover:text-color-1">
              {' '}
              Login now
            </a></Link>
          </p>
        </div>
      </div>
    </Section>
  )
}

export default Register
