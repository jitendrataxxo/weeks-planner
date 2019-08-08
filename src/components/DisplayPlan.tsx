import *as React from 'react';
import { Card, Icon, Button } from 'antd';
import { Data } from './helpers';

export const DisplayPlane: React.StatelessComponent<Props> = (props: Props) => {

  const data = {...props.data}

  return (
    <Card
      title={data.subject}
      actions={
        [
          <Button
            style={{background: '#35A1F4'}} 
            onClick={() => props.onDelete(data.id)}
          >
            <Icon type='delete' />
          </Button>,
          <Button
            style={{background: '#35A1F4'}} 
            onClick={() => props.onEdit(data.id)}
          >
            <Icon type="edit" />
          </Button>
        ]
      }
      size='small'
      extra={<span>S.No: {props.serialNo}</span>}
      style={{
        marginBottom: '5px',
        borderRadius: '10px',
        padding: '5px'
      }}
      draggable={true}
      onDragStart={props.onDragStart}
      id={data.id}
    >
      <i>Created At: {data.date}</i>
      < br/>
      {data.content}
    </Card>
  )
}

interface Props {
  data: Data,
  serialNo: number, 
  onDelete: (id: any) => void,
  onEdit: (id: any) => void,
  onDragStart: (e: any) => void
}