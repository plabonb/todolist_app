import { Flex, Input } from "@chakra-ui/react";

import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    // Simulate successful login (replace this with actual login logic)
    // For example, you can send a login request to the server here
    console.log('Login form submitted:', formData);
    
    // Assuming login is successful, call the onLogin function passed from App
    // Pass the username to the onLogin function
    onLogin(formData.username); // Update isLoggedIn state in the App component and pass the username
    // Reset form after successful login (if needed)
    setFormData({ username: '', password: '' });
  };

  return (
    <Flex>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <Flex>
          <Input
            type="text"
            placeholder="Username or Email"
            name="username"
            value={username}
            onChange={onChange}
            required
          />
        </Flex>
        <Flex>
          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
            required
          />
        </Flex>
        <Input type="submit" value="Login" />
      </form>
    </Flex>
  );
};

export default Login;
