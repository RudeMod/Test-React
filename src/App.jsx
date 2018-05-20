import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import TimerControl from './TimerControl';
import TaskLog from './TaskLog';

class App extends Component {

  state = {
    dataList: JSON.parse(localStorage.getItem("data")) || [],
  };
  
  addNewTask = (data) => {
    var dataList = this.state.dataList;
    //Если не закрыта последняя запись - отменяем запуск
    if ((dataList.length) && !dataList[dataList.length-1].stopDate) return;
    
    dataList.push({
      taskName: data.taskName,
      projectName: data.projectName,
      startDate: new Date(),
      stopDate: 0,
    });
    
    this.setState({dataList: dataList});
    localStorage.setItem("data", JSON.stringify(dataList));
  };
  
  closeTask = () => {
    var dataList = this.state.dataList;
    
    dataList[dataList.length-1].stopDate = new Date();
    this.setState({dataList: dataList});
    localStorage.setItem("data", JSON.stringify(dataList));
  };
  
  render() {
    return(
      <div className="container mt-4">
        <TimerControl 
          lastRec={this.state.dataList[this.state.dataList.length - 1]}
          addNewTask = {this.addNewTask}
          closeTask = {this.closeTask}
        />
        <TaskLog 
          data={this.state.dataList} 
          addNewTask = {this.addNewTask}
        />
      </div>
    )
  };
};

export default App;