import React, { useState, useEffect } from "react";

function Form(props) {
  const [name, setName] = useState('');
  const [assignee, setAssignee] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      return;
    }

    props.addTask(name, assignee);
    setName("");
  }

  function handleTextChange(e) {
    setName(e.target.value);
  }

  function handleAssigneeChange(e) {
    setAssignee(e.target.value);
  }

  // used to set a default assignee in case none was selected
  useEffect(() => {
    if(!assignee) {
      setAssignee(props.users.state[0])
    }
  }, [assignee, props.users.state])

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done by whom?
        </label>
      </h2>

      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleTextChange}
      />
      <select
        type="text"
        id="new-todo-assignee-select"
        className="input input__lg"
        name="assignee"
        onChange={handleAssigneeChange}
        value={assignee}
      >
        {props.users.state.map(u => (<option key={u}>{u}</option>))}
      </select>
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

export default Form;
