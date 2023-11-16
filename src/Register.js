import { useState } from 'react';
import { Flex, Input, Button, Text } from '@chakra-ui/react';

const Register = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [registrationError, setRegistrationError] = useState(false); // State to track registration error

  const { username, email, password, confirmPassword } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    // Check if user data exists in local storage
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    // Check if the username or email already exists
    const isUsernameTaken = registeredUsers.some(user => user.username === username);
    const isEmailTaken = registeredUsers.some(user => user.email === email);

    if (isUsernameTaken || isEmailTaken || password !== confirmPassword) {
      console.log('Registration failed'); // Simulated registration failure
      // Set registration error to true to display registration failed message
      setRegistrationError(true);
    } else {
      console.log('Registration successful'); // Simulated registration success
      // Save the registered user data to local storage
      const newUser = { username, email, password /* Other user data if needed */ };
      registeredUsers.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

      onRegister(newUser); // Pass the registration data to the parent component for further processing
    }

    setFormData({ username: '', email: '', password: '', confirmPassword: '' });
  };

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <Text>Register</Text>
        <form onSubmit={onSubmit}>
          <Flex m='auto' w='100%'>
            {/* ... (Input fields for username, email, password, confirmPassword) */}
            <Input
              m='10px' w='100%'
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={onChange}
              required
            />
            <Input
              m='10px' w='100%'
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
            <Input
              m='10px' w='100%'
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
              minLength="6"
              required
            />
            <Input
              m='10px' w='100%'
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              minLength="6"
              required
            />
          </Flex>
          <Button m='10px' type="submit">Register</Button>
        </form>
        {registrationError && ( // Display error message if registration failed
          <Text color="red">Registration failed. Please check the input values.</Text>
        )}
      </div>
    </>
  );
};

export default Register;
