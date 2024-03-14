import { React, useState } from 'react';
import App from '../App.css';

const Home = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    // Login Logic
    console.log('Logging in with:', username, password);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // Signup Logic
    console.log('Signing up with:', username, password);
  };

  return (
    <div className="login-container">
      <h1>Greetings Doctor</h1>
      <form className="login-form" onSubmit={isLogin ? handleLogin : handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
        <p onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Don\'t have an account? Sign Up' : 'Already have an account? Login'}
        </p>
      </form>
    </div>
  );
};

export default Home;
