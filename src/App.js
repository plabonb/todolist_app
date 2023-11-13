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
import { useState, useEffect } from "react";
import { DeleteIcon } from "@chakra-ui/icons";

const App = () => {
  // Load tasks from local storage or use an empty array if no tasks are stored
  const initialTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const [newTask, setNewTask] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [tasks, setTasks] = useState(initialTasks);

  // Save tasks to local storage whenever tasks state changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
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
    { id: 1, name: "User 1", avatarColor: "teal.500" },
    // Add more users as needed
  ];
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <>
      <Flex w="100%" bg="gray.800">
        <Flex w="100%" flexDir="column" ml="20%" mt="5%" mr="20%" color="White">
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
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>User Information</PopoverHeader>
                <PopoverBody>
                  {selectedUser && (
                    <Text>{`ID: ${selectedUser.id}, Name: ${selectedUser.name}`}</Text>
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
    </>
  );
};

const TaskItem = ({ task, index, updateTask, removeTask }) => {
  return (
    <Checkbox
      onChange={(e) => updateTask(index, e.target.checked)}
      colorScheme="green"
      mb={10}
      w="100%"
      flexDir="row"
      isChecked={task.isChecked}
    >
      <Flex w="100%" flexDir="row">
        <Text color="white" alignSelf="center" fontSize="lg">
          {task.text}
          <br />
          {task.description}
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
