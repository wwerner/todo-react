import React, { useState } from "react";

function UserForm(props) {
  const [user, setUser] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!user.trim()) {
      return;
    }
    props.setUser(user);
  }

  function handleChange(e) {
    setUser(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="user-name-input" className="label__lg">
          What's your name?
        </label>
      </h2>

      <input
        type="text"
        id="user-name-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        onChange={handleChange}
      />

      <button type="submit" className="btn btn__primary btn__lg">
        Save
      </button>
    </form>
  );
}

export default UserForm;
