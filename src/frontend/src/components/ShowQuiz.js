import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

class ShowQuiz extends Component{
  constructor(params){
    super(params);
    this.state = {
      response : {},
      Questions : [],
      addQ : 0,
      Error:"",
      redirect:0,
      index:0,
      back:0,
      ID : params.match.params.ID
    }
  }

  componentDidMount() {
    const request = new Request('http://127.0.0.1:8001/ShowQuiz/' + this.state.ID);
    fetch(request)
      .then(response => response.json())
        .then(data => {
          this.setState({Questions: data.Ques})
          this.setState({response : data.Q})
          console.log(this.state.Questions)
          });
  }

  HandleRedirect(i,item,event){
      this.setState({redirect:item})
      this.setState({index:i})
  }


  HandleDeleteQuestion(i,e) {
    fetch('http://localhost:8001/DeleteQuestion/'+ i, {
      method: 'DELETE',
    })
    .then(response => response.json()).then(data => {
      this.setState({Error: data})
      alert(this.state.Error)
      window.location.reload()
    });

  }
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h2 className="App-title">{this.state.response.Name}</h2>
        </header>
        <table className="table-hover">
          <thead>
            <tr>
              <th>Question</th>
            </tr>
          </thead>
          <tbody>{this.state.Questions.map((item, key)=> {
               return (
                  <tr key = {key}>
                      <td>{item.Question}</td>
                      {
                        (localStorage.getItem('user') === "admin@admin.com") &&
                        <td><button  id={item.Name} onClick={(e)=>this.HandleDeleteQuestion(item.ID,e)} className="btn btn-default">Delete Question</button></td>
                      }
                      {
                        (localStorage.getItem('user') === "admin@admin.com") &&
                         <td><button id={item.Name} onClick={(e)=>this.HandleRedirect(1,item.ID,e)} className="btn btn-default">Edit Question</button></td>
                      }


                  </tr>
                )
             })}
          </tbody>
       </table>
       {
         (localStorage.getItem('user') === "admin@admin.com") &&
         <button onClick={(e)=>this.setState({addQ:!this.state.addQ})} className="btn btn-default">Add Question</button>
       }
       <button onClick={(e)=>this.setState({back:1})} className="btn btn-default">Back</button>
       {
         this.state.addQ &&
         <Redirect to = {'/CreateQns/'+ this.state.ID}></Redirect>
       }
       {
         !(localStorage.getItem('user')) &&
           <Redirect to = '/'></Redirect>
       }
       {
         (this.state.redirect != 0 && this.state.index == 1) &&
         <Redirect to ={ "/EditQuestion/"+ this.state.redirect }></Redirect>
       }
       {
         this.state.back != 0 &&
         <Redirect to = {"/ShowQuizzes/" + this.state.response.GenreID}></Redirect>
       }

     </div>
    )
  }

}

export default ShowQuiz
