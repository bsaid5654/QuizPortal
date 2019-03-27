import React,{ Component } from 'react'
import { Redirect } from 'react-router-dom'
class EditQuiz extends Component{
  constructor(params) {
    super(params);
    this.state = {
      response1:"",
      response2:"",
      formData: {
        Name:""
    },
    back:0,
    ID: params.match.params.ID
  },
    this.handleQChange = this.handleQChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  handleSubmit (event) {
      event.preventDefault();
      fetch('http://localhost:8001/EditQuiz/'+this.state.ID, {
        method: 'PUT',
        body: JSON.stringify(this.state.formData),
      })
      .then(response => response.json()).then(data => {
        this.setState({response1: data})
        alert(this.state.response1)
      });
    }

  componentDidMount(){
    const request = new Request('http://127.0.0.1:8001/ShowQuiz/'+ this.state.ID);
    fetch(request)
      .then(response => response.json())
        .then(data =>{
          this.setState({response2: data.Q})
          this.setValue();
          }
        );

  }

  setValue(){
    this.state.formData.Name = this.state.response2.Name;
    console.log(this.state.formData.Name)
  }

  handleQChange(event) {
      this.state.formData.Name = event.target.value;
    }

    render(){
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Edit Value</h1>
          </header>
          <br/><br/>
          <div className="container">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                  <label>Quiz Name</label>
                  <input type="text" className="form-control" defaultValue={this.state.response2.Name} onChange={this.handleQChange} required/>
              </div>
                  <button type="submit" className="btn btn-default">Submit</button>
            </form>
          </div>
          <button onClick={(e)=>{this.setState({back:1})}} className="btn btn-default">Back</button>
        {
          !(localStorage.getItem('user') === "admin@admin.com") &&
            <Redirect to = '/'></Redirect>
        }
        {
          this.state.back != 0 &&
          <Redirect to = {"/ShowQuizzes/" + this.state.response2.GenreID}></Redirect>
        }

      </div>
    );
    }
  }
  export default EditQuiz
