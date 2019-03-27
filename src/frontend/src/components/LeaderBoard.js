import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
class LeaderBoard extends Component{
  constructor(){
    super();
    this.state = {
      response:{},
    }
  }

componentDidMount(){
  const request = new Request('http://127.0.0.1:8001/LeaderBoard');
  fetch(request)
    .then(response => response.json())
      .then(data => this.setState({response: data}))
}

render(){
  return(
      <div className="App">
        <header className="App-header">
          <h2 className="App-title">LeaderBoard</h2>
        </header>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Index</th>
              <th>UserMail</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {
              (this.state.response.length > 0) && this.state.response.sort((p,q)=>{return q.score-p.score}) &&
              this.state.response.map((item, key)=> {
                 return (
                    <tr key = {key}>
                        <td>{key+1}</td>
                        <td>{item.UserMail}</td>
                        <td>{item.score}</td>
                    </tr>
                  )
               })
          }
        </tbody>
         </table>
       </div>
    )
  }
}
export default LeaderBoard
