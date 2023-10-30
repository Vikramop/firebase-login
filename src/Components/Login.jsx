import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log(' User logged in', userCredentials);
        const loggedInUser = userCredentials.user;
        setUser(loggedInUser);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        console.log('Signed Out');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe(); //cleanup code to remove the listener when component is destroyed
  }, []);

  return (
    <div>
      <form onSubmit={login}>
        <h1>Log In to Your Account </h1>
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
          Login
        </button>
      </form>
      {user ? (
        <div>
          <h3>Hello There, {user.email} </h3>

          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <p>You are Not Logged In </p>
      )}
    </div>
  );
}
