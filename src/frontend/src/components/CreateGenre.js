import React,{ Component } from 'react'
import { Redirect } from 'react-router-dom'

class CreateGenre extends Component{
  constructor() {
    super();
    this.state = {
      formData: {
        Name:""
      },
      response:""
    }
    this.handleGChange = this.handleGChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

handleSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:8001/CreateGenre', {
      method: 'POST',
      body: JSON.stringify(this.state.formData),
    })
    .then(response => response.json()).then(data => {
      this.setState({response: data})
      alert(this.state.response)
    });
  }

  handleGChange(event) {
    this.state.formData.Name = event.target.value;
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Create Genre</h1>
        </header>
        <br/><br/>
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Genre Name</label>
                <input type="text" className="form-control" required  value={this.state.Name} onChange={this.handleGChange}/>

          </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>
      {
        !(localStorage.getItem('user') === "admin@admin.com") &&
          <Redirect to = '/'></Redirect>
      }
    </div>
  );
  }
}
export default CreateGenre
