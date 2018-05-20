import React, {Component} from 'react';
import FaPlay from 'react-icons/lib/fa/play';
import 'bootstrap/dist/css/bootstrap.min.css';

import './TaskLog.css';

class TaskLog extends Component {
  
  copyStart = (data) => {
    this.props.addNewTask(data);
  }
  
  formatTime = (time) => {
    if (!time) return "00:00:00";
    
    let hours, minutes, seconds;
    let returnStr = "";
    
    hours = Math.floor(time / 1000 / 60 / 60);
    minutes = (new Date(time)).getMinutes();
    seconds = (new Date(time)).getSeconds();
    
    returnStr = [hours, minutes, seconds].map(function (part) {
      return part < 10 ? "0" + part : part;
    }).join(":");
    
    return returnStr;
  };
  
  render(){
    let lastDateHeader = 0;
    
    const DateHeader = (props) => {
      let todayDay = (new Date()).setHours(0,0,0,0);
      
      if (props.startDay === todayDay) {
        return(
          <div className="row mt-2" >
            <h2>Today</h2>
          </div>
        )
      }
      else {
        return(
          <div className="row mt-2">
            <h2>{(new Date(props.startDay)).toDateString().slice(0, -4)}</h2>
          </div>
        )
      }
    }
    
    return(
      <div className="container">
        {this.props.data.slice(0).reverse().map( (row, index) => {
          //Не отображаем не закрытую запись
          if (!row.stopDate) {return("");}
        
          let spendTime, timeRange, 
              formatStart, formatStop;
              
          let startDate = new Date(row.startDate);
          let stopDate = new Date(row.stopDate);

          let addHead = false;
          let startDay = new Date(startDate).setHours(0,0,0,0);
          
          if (lastDateHeader !== startDay) {
            addHead = true;
            lastDateHeader = startDay;
          }
          
          spendTime = this.formatTime(stopDate - startDate);
          
          formatStart = startDate.toTimeString().slice(0, 5);
          formatStop = stopDate.toTimeString().slice(0, 5);
          
          timeRange = formatStart + " - " + formatStop;
          
          return(
            <div key={index} >
              {(addHead) ? <DateHeader startDay={startDay}/> : ""}
              
              <div className="row">
                <div className="col-6">{row.taskName}</div>
                <div className="col-2 position-relative">
                  <span className="projectName">
                    {row.projectName}
                  </span>
                  <FaPlay 
                    className = "position-absolute FaPlay" 
                    onClick={this.copyStart.bind(this, row)}
                  />
                </div>
                <div className="col-2 text-right">{spendTime}</div>
                <div className="col-2 text-muted">
                  <small>{timeRange}</small>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  };
}

export default TaskLog;