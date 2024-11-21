// components/TaskList.js

const TaskList = ({ tasks }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold">Your Tasks</h3>
      <ul className="list-disc pl-6">
        {tasks.map((task, index) => (
          <li key={index} className="mb-2">
            <strong>{task.name}</strong>: {task.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
