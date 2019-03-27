import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
class ShowQuizzes extends Component{
  constructor(params){
    super(params);
    this.state = {
      GenreID: params.match.params.GenreID,
      redirect:0,
      index:0,
      response:[],
      Error :""
    }
    this.HandleRedirect = this.HandleRedirect.bind(this)
    this.HandleDeleteQuiz = this.HandleDeleteQuiz.bind(this)
  }

componentDidMount() {
  const request = new Request('http://127.0.0.1:8001/ShowQuizzes/' + this.state.GenreID);
  fetch(request)
    .then(response => response.json())
      .then(data => {
        this.setState({response: data.Quizzes})
        this.setState({Error : data.Response})
        if(this.state.Error != "Good"){
          alert(this.state.Error)
        }
        });
}

HandleDeleteQuiz(i,e) {
  fetch('http://localhost:8001/DeleteQuiz/'+ i, {
    method: 'DELETE',
    // body: JSON.stringify(this.state.formData),
  })
  .then(response => response.json()).then(data => {
    this.setState({Error: data})
    alert(this.state.Error)
    window.location.reload()
  });

}

HandleRedirect(i,item,event){
    this.setState({redirect:item})
    this.setState({index:i})
}


render(){
  return (
    <div className="App">
      <header className="App-header">
        <h2 className="App-title">Quizzes OF a Genre</h2>
      </header>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Quiz</th>
          </tr>
        </thead>
        <tbody>{this.state.response.map((item, key)=> {
             return (
                <tr key = {key}>
                    <td>{item.Name}</td>
                    {
                      (localStorage.getItem('user')) === "admin@admin.com" &&
                      <td><button id={item.Name} onClick={(e)=>this.HandleRedirect(1,item.ID,e)} className="btn btn-default">Add Questions</button></td>
                    }
                    {
                      (localStorage.getItem('user') === "admin@admin.com") &&
                       <td><button id={item.Name} onClick={(e)=>this.HandleDeleteQuiz(item.ID,e)} className="btn btn-default">Delete Quiz</button></td>
                    }
                    {
                      (localStorage.getItem('user') === "admin@admin.com") &&
                       <td><button id={item.Name} onClick={(e)=>this.HandleRedirect(2,item.ID,e)} className="btn btn-default">Edit Quiz</button></td>
                    }
                    {
                      (localStorage.getItem('user')) &&
                      <td><button id={item.Name} onClick={(e)=>this.HandleRedirect(3,item.ID,e)} className="btn btn-default">Play Quiz</button></td>
                    }


                </tr>
              )
           })}
        </tbody>
     </table>
     {
       !(localStorage.getItem('user')) &&
         <Redirect to = '/'></Redirect>
     }
     {
       (this.state.redirect != 0 && this.state.index == 1) &&
       <Redirect to ={ "/ShowQuiz/"+ this.state.redirect }></Redirect>
     }
     {
       (this.state.redirect != 0 && this.state.index == 2) &&
       <Redirect to ={ "/EditQuiz/"+ this.state.redirect }></Redirect>
     }
     {
       (this.state.redirect != 0 && this.state.index == 3) &&
       <Redirect to ={ "/PlayQuiz/"+ this.state.redirect }></Redirect>
     }


   </div>

  )
}
}
export default ShowQuizzes
