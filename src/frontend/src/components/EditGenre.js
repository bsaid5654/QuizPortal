import React,{ Component } from 'react'
import { Redirect } from 'react-router-dom'
class EditGenre extends Component{
  constructor(params) {
    super(params);
    this.state = {
      response1:"",
      response2:"",
      formData: {
        Name:""
    },
    ID: params.match.params.ID
  },
    this.handleQChange = this.handleQChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  handleSubmit (event) {
      event.preventDefault();
      fetch('http://localhost:8001/EditGenre/'+this.state.ID, {
        method: 'PUT',
        body: JSON.stringify(this.state.formData),
      })
      .then(response => response.json()).then(data => {
        this.setState({response1: data})
        alert(this.state.response1)
      });
    }

  componentDidMount(){
    const request = new Request('http://127.0.0.1:8001/ShowGenre/'+ this.state.ID);
    fetch(request)
      .then(response => response.json())
        .then(data =>{
          this.setState({response2: data.Name})
          this.setValue();
          }
        );

  }

  setValue(){
    this.state.formData.Name = this.state.response2;
    console.log(this.state.formData.Name)
  }

  handleQChange(event) {
      this.state.formData.Name = event.target.value;
    }

    render(){
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Edit Genre</h1>
          </header>
          <br/><br/>
          <div className="container">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                  <label>Genre Name</label>
                  <input type="text" required className="form-control" defaultValue={this.state.response2} onChange={this.handleQChange}/>
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
export default EditGenre
