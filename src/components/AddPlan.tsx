import *as  React from 'react';
import { Card, Input, Button } from 'antd'
import { Data, DATA, updateLists } from './helpers';
import { type } from 'os';

export default class AddPlane extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      data: props.data ? props.data : DATA
    }

    this.init();
  }


  init() {
    if (!localStorage.getItem('data')) {
      const array = new Array();
      localStorage.setItem('data', JSON.stringify(array))
    }
  }

  onChange = (e: any) => {
    const data = { ...this.state.data }
    if (e.target.name === 'subject') {
      data['subject'] = e.target.value;
    } else {
      data['content'] = e.target.value;
    }
    this.setState({ data })
  }

  onSubmit = () => {
    var data = this.state.data
    var dataList = JSON.parse(localStorage.getItem('data') || '[]')
    if(data.id) {
      data.isEdit = false
      const dataToUpdate: Data = dataList.find((obj: any) => {
        if(obj.id === data.id){
          return obj;
        }
      })
      dataList[dataList.indexOf(dataToUpdate)] = data
    } else {
      data.id = Math.random().toString(36).substring(7)
      dataList.push(data)
    }
    updateLists(dataList)
    localStorage['data'] = JSON.stringify(dataList)
    this.setState({ data: DATA })
  }

  render() {

    const data = this.state.data;
    return (
      <div style={{marginBottom: '40px', borderStyle: 'dashed'}}>
        <form>
          <Card
            title={
              <Input placeholder='Enter Subject'
                name='subject'
                value={data.subject}
                onChange={(e) => this.onChange(e)}
              />
            }
            size='small'
          >
            <Input.TextArea
              value={data.content}
              name='content'
              onChange={(e) => this.onChange(e)}
            >
            </Input.TextArea>
          </Card>
          <Button
            style={{ float: 'right', background: '#35A1F4'}}
            onClick={this.onSubmit}
            type='primary'
          >
            {data.isEdit ? 'Update' : 'Add Task'}
        </Button>
        </form>
      </div>
    )
  }
}

interface Props {
  data?: Data
}

interface State {
  data: Data
};
