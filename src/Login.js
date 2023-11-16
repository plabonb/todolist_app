import { Button, Flex, Input, Text } from "@chakra-ui/react";
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
    console.log('Login form submitted:', formData);

    onLogin(formData.username);
    setFormData({ username: '', password: '' });
  };

  return (
    <div>
      <Text>Login</Text>
      <br />
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
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default Login;
