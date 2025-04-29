import React, { useEffect, useState } from "react";
import EachTaskBoxComponent from "./EachTaskBoxComponent";

const ToDoTaskComponent = () => {
  const [tasks, setTasks] = useState([]);
  const [inputTask, setInputTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState("");
  const [notificationList, setNotificationList] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("localTask") || "[]");
    console.log(savedTasks);
    setTasks(savedTasks);
    console.log("Loaded tasks from localStorage:", savedTasks);
  }, []);

  useEffect(() => {
    if (tasks.length >= 0) {
      localStorage.setItem("localTask", JSON.stringify(tasks));
      console.log("Saved tasks to localStorage:", tasks);
    }
  }, [tasks]);

  const notifier = (message, type) => {
    const id = Date.now();
    const newNotification = { id, message, type };

    setNotificationList((prev) => [...prev, newNotification]);

    setTimeout(() => {
      setNotificationList((prev) => prev.filter((n) => n.id !== id));
    }, 6000);
  };

  const clearAllCompleted = () => {
    setTasks((prev) => {
      const updatedTasks = prev.filter((task) => !task.completed);
      return updatedTasks;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editId != "") {
      if (inputTask.trim() != "") {
        setTasks((prev) => {
          const updatedTask = prev.map((eachTask) => {
            if (eachTask.id === editId) {
              return { ...eachTask, task: inputTask };
            }
            return eachTask;
          });
          return updatedTask;
        });
        notifier("Task Edited Successfully!", "EDIT");
        setEditId("");
        setIsEditing(false);
      } else notifier("Enter Task In Field !", "FAILURE");
    } else {
      if (inputTask.trim() != "") {
        setTasks((prev) => {
          return [
            ...prev,
            { id: Date.now(), task: inputTask.trim(), completed: false },
          ];
        });
        notifier("Task Added Successfully!", "SUCCESS");
      } else notifier("Enter Task In Field !", "FAILURE");
    }
    setInputTask("");
  };
  return (
    <div
      className={`w-full md:w-1/2 mt-10 p-4 rounded flex flex-col gap-6 ${
        tasks ? "border-2" : "border-0"
      } hover:shadow-xl hover:border-1 transition-all ease-in-out`}
    >
      {notificationList && notificationList.length > 0 && (
        <div className="absolute top-2 right-2 flex flex-col gap-2 z-50">
          {notificationList.map((notification) => (
            <div
              key={notification.id}
              className={`
                ${
                  notification.type === "SUCCESS"
                    ? "bg-green-500"
                    : notification.type === "EDIT"
                    ? "bg-yellow-500"
                    : notification.type === "DELETE"
                    ? "bg-red-500"
                    : notification.type === "FAILURE"
                    ? "bg-pink-500"
                    : "bg-gray-500"
                }
                text-white py-2 px-4 rounded shadow-lg text-sm 
                transition-all transform duration-300 ease-in-out
              `}
            >
              {notification.message}
            </div>
          ))}
        </div>
      )}
      <form className="flex" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputTask}
          placeholder="Enter Your Local Task Here !"
          className="border border-gray-300 flex-2 rounded-l px-2 focus:outline-0 placeholder:text-sm text-gray-600"
          onChange={(e) => setInputTask(e.target.value)}
        />
        <input
          type="submit"
          value={`${isEditing ? "Edit" : "Add"}`}
          className={`${
            isEditing ? "bg-green-500" : "bg-blue-500"
          } rounded-r flex-1 px-2 md:px-0 py-1.5 text-white font-semibold cursor-pointer`}
        />
      </form>
      {tasks.length>0 && (
        <>
          <div className="bg-gray-200 h-0.5"></div>
          <div className="flex flex-col gap-4">
            {tasks.map((eachTask) => (
              <EachTaskBoxComponent
                key={eachTask.id}
                eachTask={eachTask}
                tasks={tasks}
                setTasks={setTasks}
                setInputTask={setInputTask}
                setIsEditing={setIsEditing}
                setEditId={setEditId}
                notifier={notifier}
              />
            ))}
          </div>
          {tasks.length>0 && (
            <button
              className="bg-purple-600 text-white w-fit mx-auto px-4 py-1 rounded hover:bg-purple-800 cursor-pointer"
              onClick={clearAllCompleted}
            >
              Clear All Completed
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ToDoTaskComponent;
