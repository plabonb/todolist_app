import { Flex, Input, Button, Text } from "@chakra-ui/react";

import React, { useState } from 'react';

const Register = ({ onRegister }) => {

  const [userName] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { username, email, password, confirmPassword } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    // Validate password and confirm password match
    if (password !== confirmPassword) {
      console.log('Passwords do not match');
      // Handle error: passwords do not match
    } else {
      // Implement registration functionality here
      console.log('Registration form submitted:', formData);
      // Reset form after submission (if needed)
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      // Simulate registration success
      onRegister(); // Invoke the callback to handle registration success
    }
  };

  const handleRegistration = () => {
    // Perform user registration and capture user details
    const newUser = { id: 2, name: userName, avatarColor: "green.500" };
    // Assuming 'onRegister' is a function to handle successful registration
    onRegister(newUser); // Pass the registered user data to the parent component
  };

  return (
    <>
    <Flex>
      <Text textAlign='center'>Register</Text>
      <form onSubmit={onSubmit}>
        <Flex>
          <Input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={onChange}
            required
          />
          </Flex>
          <Flex>
          <Input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
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
          <Flex>
          <Input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
            minLength="6"
            required
          />
        </Flex>
      </form>
      <Button onClick={handleRegistration}>Register</Button>
    </Flex>
    </>
  );
};

export default Register;
