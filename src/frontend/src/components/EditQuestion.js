import React,{ Component } from 'react'
import { Redirect } from 'react-router-dom'
class EditQuestion extends Component{
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
        Image:"",
        Audio:"",
        Type:false,
        QuizID : 0
      },
      response2:{},
      back:0,
      ID : params.match.params.ID,
      type : false
    }
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleQuestion = this.handleQuestion.bind(this)
      this.handleOptions = this.handleOptions.bind(this)
      this.setValue = this.setValue.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    this.setValue();
    console.log(this.state.formData);
    fetch('http://localhost:8001/EditQuestion/' + this.state.ID,{
      method: 'PUT',
      body: JSON.stringify(this.state.formData),
    }).then(response => response.json()).then(data => { alert(data) })
  }

componentDidMount(){
  const request = new Request('http://127.0.0.1:8001/ShowQuestion/'+ this.state.ID);
  fetch(request)
    .then(response => response.json())
      .then(data =>{
        this.setState({response2: data});
        this.setValue();
        console.log("sai");
        }
      );
}

setValue(){
  this.state.formData.Question = this.state.response2.Question
  this.state.formData.OptionA = this.state.response2.OptionA
  this.state.formData.OptionB = this.state.response2.OptionB
  this.state.formData.OptionC = this.state.response2.OptionC
  this.state.formData.OptionD = this.state.response2.OptionD
  this.state.formData.A = this.state.response2.A
  this.state.formData.B = this.state.response2.B
  this.state.formData.C = this.state.response2.C
  this.state.formData.D = this.state.response2.D
  this.state.formData.Type = this.state.response2.Type
  this.state.formData.QuizID = this.state.response2.QuizID
  this.state.formData.Audio = this.state.response2.Audio
  this.state.formData.Image = this.state.response2.Image
  this.setState({type:this.state.response2.Type})
}

  handleQuestion(i,event){
    if(i==1){this.state.response2.Question = event.target.value}
    if(i==2){this.state.response2.OptionA = event.target.value}
    if(i==3){this.state.response2.OptionB = event.target.value}
    if(i==4){this.state.response2.OptionC = event.target.value}
    if(i==5){this.state.response2.OptionD = event.target.value}
    if(i==6){this.state.response2.Audio = event.target.value}
    if(i==7){this.state.response2.Image = event.target.value}
  }

  handleOptions(i){
    if(!(this.state.type)){
    if(i==1) this.state.response2.A = !(this.state.response2.A)
    if(i==2) this.state.response2.B = !(this.state.response2.B)
    if(i==3) this.state.response2.C = !(this.state.response2.C)
    if(i==4) this.state.response2.D = !(this.state.response2.D)
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
  console.log(this.state.response2.C)
}

render(){
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Add Question</h1>
      </header>
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            { this.state.response2.Audio != "" &&
              <div className="form-group">
            <label>Url off Audio</label>
            <input type="text" className="form-control" defaultValue={this.state.response2.Audio} onChange={(e)=>this.handleQuestion(6,e)}/>
            </div>
          }
            {this.state.response2.Image != "" &&
              <div className="form-group">
              <label>Url off Image</label>
              <input type="text" className="form-control" defaultValue={this.state.response2.Image} onChange={(e)=>this.handleQuestion(7,e)}/>
            </div>
          }

              <label>Question</label>
              <input type="text" required className="form-control" defaultValue={this.state.response2.Question} onChange={(e)=>this.handleQuestion(1,e)}/>
              <label>OptionA</label>
              <input type="text" required className="form-control" defaultValue={this.state.response2.OptionA} onChange={(e)=>this.handleQuestion(2,e)}/>
              <label>OptionB</label>
              <input type="text" required className="form-control" defaultValue={this.state.response2.OptionB} onChange={(e)=>this.handleQuestion(3,e)}/>
              <label>OptionC</label>
              <input type="text" required className="form-control" defaultValue={this.state.response2.OptionC} onChange={(e)=>this.handleQuestion(4,e)}/>
              <label>OptionD</label>
              <input type="text" required className="form-control" defaultValue={this.state.response2.OptionD} onChange={(e)=>this.handleQuestion(5,e)}/>
              <label>Answer A</label>
              <input type = {(this.state.type)?"radio":"checkbox"} className="form-control" name="c" defaultChecked={this.state.response2.A} onChange={(e)=>this.handleOptions(1)} ></input>
              <label>Answer B</label>
              <input type = {(this.state.type)?"radio":"checkbox"} className="form-control" name="c" defaultChecked={this.state.response2.B} onChange={(e)=>this.handleOptions(2)}></input>
              <label>Answer C</label>
              <input type = {(this.state.type)?"radio":"checkbox"} className="form-control" name="c" defaultChecked={this.state.response2.C} onChange={(e)=>this.handleOptions(3)}></input>
              <label>Answer D</label>
              <input type = {(this.state.type)?"radio":"checkbox"} className="form-control" name="c" defaultChecked={this.state.response2.D} onChange={(e)=>this.handleOptions(4)}></input>
           </div>
              <button type="submit" className="btn btn-default">Submit</button>
        </form>
      </div>
      <button onClick={(e)=>{this.setState({back:1})}} className="btn btn-default">Back</button>
    {
      this.state.back != 0 &&
      <Redirect to = {"/ShowQuiz/" + this.state.response2.QuizID}></Redirect>
    }
  </div>

  )
 }

}
export default EditQuestion
