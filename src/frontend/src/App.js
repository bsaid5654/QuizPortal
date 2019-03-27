import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Logout from './components/Logout'
import CreateGenre from './components/CreateGenre'
import ShowGenres from './components/ShowGenres'
import CreateQuiz from './components/CreateQuiz'
import ShowQuizzes from './components/ShowQuizzes'
import ShowQuiz from './components/ShowQuiz'
import EditQuiz from './components/EditQuiz'
import EditQuestion from './components/EditQuestion'
import EditGenre from './components/EditGenre'
import PlayQuiz from './components/PlayQuiz'
import CreateQns from './components/CreateQns'
import ViewUsers from './components/ViewUsers'
import MyQuiz from './components/Myquiz'
import GenreLeaderBoard from './components/GenreLeaderBoard'
import LeaderBoard from './components/LeaderBoard'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                <Link className="navbar-brand" to={'/'}>React App</Link>
                </div>
                  {
                    (localStorage.getItem('user') === "admin@admin.com") &&
                    <ul className="nav navbar-nav">
                      <li><Link to={'/CreateGenre'}>CreateGenre</Link></li>
                      <li><Link to={'/ViewUsers'}>Users</Link></li>
                      {/* <li><Link to={'/'}></Link></li> */}
                  </ul>
                  }
                  {
                    !(localStorage.getItem('user')) &&
                    <ul className="nav navbar-nav">
                      <li><Link to={'/Login'}>Login</Link></li>
                      <li><Link to = {'/Signup'}>Signup</Link></li>
                    </ul>
                  }
                  {
                    localStorage.getItem('user') &&
                    <ul className="nav navbar-nav">
                    <li><Link to='/Myquiz'>MyQuiz</Link></li>
                    <li><Link to={'/ShowGenres'}>Play Quiz</Link></li>
                    <li><Link to={'/LeaderBoard'}>LeaderBoard</Link></li>
                    <li><Link to={'/Logout'}>Logout</Link></li>
                    </ul>
                  }
              </div>
            </nav>
            <Switch>
                 <Route exact path='/' component={Home} />
                 <Route exact path='/Login' component={Login} />
                 <Route exact path='/Signup' component={Register} />
                 <Route exact path='/Logout' component={Logout} />
                 <Route exact path='/ShowGenres' component={ShowGenres} />
                 <Route exact path='/CreateGenre' component={CreateGenre} />
                 <Route exact path='/CreateQns/:ID' component={CreateQns} />
                 <Route exact path='/CreateQuiz/:GenreID' component={CreateQuiz} />
                 <Route exact path='/ShowQuizzes/:GenreID' component={ShowQuizzes} />
                 <Route exact path='/PlayQuiz/:ID' component={PlayQuiz} />
                 <Route exact path='/ShowQuiz/:ID' component={ShowQuiz} />
                 <Route exact path='/EditGenre/:ID' component={EditGenre} />
                 <Route exact path='/EditQuiz/:ID' component={EditQuiz} />
                 <Route exact path='/EditQuestion/:ID' component={EditQuestion} />
                 <Route exact path='/ViewUsers' component={ViewUsers}/>
                 <Route exact path='/Myquiz' component={MyQuiz}/>
                   <Route exact path='/LeaderBoard' component={LeaderBoard}/>
                 <Route exact path='/GenreLeaderBoard/:ID' component={GenreLeaderBoard}/>
          </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
