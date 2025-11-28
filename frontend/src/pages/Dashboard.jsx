import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    try {
      const res = await API.get("/tasks");
      console.log('loaded tasks:', res.data); 
      setTasks(res.data);
    } catch (err) {
      console.error('loadTasks error', err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div>
      <div className="card">
        <h2>Welcome, {user?.name}</h2>
        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      </div>

      <TaskForm refresh={loadTasks} />
      <TaskList tasks={tasks} refresh={loadTasks} />
    </div>
  );
}
