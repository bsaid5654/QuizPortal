import React,{ Component } from 'react'
import { Redirect } from 'react-router-dom'
class CreateQuiz extends Component{
  constructor(params) {
    super(params);
    this.state = {
      formData: {
        QuizName:""
      },
      response:"",
      GenreID: params.match.params.GenreID
    },
    this.handleQChange = this.handleQChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
      event.preventDefault();
      fetch('http://localhost:8001/CreateQuiz/'+this.state.GenreID, {
        method: 'POST',
        body: JSON.stringify(this.state.formData),
      })
      .then(response => response.json()).then(data => {
        this.setState({response: data})
        alert(this.state.response)
      });
    }

  handleQChange(event) {
      this.state.formData.QuizName = event.target.value;
    }

    render(){
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Create Quiz</h1>
          </header>
          <br/><br/>
          <div className="container">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                  <label>Quiz Name</label>
                  <input type="text" required className="form-control" value={this.state.QuizName} onChange={this.handleQChange}/>
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
  export default CreateQuiz
