import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

class CreatePost extends React.Component {
  constructor() {
    super();
    this.state = {
      input: {},
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    let input = this.state.input;
    input[event.target.name] = event.target.value;
    this.setState({
      input
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.validate()) {
      const post = this.state.input;
      axios.post(`https://jsonplaceholder.typicode.com/posts`, { post })

        .then(res => {
          console.log(res);
          let input = {};
          input["title"] = "";
          input["body"] = "";
          this.setState({ input: input });
          alert('Post created successfully.');
        })
    }
  }
  validate() {
    let input = this.state.input;
    let errors = {};
    let isValid = true;
    if (!input["title"]) {
      isValid = false;
      errors["title"] = "Please enter your title.";
    }
    if (!input["body"]) {
      isValid = false;
      errors["body"] = "Please enter your body.";
    }
    this.setState({
      errors: errors
    });
    return isValid;
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
          <div className="container">
            <a className="navbar-brand" href="#">React Axios Post Request</a>
          </div>
        </nav>
        <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label for="title">Title:</label>
            <input
              type="text"
              name="title"
              value={this.state.input.title}
              onChange={this.handleChange}
              className="form-control"
              placeholder="Enter title"
              id="title" />
            <div className="text-danger">{this.state.errors.title}</div>
          </div>
          <div className="form-group">
            <label for="body">Body:</label>
            <textarea
              name="body"
              value={this.state.input.body}
              onChange={this.handleChange}
              placeholder="Enter body"
              className="form-control" />
            <div className="text-danger">{this.state.errors.body}</div>
          </div>
          <input type="submit" value="Submit" className="btn btn-success mt-4" />
        </form>
        </div>
       
      </div>
    );
  }
}
export default CreatePost;