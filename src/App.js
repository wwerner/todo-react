import React, { useState, useRef, useEffect } from "react";
import Form from "./components/Form";
import UserForm from "./components/UserForm";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { nanoid } from "nanoid";
import { taskAdded, taskListFish, userAdded, userListFish } from "./model";
import { useFish } from "@actyx-contrib/react-pond";


function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function App() {
  const tasks = useFish(taskListFish);
  const users = useFish(userListFish);
  const [filter, setFilter] = useState('All');
  const [user, setUser] = useState('');

  const FILTER_MAP = {
    All: () => true,
    Active: task => !task.completed,
    Mine: task => task.assignee === user,
    Completed: task => task.completed
  };
  
  const FILTER_NAMES = Object.keys(FILTER_MAP);
  
  // all task operations are handled by the Todo component in this demo
  const taskList = tasks.state.map(task => <Todo id={task} key={task} show={FILTER_MAP[filter]} currentUser={user}/>);

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  function addTask(task, assignee) {
    // state could be used to check whether the task already exists
    tasks.run((_state, enqueue) => enqueue(...taskAdded("todo-" + nanoid(), task, user, assignee)));
  }

  function setAndRegisterUser(name) {
    setUser(name)
    if(users.state.indexOf(name) === -1) {
      users.run((_state, enqueue) => enqueue(...userAdded(name)));
    }
  }

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <div className="todoapp stack-large">
      <UserForm setUser={setAndRegisterUser} />
      <Form addTask={addTask} users={users} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
