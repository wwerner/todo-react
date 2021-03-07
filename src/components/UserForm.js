import React from "react";

function UserForm(props) {
  function handleChange(e) {
    props.setUser(e.target.value);
  }

  return (
    <form>
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
    </form>
  );
}

export default UserForm;
