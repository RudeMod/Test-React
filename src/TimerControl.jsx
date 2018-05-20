import React, {Component} from 'react';

import config from './config';

class StartButton extends Component {
  render() {
    return(
      <button className="btn btn-success w-100">
        {"Start"}
      </button>
    )
  }
}

class StopButton extends Component {
  render() {
    return(
      <button className="btn btn-danger w-100" >
        {"Stop"}
      </button>
    )
  }
}

class TimerControl extends Component {

  getInitialState = () => {
    return {
      data: {
        taskName: "",
        projectName: "",
      },
      run: false,
      timerObj: null,
      time: 0,
      startTime: 0,
    };
  }
    
  state = this.getInitialState();
  
  componentDidMount() {
    this.StartOrStop();
  }
  
  componentWillReceiveProps(nextProps) {
    this.StartOrStop(nextProps);
  }
  
  StartOrStop(props = this.props) {
    if (props.lastRec && !props.lastRec.stopDate) {
      this.startTimer(props);
    }
    else {
      this.stopTimer();
    }
  }

  startTimer = (props) => {
    this.setState({run: true});
    
    let newData = {
      taskName: props.lastRec.taskName,
      projectName: props.lastRec.projectName,
    }
    
    this.setState({data: newData});
    
    this.setState({startTime : new Date(props.lastRec.startDate)}, () => {
      this.setState({timerObj : setInterval(()=>{
        this.setState({time : ((new Date()) - this.state.startTime)});
      }, 500)});
    });
  }
  
  stopTimer = () => {
    clearInterval(this.state.timerObj);
    this.setState(this.getInitialState());
  }
  
  onClickButtonStartStopHandle = () => {
    this.setState({run: !this.state.run}, () => {
      if (this.state.run) {
        this.props.addNewTask(this.state.data);
      }
      else {
        this.props.closeTask();
      }
    });
  }
  
  onChangeHandler = (event) => {
    if (this.state.run) return false;
    let data = this.state.data;
    let target = event.target;
    
    data[target.name] = target.value;
    this.setState({data: data});
  }
  
  formatTime = (time) => {
    if (!time) return 0;
    
    let hours, minutes, seconds;
    let returnStr = "";
    
    hours = Math.floor(time / 1000 / 60 / 60);
    minutes = (new Date(time)).getMinutes();
    seconds = (new Date(time)).getSeconds();
    
    if (hours) returnStr += hours+"h ";
    if (minutes) returnStr += minutes+" min ";
    returnStr += seconds+" sec";
    
    return returnStr;
  }
  
  render() {
    return(
      <div className="form-row">
        <div className="col-6">
          <input
            type="text" 
            name="taskName" 
            className="form-control" 
            value={this.state.data.taskName}
            onChange={this.onChangeHandler}
            placeholder="What are you working on?"
          />
        </div>
        <div className="col-2">
          <select 
            className="form-control" 
            name="projectName" 
            value={this.state.data.projectName}
            onChange={this.onChangeHandler}
          >
            <option disabled value="" key={-1}>{"select project"}</option>
            {config.projectList.map( (val, index) => (
              <option key={index}>{val}</option>
            ))}
          </select>
        </div>
        <div className="col-2">
          <input 
            type="text" 
            className="text-right form-control" 
            value={this.formatTime(this.state.time)}
          />
        </div>
        <div className="col-2">
          <div onClick={this.onClickButtonStartStopHandle}>
            { this.state.run ? <StopButton /> : <StartButton /> }
          </div>
        </div>
      </div>
    )
  }
};

export default TimerControl;