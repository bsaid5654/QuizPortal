import React,{ Component } from 'react'
import { Redirect } from 'react-router-dom'
class Login extends Component{
  constructor(){
    super()
    this.state={
      formData : {
        Email : "",
        Password : "",
      },
      response : {}
    }
    this.handleEChange = this.handleEChange.bind(this);
    this.handlePChange = this.handlePChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  handleEChange(event) {
    this.state.formData.Email = event.target.value;
  }
  handlePChange(event) {
    this.state.formData.Password = event.target.value;
  }

  handleSubmit (event) {
      event.preventDefault();
      fetch('http://localhost:8001/Login', {
        method: 'POST',
        body: JSON.stringify(this.state.formData),
      })
      .then(response => response.json()).then((data) => {
        this.setState({response: data});
        this.setValue();
        if(this.state.response.Check===0){
          alert(this.state.response.Err)
        }
       })
    }
  setValue (){
    if(this.state.response.Check === 1){
      localStorage.setItem('user',this.state.response.Email)
      window.location.reload()
    }
  }

  render(){
    return (
      <div className="App">

        {/* <h1> {this.state.response.Email}</h1> */}
        <header className="App-header">
          <h1 className="App-title">Login</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" required  value={this.state.Email} onChange={this.handleEChange}/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="Password" className="form-control" required  value={this.state.Password} onChange={this.handlePChange}/>
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>
        {
          localStorage.getItem('user') &&
            <Redirect to = '/'></Redirect>
        }
      </div>
  );
  }
}
export default Login
