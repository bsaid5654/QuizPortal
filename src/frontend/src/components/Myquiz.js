import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
class Myquiz extends Component{
  constructor(){
    super();
    this.state = {
      response:{}
    }
  }

componentDidMount(){
  const request = new Request('http://127.0.0.1:8001/MyQuiz/'+localStorage.getItem('user'));
  fetch(request)
    .then(response => response.json())
      .then(data => this.setState({response: data}));
}



  render(){
    return(
        <div className="App">
          <header className="App-header">
            <h2 className="App-title">My Quiz</h2>
          </header>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Index</th>
                <th>Quiz</th>
                <th>Score</th>
              </tr>
            </thead>
            {
              this.state.response.length > 0 &&
            <tbody>{this.state.response.map((item, key)=> {
                 return (
                    <tr key = {key}>
                        <td>{key+1}</td>
                        <td>{item.QuizName}</td>
                        <td>{item.Score}</td>
                    </tr>
                  )
               })}
            </tbody>
          }
         </table>
       </div>
    )
  }
}

export default Myquiz
