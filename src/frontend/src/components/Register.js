import React,{ Component } from 'react'

class Register extends Component{
  constructor() {
    super();
    this.state = {
      formData: {
        Name: "",
        Password: "",
        Email: "",
      },
      response : {}
    }
    this.handleNChange = this.handleNChange.bind(this);
    this.handleEChange = this.handleEChange.bind(this);
    this.handlePChange = this.handlePChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

handleSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:8001/Register', {
      method: 'POST',
      body: JSON.stringify(this.state.formData),
    })
    .then(response => response.json()).then(data => {
        this.setState({response : data})
        if(this.state.response.Check == 1){
          alert("Registered Successfully")
        }else{
          alert(this.state.response.Err)
        }

     })
  }


  handleNChange(event) {
    this.state.formData.Name = event.target.value;
  }
  handleEChange(event) {
    this.state.formData.Email = event.target.value;
  }
  handlePChange(event) {
    this.state.formData.Password = event.target.value;
  }


  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">SignUp</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" required  value={this.state.Email} onChange={this.handleEChange}/>
            </div>
            <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" required  value={this.state.Name} onChange={this.handleNChange}/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="Password" minlength="8" required  className="form-control" value={this.state.Password} onChange={this.handlePChange}/>
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>
      </div>
  );
  }
}
export default Register
