import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import '../App.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerAccount = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredentials) => {
        console.log('New user created', userCredentials);
      }
    );
  };

  return (
    <div>
      <form onSubmit={registerAccount}>
        <h1>Register a New Account </h1>
        <input
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        <button type="submit" className="btn">
          Register
        </button>
      </form>
    </div>
  );
}
