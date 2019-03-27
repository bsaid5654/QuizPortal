import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
class PlayQuiz extends Component{
  constructor(params){
    super(params);
    this.state = {
      formData:{
        QuizName:"",
        Score:0,
        GenreID:0,
        UserMail:"",
      },
      response : {},
      Questions : [],
      Index:0,
      Score:0,
      Check:false,
      ID : params.match.params.ID,
      response2:{
        A:false,
        B:false,
        C:false,
        D:false
      }
    }
    this.HandleSubmit = this.HandleSubmit.bind(this)
    this.HandleScore = this.HandleScore.bind(this)
    this.resetValue = this.resetValue.bind(this)
    this.handleOptions = this.handleOptions.bind(this)
  }

  componentDidMount() {
    const request = new Request('http://127.0.0.1:8001/ShowQuiz/' + this.state.ID);
    fetch(request)
      .then(response => response.json())
        .then(data => {
          this.setState({Questions: data.Ques})
          this.setState({response : data.Q})
        }).then(data1 =>{
          const request1 = new Request('http://127.0.0.1:8001/CheckMyQuiz/'+this.state.response.Name + '/' + localStorage.getItem('user'));
          fetch(request1)
            .then(response => response.json())
              .then(data2 => {
                this.setState({Check: data2})
              })
              });
  }

  HandleSubmit(event) {
    if(this.state.response2.A === this.state.Questions[this.state.Index].A &&
       this.state.response2.B === this.state.Questions[this.state.Index].B &&
       this.state.response2.C === this.state.Questions[this.state.Index].C &&
       this.state.response2.D === this.state.Questions[this.state.Index].D)
       {
         this.state.Score  = this.state.Score + 1
       }
    this.setState({Index:this.state.Index + 1})
    this.state.formData.QuizName = this.state.response.Name
    this.state.formData.Score = this.state.Score
    this.state.formData.GenreID = this.state.response.GenreID
    this.state.formData.UserMail = localStorage.getItem('user')
    console.log(this.state.formData)
    event.preventDefault();
    fetch('http://localhost:8001/SubmitScore', {
      method: 'POST',
      body: JSON.stringify(this.state.formData),
    })
    .then(response => response.json()).then(data => {
      this.setState({response: data})
      alert(this.state.response)
    });

  }

  HandleScore(e){
    console.log(this.state.response2)
    console.log(this.state.Questions)
     if(this.state.response2.A === this.state.Questions[this.state.Index].A &&
        this.state.response2.B === this.state.Questions[this.state.Index].B &&
        this.state.response2.C === this.state.Questions[this.state.Index].C &&
        this.state.response2.D === this.state.Questions[this.state.Index].D)
        {
          this.setState({Score:this.state.Score + 1})
        }
        this.setState({Index:this.state.Index + 1})
        document.getElementById("myForm").reset()
        this.resetValue()
  }

  resetValue(){
    this.state.response2.A = false
    this.state.response2.B = false
    this.state.response2.C = false
    this.state.response2.D = false
  }

  handleOptions(i){
    if(!(this.state.type)){
    if(i==1) this.state.response2.A = !this.state.response2.A
    if(i==2) this.state.response2.B = !this.state.response2.B
    if(i==3) this.state.response2.C = !this.state.response2.C
    if(i==4) this.state.response2.D = !this.state.response2.D
  }else{
    if(i==1){
      this.state.response2.A = true
      this.state.response2.B = false
      this.state.response2.C = false
      this.state.response2.D = false
    }
    if(i==2){
      this.state.response2.A = false
      this.state.response2.B = true
      this.state.response2.C = false
      this.state.response2.D = false
    }
    if(i==3){
      this.state.response2.A = false
      this.state.response2.B = false
      this.state.response2.C = true
      this.state.response2.D = false
    }
    if(i==4){
      this.state.response2.A = false
      this.state.response2.B = false
      this.state.response2.C = false
      this.state.response2.D = true
    }
  }
}

render(){
  if(this.state.Check == false){
  return(
      <div className="App">
        <header className="App-header">
          <h2 className="App-title">{this.state.response.Name}</h2>
        </header>
        {
          (this.state.Questions.length>this.state.Index) &&
            <form id = "myForm" className="formContainer">
            <br/>
              {
                this.state.Questions[this.state.Index].Audio != "" &&
                <video src={this.state.Questions[this.state.Index].Audio} alt="Loading..." controls></video>
              }
              {
                this.state.Questions[this.state.Index].Image != "" &&
                <img src={this.state.Questions[this.state.Index].Image} alt="Loading..."></img>
              }
              <br/>
              <label>{this.state.Questions[this.state.Index].Question}</label><br/>
              <label>A.{this.state.Questions[this.state.Index].OptionA}</label> <br/>
              <label>B.{this.state.Questions[this.state.Index].OptionB}</label> <br/>
              <label>C.{this.state.Questions[this.state.Index].OptionC}</label> <br/>
              <label>D.{this.state.Questions[this.state.Index].OptionD}</label> <br/>
              <input type = {this.state.Questions[this.state.Index].Type ? "radio":"checkbox"} className="checkbox-inline" name = "c" onClick={(e)=>this.handleOptions(1)}></input><label>A</label>
              <input type = {this.state.Questions[this.state.Index].Type ? "radio":"checkbox"} className="checkbox-inline" name = "c" onClick={(e)=>this.handleOptions(2)}></input><label>B</label>
              <input type = {this.state.Questions[this.state.Index].Type ? "radio":"checkbox"} className="checkbox-inline" name = "c" onClick={(e)=>this.handleOptions(3)}></input><label>C</label>
              <input type = {this.state.Questions[this.state.Index].Type ? "radio":"checkbox"} className="checkbox-inline" name = "c" onClick={(e)=>this.handleOptions(4)}></input><label>D</label>
            </form>
        }
        {
          this.state.Questions.length>this.state.Index+1 &&
          <button onClick={(e)=>{this.HandleScore(e)}} className="btn btn-default"> Next</button>
        }
        {
          this.state.Questions.length == this.state.Index+1 &&
          <button onClick={(e)=>{this.HandleSubmit(e)}} className="btn btn-default">Submit</button>
        }
        {/* <h2>Score:{this.state.Score}</h2> */}
        {
          this.state.Questions.length == this.state.Index &&
          <h2>Final Score:{this.state.Score}</h2>
        }
      </div>
      )
    }
    else{
      return(
        <div className="App">
          <header className="App-header">
            <h2 className="App-title">{this.state.response.Name}</h2>
            </header>
            <h3>Already Answered</h3>
        </div>
      )
    }
  }
}
export default PlayQuiz
