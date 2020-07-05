import React, { Component } from "react";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", groupName: "" };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type='text'
            name='name'
            value={this.state.name}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Group Name:
          <input
            type='text'
            name='groupName'
            value={this.state.groupName}
            onChange={this.handleChange}
          />
        </label>
        <button
          onClick={() =>
            this.props.handleSubmit(this.state.name, this.state.groupName)
          }>
          Connect to Group
        </button>
      </form>
    );
  }
}

export { LoginForm };
