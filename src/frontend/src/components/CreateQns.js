import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
class CreateQns extends Component{
  constructor(params){
    super(params)
    this.state = {
      formData:{
        Question:"",
        OptionA :"",
        OptionB :"",
        OptionC :"",
        OptionD :"",
        A:false,
        B:false,
        C:false,
        D:false,
        Type:false,
        Image:"",
        Audio:"",
        QuizID : params.match.params.ID>>>0
      },
      type:false,
      audio:0,
      back:0
    }
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleQuestion = this.handleQuestion.bind(this)
      this.handleOptions = this.handleOptions.bind(this)
      this.changeType = this.changeType.bind(this)
  }

  handleSubmit(event){
    event.preventDefault();
    console.log(this.state.formData)
    this.state.formData.Type = this.state.type;
    fetch('http://localhost:8001/AddQuestion',{
      method: 'POST',
      body: JSON.stringify(this.state.formData),
    }).then(response => response.json()).then(data => { alert(data) })
  }

  handleQuestion(i,event){
    if(i==1){this.state.formData.Question = event.target.value}
    if(i==2){this.state.formData.OptionA = event.target.value}
    if(i==3){this.state.formData.OptionB = event.target.value}
    if(i==4){this.state.formData.OptionC = event.target.value}
    if(i==5){this.state.formData.OptionD = event.target.value}
    if(i==6){this.state.formData.Audio = event.target.value}
    if(i==7){this.state.formData.Image = event.target.value}
    console.log(this.state.formData.Image)
  }

  changeType(e,i){
    if(i==1) this.setState({type:false})
    else if(i==2) this.setState({type:true})
    document.getElementById("myForm").reset()
    this.state.formData.A = false
    this.state.formData.B = false
    this.state.formData.C = false
    this.state.formData.D = false
  }

  handleOptions(i){
    if(!(this.state.type)){
    if(i==1) this.state.formData.A = !this.state.formData.A
    if(i==2) this.state.formData.B = !this.state.formData.B
    if(i==3) this.state.formData.C = !this.state.formData.C
    if(i==4) this.state.formData.D = !this.state.formData.D
  }else{
    if(i==1){
      this.state.formData.A = true
      this.state.formData.B = false
      this.state.formData.C = false
      this.state.formData.D = false
    }
    if(i==2){
      this.state.formData.A = false
      this.state.formData.B = true
      this.state.formData.C = false
      this.state.formData.D = false
    }
    if(i==3){
      this.state.formData.A = false
      this.state.formData.B = false
      this.state.formData.C = true
      this.state.formData.D = false
    }
    if(i==4){
      this.state.formData.A = false
      this.state.formData.B = false
      this.state.formData.C = false
      this.state.formData.D = true
    }
  }
}

changeA(e,i){
  if(i==1) {
    this.setState({audio:2});
    this.state.formData.Audio = "";
  }
  else if(i==2) {
    this.setState({audio:1})
    this.state.formData.Image = "";
  }
}


render(){
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Add Question</h1>
      </header>
      <div className="container">
        <input type = "radio" name="CheckType" onChange={(e)=>this.changeType(e,2)}/><label>Radio</label>
        <input type = "radio" name="CheckType" onChange={(e)=>this.changeType(e,1)} defaultChecked/><label>Checkbox</label><br/>
        <input type = "radio" name="Audio" onChange={(e)=>this.changeA(e,2)}/><label>Audio</label>
        <input type = "radio" name="Audio" onChange={(e)=>this.changeA(e,1)}/><label>Image</label>
        <form onSubmit={this.handleSubmit} id="myForm">
          <div className="form-group">
              { this.state.audio == 1 &&
                <div className="form-group">
              <label>Url off Audio</label>
              <input type="text" className="form-control" value={this.state.Audio} onChange={(e)=>this.handleQuestion(6,e)}/>
              </div>
            }
              {this.state.audio == 2 &&
                <div className="form-group">

              <label>Url off Image</label>
              <input type="text" className="form-control" value={this.state.Image} onChange={(e)=>this.handleQuestion(7,e)}/>
              </div>
            }
              <label>Question</label>
              <input type="text" className="form-control" required value={this.state.Question} onChange={(e)=>this.handleQuestion(1,e)}/>
              <label>OptionA</label>
              <input type="text" className="form-control" required value={this.state.OptionA} onChange={(e)=>this.handleQuestion(2,e)}/>
              <label>OptionB</label>
              <input type="text" className="form-control" required value={this.state.OptionB} onChange={(e)=>this.handleQuestion(3,e)}/>
              <label>OptionC</label>
              <input type="text" className="form-control" required value={this.state.OptionC} onChange={(e)=>this.handleQuestion(4,e)}/>
              <label>OptionD</label>
              <input type="text" className="form-control" required value={this.state.OptionD} onChange={(e)=>this.handleQuestion(5,e)}/>
              <label>Answer A</label>
              <input type = {(this.state.type)?"radio":"checkbox"} name = "c" className="form-control" onChange={(e)=>this.handleOptions(1)} ></input>
              <label>Answer B</label>
              <input type = {(this.state.type)?"radio":"checkbox"} name = "c" className="form-control" onChange={(e)=>this.handleOptions(2)}></input>
              <label>Answer C</label>
              <input type = {(this.state.type)?"radio":"checkbox"} name = "c" className="form-control" onChange={(e)=>this.handleOptions(3)}></input>
              <label>Answer D</label>
              <input type = {(this.state.type)?"radio":"checkbox"} name = "c" className="form-control" onChange={(e)=>this.handleOptions(4)}></input>
           </div>
              <button type="submit" className="btn btn-default">Submit</button>
        </form>
      </div>
      <button onClick={(e)=>{this.setState({back:1})}} className="btn btn-default">Back</button>
      {
        this.state.back != 0 &&
        <Redirect to = {"/ShowQuiz/" + this.state.formData.QuizID}></Redirect>
      }
    </div>
  )
 }
}

export default CreateQns
