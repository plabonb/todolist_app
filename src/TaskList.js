import React from 'react';

const TaskList = ({ tasks }) => {
  return (
    <div>
      <h2>Task List</h2>
      {/* Display the list of tasks */}
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {/* Display task details */}
            <span>{task.text}</span>
            {/* Add more details if needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
