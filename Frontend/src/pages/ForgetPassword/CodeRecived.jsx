import React from 'react'
import assets from "../../assets/assets";


const CodeRecived = () => {
  return (
    <div className=" bg-[#ebdfdf] h-screen w-screen flex items-center justify-center">
      <div className="bg-[#f4efef] flex items-center justify-center w-[59%] h-[80%] rounded-xl">
        <div className="relative w-1/2  h-full flex flex-col">
          <img
            src={assets.ForgetPassword_img}
            className="w-full h-full object-cover rounded-s-xl bg-[#00aeff]"
          />
        </div>
        <div className="w-1/2 h-full max-w-[500px] bg-[#f4efef] flex flex-col p-16 items-start justify-center rounded-xl">
          <div className=" flex flex-col mb-21 text-[#060606] justify-center items-start py-4 ">
            <h3 className="text-3xl font-semibold mb-2">
            Check your email for a verification code.
            </h3>
            {/* <p className="text-base mt-6 mb-4 text-center">
            Check your email for a verification code.
            </p> */}
          </div>






          {/* <div className="w-full flex flex-col gap-5 ">
            <input
              type="number"
              placeholder="4-digit code"
              className="w-full pl-2 text-black py-2 my-2 bg-[#d1eaf6]  border rounded-lg border-black focus: outline-none"
            />
          </div>
          <div className="w-full flex flex-col my-4 mt-5 ">
            <button className="w-full text-black my-2 font-semibold bg-[#00aeff] border border-black rounded-md p-4 text-center flex items-center justify-center cursor-pointer">
              Submit
            </button>
          </div> */}



          <p className=''>If you don’t see the email in your inbox, check your spam folder. If it’s not there, the email address may not be confirmed, or it may not match an existing account.</p>
        </div>
      </div>
    </div>
  )
}

export default CodeRecived
