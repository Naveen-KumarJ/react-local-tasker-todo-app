import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const EachTaskBoxComponent = ({
  eachTask,
  setTasks,
  setInputTask,
  setIsEditing,
  setEditId,
  notifier
}) => {
  const handleEvent = (selectedId, action) => {
    if (action === "CHECKBOX_CLICK") {
      setTasks((prev) => {
        const updatedTask = prev.map((task) => {
          if (task.id === selectedId) {
            return { ...task, completed: !task.completed };
          }
          return task;
        });
        return updatedTask;
      });
    } else if (action === "DELETE") {
      setTasks((prev) => {
        const updatedTask = prev.filter((task) => task.id != selectedId);
        return updatedTask;
      });
      notifier("Task Deleted Successfully!", "DELTE");
    } else if (action === "EDIT") {
      setIsEditing(true);
      setInputTask(eachTask.task);
      setEditId(selectedId);
    }
  };

  return (
    <div className="bg-slate-100 flex items-center gap-2 p-2">
      <input
        type="checkbox"
        className="min-h-4 min-w-4"
        checked={eachTask.completed}
        onChange={() => handleEvent(eachTask.id, "CHECKBOX_CLICK")}
      />
      <span
        className={`text-xs sm:text-sm md:text-base ${
          eachTask.completed ? "line-through text-gray-400" : "text-gray-800"
        }`}
      >
        {eachTask.task}
      </span>
      <div className="ml-auto flex justify-center items-center text-xl gap-3">
        <FaEdit
          className="text-green-800 cursor-pointer"
          onClick={() => handleEvent(eachTask.id, "EDIT")}
        />
        <MdDelete
          className="text-red-600 cursor-pointer"
          onClick={() => handleEvent(eachTask.id, "DELETE")}
        />
      </div>
    </div>
  );
};

export default EachTaskBoxComponent;
