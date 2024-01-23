"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', status: 'todo' },
    { id: 2, title: 'Task 2', status: 'inProgress' },
    { id: 3, title: 'Task 3', status: 'done' },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');

  const [draggedTask, setDraggedTask] = useState(null);

  const handleDragStart = (task) => {
    setDraggedTask(task);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
  };

  const moveTask = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  const transferTask = (taskId, newIndex) => {
    const updatedTasks = [...tasks];
    const index = updatedTasks.findIndex((task) => task.id === taskId);
    const [removedTask] = updatedTasks.splice(index, 1);
    updatedTasks.splice(newIndex, 0, removedTask);
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const addTask = () => {
    if (newTaskTitle.trim() !== '') {
      const newTask = {
        id: tasks.length + 1,
        title: newTaskTitle,
        status: 'todo',
      };

      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
    }
  };

  const Card = ({ task, index }) => {
    const isDragging = task === draggedTask;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        onDragStart={() => handleDragStart(task)}
        onDragEnd={handleDragEnd}
        className={`bg-white p-4 mb-4 rounded shadow ${isDragging && 'opacity-50'}`}
      >
        {task.title}
        <button
          className="float-right text-xs text-blue-500 ml-2"
          onClick={() => moveTask(task.id, task.status === 'todo' ? 'inProgress' : 'done')}
        >
          {task.status === 'todo' ? 'Start' : 'Complete'}
        </button>
        <button
          className="float-right text-xs text-red-500"
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </button>
        {index > 0 && (
          <button
            className="float-left text-xs text-gray-500"
            onClick={() => transferTask(task.id, index - 1)}
          >
            Move Left
          </button>
        )}
        {index < tasks.length - 1 && (
          <button
            className="float-left text-xs text-gray-500 ml-2"
            onClick={() => transferTask(task.id, index + 1)}
          >
            Move Right
          </button>
        )}
      </motion.div>
    );
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex">
        <div className="w-1/3 p-4">
          <h2 className="text-lg font-bold mb-4">To Do</h2>
          <div className="bg-gray-200 p-4 max-h-96 overflow-y-auto">
            <AnimatePresence>
              {tasks
                .filter((task) => task.status === 'todo')
                .map((task, index) => (
                  <Card key={task.id} task={task} index={index} />
                ))}
            </AnimatePresence>
            <div className="mt-4">
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="New Task"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
              />
              <button
                className="mt-2 bg-blue-500 text-white p-2 rounded"
                onClick={addTask}
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
        <div className="w-1/3 p-4">
          <h2 className="text-lg font-bold mb-4">In Progress</h2>
          <div className="bg-gray-200 p-4">
            <AnimatePresence>
              {tasks
                .filter((task) => task.status === 'inProgress')
                .map((task, index) => (
                  <Card key={task.id} task={task} index={index} />
                ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="w-1/3 p-4">
          <h2 className="text-lg font-bold mb-4">Done</h2>
          <div className="bg-gray-200 p-4">
            <AnimatePresence>
              {tasks
                .filter((task) => task.status === 'done')
                .map((task, index) => (
                  <Card key={task.id} task={task} index={index} />
                ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mt-4">
        Advanced Kanban Board with CRUD
      </h1>
      <KanbanBoard />
    </div>
  );
};

export default App;
