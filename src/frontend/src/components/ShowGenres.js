import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
class ShowGenres extends Component {
  constructor() {
    super();
    this.state = {
      response: [],
      redirect:0,
     index:0
  }
   this.HandleRedirect = this.HandleRedirect.bind(this);
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8001/ShowGenres');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({response: data}));
  }

  HandleRedirect(i,item,event){
      this.setState({redirect:item})
      this.setState({index:i})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2 className="App-title">All Genres</h2>
        </header>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Genres</th>
            </tr>
          </thead>
          <tbody>{this.state.response.map((item, key)=> {
               return (
                  <tr key = {key}>
                      <td>{item.Name}</td>
                      {
                        (localStorage.getItem('user') === "admin@admin.com") &&
                        <td><button id={item.Name} onClick={(e)=>this.HandleRedirect(1,item.ID,e)} className="btn btn-default">Create Quiz</button></td>
                      }
                      <td><button id={item.Name} onClick={(e)=>this.HandleRedirect(2,item.ID,e)} className="btn btn-default">Show Quizzes</button></td>
                      {
                        (localStorage.getItem('user') === "admin@admin.com") &&
                        <td><button id={item.Name} onClick={(e)=>this.HandleRedirect(3,item.ID,e)} className="btn btn-default">Edit Genre</button></td>
                      }
                      <td><button id={item.Name} onClick={(e)=>this.HandleRedirect(4,item.ID,e)} className="btn btn-default">LeaderBoard</button></td>
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
         <Redirect to ={ "/CreateQuiz/"+ this.state.redirect }></Redirect>
       }
       {
         (this.state.redirect != 0 && this.state.index == 2) &&
         <Redirect to ={ "/ShowQuizzes/"+ this.state.redirect }></Redirect>
       }
       {
         (this.state.redirect != 0 && this.state.index == 3) &&
         <Redirect to ={ "/EditGenre/"+ this.state.redirect }></Redirect>
       }
       {
         (this.state.redirect != 0 && this.state.index == 4) &&
         <Redirect to ={ "/GenreLeaderBoard/"+ this.state.redirect }></Redirect>

       }

     </div>


    );
  }
}

export default ShowGenres;
