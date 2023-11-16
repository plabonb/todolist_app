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
    if (password !== confirmPassword) {
      console.log('Passwords do not match');
      // Handle error: passwords do not match
    } else {
      console.log('Registration form submitted:', formData);
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      onRegister(); // This will notify the parent component about successful registration
    }
  };

  const handleRegistration = () => {
    const newUser = { id: 2, name: userName, avatarColor: "green.500" };
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
