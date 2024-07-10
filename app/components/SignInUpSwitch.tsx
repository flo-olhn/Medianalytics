'use client';

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignInUpSwitch() {
  const [toggleSignIn, setSignIn] = useState(true);
  const [toggleSignUp, setSignUp] = useState(false);
  const [passwordConfirmed, setPasswordConfirmed] = useState(false);
  var [password, setPassword] = useState('');
  var [passconf, setPassConf] = useState('');
  var [email, setEmail] = useState('');
  const [validCredentials, setValidCredentials] = useState(true);
  const [emailExists, setEmailExists] = useState(false);

  function handleSignIn() {
    setSignIn(true);
    setSignUp(false);
  };

  function handleSignUp() {
    setSignIn(false);
    setSignUp(true);
  };

  const getEmail = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const currentValue = event.target.value;
    email = currentValue;
    setEmail(currentValue);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.success) {
      console.log('Form submitted successfully');
      setPassConf('');
      setEmail('');
      setPassword('');
      setPasswordConfirmed(false);
      setEmailExists(false);
      // Rediriger vers la page de tableau de bord après l'inscription
      signIn('credentials', { redirect: true, email, password, callbackUrl: '/dashboard' });
    } else {
      console.log('Form submission failed');
      setEmailExists(true);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password
    });
    if (res?.ok) {
      console.log('Form submitted successfully');
      setPassConf('');
      setEmail('');
      setPassword('');
      setValidCredentials(true);
      // Rediriger vers la page de tableau de bord après la connexion
      window.location.href = '/dashboard';
    } else {
      console.log('Form submission failed');
      setValidCredentials(false);
    }
  };
  return (
    <>
      <div className="flex w-full h-16">
        {toggleSignIn && <div className="flex w-1/2 h-full border-r border-slate-300 items-center justify-center" onClick={handleSignIn}>Sign In</div>}
        {!toggleSignUp && <div className="flex w-1/2 h-full bg-slate-100 items-center justify-center text-gray-400 border-b border-slate-300 hover:cursor-pointer hover:bg-slate-200 transition duration-300" onClick={handleSignUp}>Sign Up</div>}
        {!toggleSignIn && <div className="flex w-1/2 h-full bg-slate-100 items-center justify-center text-gray-400 border-b border-slate-300 hover:cursor-pointer hover:bg-slate-200 transition duration-300" onClick={handleSignIn}>Sign In</div>}
        {toggleSignUp && <div className="flex w-1/2 h-full border-l border-slate-300 items-center justify-center" onClick={handleSignUp}>Sign Up</div>}
      </div>
      <div className="w-full h-[calc(100%_-_4rem)] flex flex-col items-center justify-center">
        {toggleSignIn ? <p className="absolute text-3xl font-bold top-36 p-0 m-0">Log in<br />to your account</p> : <p className="absolute text-3xl font-bold top-36 p-0 m-0">Create<br />your account</p>}
        {toggleSignIn &&
          <>
            <form action="" method="post" className="" onSubmit={(e) => handleLogin(e)}>
              {!validCredentials ?
                <div className="relative text-red-500 bottom-4 h-12 w-full flex justify-center items-center">
                  <p>Invalid credentials, try again</p>
                </div> :
                <div className="relative text-red-500 bottom-4 h-12" >
                  <p className="hidden">Invalid credentials, try again</p>
                </div>
              }
              <input type="email" name="email" id="email" className="w-full h-12 bg-slate-100 rounded px-5 py-5 border border-slate-300 mb-6 outline-none focus:bg-slate-200 transition duration-300 focus:border-blue-500 focus:border " placeholder="Email address" value={email} required onChange={(event) => getEmail(event)} /><br />
              <input type="password" name="password" id="password" className="w-full h-12 bg-slate-100 rounded px-5 py-5 border border-slate-300 outline-none focus:bg-slate-200 transition duration-300 focus:border-blue-500 focus:border " placeholder="Password" value={password} required onChange={(event) => getPassword(event)} />
              <input type="submit" value="Sign In" className="w-full h-14 rounded bg-slate-200 outline-none mt-12 hover:bg-blue-500 hover:text-white hover:cursor-pointer transition duration-300 focus:bg-blue-600" />
            </form>
          </>
        }
        {toggleSignUp &&
          <>
            <form action="" method="post" className="" onSubmit={(event) => handleSubmit(event)}>
              {emailExists ?
                <div className="relative text-red-500 bottom-4 h-12 w-full flex justify-center items-center">
                  <p>An account with this email already exists</p>
                </div> :
                <div className="relative text-red-500 bottom-4 h-12" >
                  <p className="hidden">An account with this email already exists</p>
                </div>
              }
              <input type="email" name="email" id="email" className="w-full h-12 bg-slate-100 rounded px-5 py-5 border border-slate-300 mb-6 outline-none focus:bg-slate-200 transition duration-300 focus:border-blue-500 focus:border" placeholder="Email address" value={email} required onChange={(event) => getEmail(event)} /><br />
              
              <input type="password" name="password" id="password" pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}"
                title="Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*) and be at least 8 characters long."
                required
                className="w-full h-12 bg-slate-100 rounded px-5 py-5 border border-slate-300 outline-none focus:bg-slate-200 transition duration-300 focus:border-blue-500 focus:border" placeholder="Password"
                value={password} onChange={(event) => getPassword(event)}
              /><br />
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