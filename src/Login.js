import { useState } from 'react';
import { Flex, Input, Button, Text } from '@chakra-ui/react';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
  });

  const [loginError, setLoginError] = useState(false); // State to track login error

  const { usernameOrEmail, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    // Check if user data exists in local storage
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    // Check if the entered usernameOrEmail matches any registered username or email
    const matchedUser = registeredUsers.find(
      user =>
        (user.username === usernameOrEmail || user.email === usernameOrEmail) &&
        user.password === password
    );

    if (matchedUser) {
      console.log('Login successful'); // Simulated login success
      onLogin(matchedUser.username); // Notify parent component about successful login
    } else {
      console.log('Invalid credentials'); // Simulated invalid credentials
      // Set login error to true to display login failed message
      setLoginError(true);
    }

    setFormData({ usernameOrEmail: '', password: '' });
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Text>Login</Text>
      <form onSubmit={onSubmit}>
        <Flex m='auto' w='100%'>
          <Flex m='10px' w='100%'>
            <Input
              type="text"
              placeholder="Username or Email"
              name="usernameOrEmail"
              value={usernameOrEmail}
              onChange={onChange}
              required
            />
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
          <Button m='10px' type="submit">Login</Button>
        </Flex>
        {loginError && ( // Display error message if login failed
          <Text color="red">Login failed. Invalid credentials.</Text>
        )}
      </form>
    </div>
  );
};

export default Login;
