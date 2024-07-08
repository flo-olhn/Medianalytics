'use client';

import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function SignInUpSwitch() {
  const [signIn, setSignIn] = useState(true);
  const [signUp, setSignUp] = useState(false);
  const [passwordConfirmed, setPasswordConfirmed] = useState(false);
  var [password, setPassword] = useState('');
  var [passconf, setPassConf] = useState('');
  function handleSignIn() {
    setSignIn(true);
    setSignUp(false);
  };
  function handleSignUp() {
    setSignIn(false);
    setSignUp(true);
  };
  const getPassword = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const currentValue = event.target.value;
    password = currentValue;
    setPassword(currentValue);
    setConfirmed();
  };
  const getPassConf = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const currentValue = event.target.value;
    passconf = currentValue;
    setPassConf(currentValue);
    setConfirmed();
  };
  function setConfirmed() {
    if (password === '' || passconf === '') {
      setPasswordConfirmed(false);
    } else {
      if (password === passconf) {
        setPasswordConfirmed(true);
      } else {
        setPasswordConfirmed(false);
      }
    }
  };
  return (
    <>
      <div className="flex w-full h-16">
          {signIn && <div className="flex w-1/2 h-full border-r border-slate-300 items-center justify-center" onClick={handleSignIn}>Sign In</div>}
          {!signUp && <div className="flex w-1/2 h-full bg-slate-100 items-center justify-center text-gray-400 border-b border-slate-300 hover:cursor-pointer hover:bg-slate-200 transition duration-300" onClick={handleSignUp}>Sign Up</div>}
          {!signIn && <div className="flex w-1/2 h-full bg-slate-100 items-center justify-center text-gray-400 border-b border-slate-300 hover:cursor-pointer hover:bg-slate-200 transition duration-300" onClick={handleSignIn}>Sign In</div>}
          {signUp && <div className="flex w-1/2 h-full border-l border-slate-300 items-center justify-center" onClick={handleSignUp}>Sign Up</div>}
      </div>
      <div className="w-full h-[calc(100%_-_4rem)] flex flex-col items-center justify-center">
        {signIn ? <p className="absolute text-3xl font-bold top-36 p-0 m-0">Log in<br />to your account</p> : <p className="absolute text-3xl font-bold top-36 p-0 m-0">Create<br />your account</p>}
        {signIn &&
          <>
            <form action="" method="post" className="">
              <input type="text" name="email" id="email" className="w-full h-12 bg-slate-100 rounded px-5 py-5 border border-slate-300 mb-6 outline-none focus:bg-slate-200 transition duration-300 focus:border-blue-500 focus:border " placeholder="Email address" required /><br />
              <input type="password" name="password" id="password" className="w-full h-12 bg-slate-100 rounded px-5 py-5 border border-slate-300 outline-none focus:bg-slate-200 transition duration-300 focus:border-blue-500 focus:border " placeholder="Password" required />
              <input type="submit" value="Sign In" className="w-full h-14 rounded bg-slate-200 outline-none mt-12 hover:bg-blue-500 hover:text-white hover:cursor-pointer transition duration-300 focus:bg-blue-600" />
            </form>
          </>
        }
        {signUp &&
          <>
            <form action="" method="post" className="">
              <input type="text" name="email" id="email" className="w-full h-12 bg-slate-100 rounded px-5 py-5 border border-slate-300 mb-6 outline-none focus:bg-slate-200 transition duration-300 focus:border-blue-500 focus:border " placeholder="Email address" required /><br />
              <input type="password" name="password" id="password" className="w-full h-12 bg-slate-100 rounded px-5 py-5 border border-slate-300 outline-none focus:bg-slate-200 transition duration-300 focus:border-blue-500 focus:border " placeholder="Password" required onChange={(event) => getPassword(event)} /><br />
              {passconf === '' ?
                <input type="password" name="confirm-password" id="confirm-password" className="w-full h-12 bg-slate-100 rounded px-5 py-5 border border-slate-300 outline-none focus:bg-slate-200 transition duration-300 focus:border-blue-500 focus:border  mt-6" placeholder="Confirm Password" required onChange={getPassConf} /> :
                (passwordConfirmed ?
                  <input type="password" name="confirm-password" id="confirm-password" className="w-full h-12 bg-slate-100 rounded px-5 py-5 border border-green-500 outline-none focus:bg-slate-200 transition duration-300 focus:border-green-500 focus:border  mt-6" placeholder="Confirm Password" required onChange={getPassConf} /> :
                  <input type="password" name="confirm-password" id="confirm-password" className="w-full h-12 bg-slate-100 rounded px-5 py-5 border border-red-500 outline-none focus:bg-slate-200 transition duration-300 focus:border-red-500 focus:border  mt-6" placeholder="Confirm Password" required onChange={getPassConf} />
                )
              }
              {passwordConfirmed ?
                <input type="submit" value="Sign Up" className="w-full h-14 rounded bg-slate-200 outline-none mt-12 hover:bg-blue-500 hover:text-white hover:cursor-pointer transition duration-300 focus:bg-blue-600" /> :
                <input type="submit" value="Sign Up" className="w-full h-14 rounded bg-slate-200 outline-none mt-12 hover:cursor-not-allowed text-gray-400 transition duration-300 focus:bg-blue-600" disabled />
              }
            </form>
          </>
        }
      </div>
    </>
  )
}