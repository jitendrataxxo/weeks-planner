import *as  React from 'react';
import '../assets/scss/App.scss';
import { Card, Row, Col } from 'antd'
import AddPlane from './AddPlan';
import { DisplayPlane } from './DisplayPlan';
import { Data, dataList$, STATUS, completedList$, progressList$, todoList$, allList$, updateLists } from './helpers';

export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      dataList: [],
      allList: [],
      todoList: [],
      progressList: [],
      completedList: [],
    }

  }

  componentDidMount() {
    dataList$.subscribe(dataList => this.setState({ dataList }))
    allList$.subscribe(allList => this.setState({ allList }))
    todoList$.subscribe(todoList => this.setState({ todoList }))
    progressList$.subscribe(progressList => this.setState({ progressList }))
    completedList$.subscribe(completedList => this.setState({ completedList }))
  }

  onDelete = (id: any) => {
    let dataList = this.state.dataList
    const dataToDelete: any = dataList.find(obj => {
      if (obj.id === id) {
        return obj
      }
    })

    dataList.splice(this.state.dataList.indexOf(dataToDelete), 1)
    localStorage['data'] = JSON.stringify(dataList)
    updateLists(dataList)
  }

  onEdit = (id: any) => {
    let dataList = this.state.dataList
    dataList.find(obj => {
      if (obj.id === id) {
        obj.isEdit = true;
      }
    })
    localStorage['data'] = JSON.stringify(dataList)
    updateLists(dataList)
  }

  onDrop = (e: any, status: string) => {
    e.preventDefault();
    var data = e.dataTransfer.getData("text");
    let dataList = this.state.dataList
    e.target.appendChild(document.getElementById(data));
    dataList.find((obj: any) => {
      if (obj.id === data) {
        obj.status = status;
      }
    })
    localStorage['data'] = JSON.stringify(dataList)
  }

  allowDrop = (e: any) => {
    // console.log(e)
    e.preventDefault();
  }

  drag = (e: any) => {
    console.log(e.target.id, 'draging')
    e.dataTransfer.setData("text", e.target.id)
  }

  render() {
    return (
      <Card 
        title="Weeks Planner"
        style={{background: '#989393', padding: '10px'}}
      >
        <Row>
          <Col span={6}>
            <Card title='All' style={{background: '#D0CACA'}}>
              {this.state.allList && this.state.allList.map((obj: Data, index) => {
                if (obj.isEdit) {
                  return <AddPlane data={obj} key={obj.id} />
                } else {
                  return <DisplayPlane
                    data={obj} serialNo={index + 1}
                    key={obj.id}
                    onDelete={this.onDelete}
                    onEdit={this.onEdit}
                    onDragStart={(e: any) => this.drag(e)}
                  />
                }
              })}
              <AddPlane />
            </Card>
          </Col>
          <Col span={6} onDrop={(e) => this.onDrop(e, STATUS.TO_DO)} onDragOver={(e) => this.allowDrop(e)}>
            <Card title='To Do' style={{background: '#D0CACA'}}>
              {this.state.todoList && this.state.todoList.map((obj: Data, index) => {
                if (obj.isEdit) {
                  return <AddPlane data={obj} key={obj.id} />
                } else {
                  return <DisplayPlane
                    data={obj} serialNo={index + 1}
                    key={obj.id}
                    onDelete={this.onDelete}
                    onEdit={this.onEdit}
                    onDragStart={(e: any) => this.drag(e)}
                  />
                }
              })}
            </Card>
          </Col>
          <Col span={6} onDrop={(e) => this.onDrop(e, STATUS.PROGRESS)} onDragOver={(e) => this.allowDrop(e)}>
            <Card title='Progress' style={{background: '#D0CACA'}}>
              {this.state.progressList && this.state.progressList.map((obj: Data, index) => {
                if (obj.isEdit) {
                  return <AddPlane data={obj} key={obj.id} />
                } else {
                  return <DisplayPlane
                    data={obj} serialNo={index + 1}
                    key={obj.id}
                    onDelete={this.onDelete}
                    onEdit={this.onEdit}
                    onDragStart={(e: any) => this.drag(e)}
                  />
                }
              })}
            </Card>
          </Col>
          <Col span={6} onDrop={(e) => this.onDrop(e, STATUS.COMPLETED)} onDragOver={(e) => this.allowDrop(e)}>
            <Card title='Completed' style={{background: '#D0CACA'}}>
              {this.state.completedList && this.state.completedList.map((obj: Data, index) => {
                if (obj.isEdit) {
                  return <AddPlane data={obj} key={obj.id} />
                } else {
                  return <DisplayPlane
                    data={obj} serialNo={index + 1}
                    key={obj.id}
                    onDelete={this.onDelete}
                    onEdit={this.onEdit}
                    onDragStart={(e: any) => this.drag(e)}
                  />
                }
              })}
            </Card>
          </Col>
        </Row>
      </Card>
    )
  }
}

interface Props {

}

interface State {
  dataList: Data[];
  allList: Data[];
  todoList: Data[];
  progressList: Data[];
  completedList: Data[];
}
