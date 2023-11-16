import {
  Flex,
  Text,
  Input,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Checkbox,
  IconButton,
  AvatarGroup,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from "./Login";
import Register from './Register';
import TaskList from './TaskList';
import NotFound from './NotFound';
import { DeleteIcon } from "@chakra-ui/icons";


const App = () => {
  const initialTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const [newTask, setNewTask] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [tasks, setTasks] = useState(initialTasks);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [view, setView] = useState('welcome');

  // Save tasks to local storage whenever tasks state changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();

    if (newTask.length > 0) {
      setTasks((prevState) => [
        ...prevState,
        { text: newTask, description: newDescription, isChecked: false },
      ]);
      setNewTask("");
      setNewDescription("");
    }
  };

  const updateTask = (index, checked) => {
    let newTasks = [...tasks];
    newTasks[index].isChecked = checked;
    setTasks(newTasks);
  };

  const removeTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };
  const users = [
    { id: '', name: (`username`), avatarColor: "teal.500" },
    // Add more users as needed
  ];
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserClick = (user) => {
    setIsLoggedIn(true);
    setSelectedUser(user);
    setView('taskList'); // Assuming the view transitions to 'taskList' after user selection
  };

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setSelectedUser({ name: username }); // Assuming 'selectedUser' contains the user details
    setView('taskList');
  };

  const handleRegister = (newUser) => {
    setIsLoggedIn(true);
    setSelectedUser(newUser);
    setView('taskList');
  };

  const handleBackToWelcome = () => {
    setIsLoggedIn(false); // Log out when going back to the welcome screen
    setSelectedUser(null); // Reset selected user when going back to the welcome screen
    setView('welcome');
  };

  return (
    <Router>
      <Switch>
        <Route path="/taskList">
          {isLoggedIn ? (
            <TaskList tasks={tasks} />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route exact path="/">
          {isLoggedIn ? (
            // Display for logged-in users
            <LoggedInView
              tasks={tasks}
              newTask={newTask}
              newDescription={newDescription}
              setNewTask={setNewTask}
              setNewDescription={setNewDescription}
              addTask={addTask}
              updateTask={updateTask}
              removeTask={removeTask}
              users={users}
              selectedUser={selectedUser}
              handleUserClick={handleUserClick}
              handleBackToWelcome={handleBackToWelcome}
            />
          ) : (
            // Display for not logged in
            <NotLoggedInView
              view={view}
              setView={setView}
              handleLogin={handleLogin}
              handleRegister={handleRegister}
              handleBackToWelcome={handleBackToWelcome}
            />
          )}
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

// Separated components for logged-in and not logged-in views

const LoggedInView = ({ tasks, newTask, newDescription, setNewTask, setNewDescription, addTask, updateTask, removeTask, users, selectedUser, handleUserClick, handleBackToWelcome }) => {
  return (
    <Flex bg="gray.800">
      <Flex w="80%" flexDir="column" m="auto" color="White">
        <Flex>
          {/* Adjust 'userName' variable or replace it with the actual user's name */}
          <Text margin="auto">
            <span style={{ fontWeight: "bold" }}>Welcome</span>
            {/* Check if selectedUser exists before accessing its name property */}
            {selectedUser && <span>{selectedUser.name}</span>}
            <br />
            <span style={{ fontWeight: "bold" }}> Add Your To-Do List</span>
          </Text>
        </Flex>
        <Flex>
          <Text fontWeight="700" fontSize={30}>
            Texts
          </Text>
          <Popover placement="bottom-end" isLazy>
            <PopoverTrigger>
              <Button ml="auto" variant="unstyled">
                <AvatarGroup spacing="1rem" boxSize="1.5rem">
                  {users.map((user) => (
                    <Avatar
                      key={user.id}
                      bg={user.avatarColor}
                      onClick={() => handleUserClick(user)}
                      cursor="pointer"
                    />
                  ))}
                </AvatarGroup>
              </Button>
            </PopoverTrigger>
            <PopoverContent bg='blue.200'>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader >User profile</PopoverHeader>
              <PopoverBody>
                {selectedUser && (
                  <Text style={{ color: 'black' }}>
                    {`ID: ${selectedUser.id}`}
                    <br />
                    {`Name: ${selectedUser.name}`}
                  </Text>
                )}
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>
        <form onSubmit={addTask}>
          <Flex mt="2%">
            <Input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              variant="flushed"
              placeholder="Add Title"
              w="50%"
            />
            <Input
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              variant="flushed"
              placeholder="Add Description"
              w="50%"
              ml="5%"
            />
            <Button onClick={addTask} ml={5} bg="blue.400">
              Add
            </Button>
          </Flex>
        </form>
        <Tabs mt="3%" w="100%">
          <TabList>
            <Tab>Imcomplete Tabs</Tab>
            <Tab>Complete Tabs</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {tasks.map((task, index) =>
                !task.isChecked ? (
                  <TaskItem
                    removeTask={removeTask}
                    updateTask={updateTask}
                    key={index}
                    task={task}
                    index={index}
                  />
                ) : null
              )}
            </TabPanel>
            <TabPanel>
              {tasks.map((task, index) =>
                task.isChecked ? (
                  <TaskItem
                    removeTask={removeTask}
                    updateTask={updateTask}
                    key={index}
                    task={task}
                    index={index}
                  />
                ) : null
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
};

const NotLoggedInView = ({ view, setView, handleLogin, handleRegister, handleBackToWelcome }) => {
  return (
    <div>
      {view === 'login' && <Login onLogin={handleLogin} />}
      {view === 'register' && <Register onRegister={handleRegister} />}
      {view === 'welcome' && (
        <div>
          {/* Welcome screen */}
          <div>
            <Flex w='100%' mt='30px'>
              <Text m='auto' mt='30px' fontSize='30px'>Welcome to <span>TO-DO</span> App</Text>

            </Flex>
            <Flex w='100%' mt='50px' justify='center'>
              <Button m='5px' onClick={() => setView('login')}>Login</Button>
              <Button m='5px' onClick={() => setView('register')}>Register</Button>
            </Flex>
          </div>
        </div>
      )}
      {view !== 'welcome' && (
        <Button onClick={handleBackToWelcome}>Back to Welcome</Button>
      )}
    </div>
  );
};

const TaskItem = ({ task, index, updateTask, removeTask }) => {
  return (
    <Checkbox
      onChange={(e) => updateTask(index, e.target.checked)}
      colorScheme="green"
      mb={10}
      w="100%"
      isChecked={task.isChecked}
    >
      {/* ... (checkbox content) */}
      <Flex flexDir="row">
        <Text
          color="white"
          ml="20px"
          mr="20px"
          alignSelf="center"
          fontSize="lg"
          textOverflow="revert"
          style={{ width: "85%" }}
        >
          <span style={{ fontWeight: "bold" }}>{task.text}</span>
          <br />
          <span style={{ fontStyle: "italic", marginRight: "20px" }}>
            {task.description}
          </span>
        </Text>

        <IconButton
          onClick={() => removeTask(index)}
          bg="red.600"
          pos="absolute"
          right={0}
          icon={<DeleteIcon />}
        />
      </Flex>
    </Checkbox>
  );
};

export default App;
