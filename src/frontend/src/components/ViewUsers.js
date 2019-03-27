import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
class ViewUsers extends Component{
    constructor(){
      super();
      this.state={
        response:[]
      }
      this.HandleDeleteUser = this.HandleDeleteUser.bind(this)
    }

    componentDidMount(){
      const request = new Request('http://127.0.0.1:8001/ViewUsers');
      fetch(request)
        .then(response => response.json())
          .then(data => {
            this.setState({response: data})
            });
    }

    HandleDeleteUser(i,e) {
      fetch('http://localhost:8001/DeleteUser/'+ i, {
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
              <h2 className="App-title">View Users</h2>
            </header>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>{this.state.response.map((item, key)=> {
                  if(item.Email!="admin@admin.com") {
                   return (
                      <tr key = {key}>
                          <td>{item.ID}</td>
                          <td>{item.Name}</td>
                          <td>{item.Email}</td>
                          {
                            (localStorage.getItem('user') === "admin@admin.com") &&
                             <td><button id={item.Name} className = "btn btn-default" onClick={(e)=>this.HandleDeleteUser(item.ID,e)}>Delete User</button></td>
                          }
                      </tr>
                  )
                    }
                 })}
              </tbody>
           </table>
           {
             !(localStorage.getItem('user')==="admin@admin.com") &&
               <Redirect to = '/'></Redirect>
           }

         </div>
    )
  }
}
export default ViewUsers
