import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { observer } from 'mobx-react';
import contactListModel from './store/contactList';

@observer class Forma extends React.Component{

  
render(){
    const layout = {
        labelCol: {
          offset: 3,
          span: 8,
        },
        wrapperCol: {
          span: 3,
        },
      };
      const tailLayout = {
        wrapperCol: {
          offset: 8,
          span: 9,
        },
      };
      const onFinish = values => {
        console.log('Success:', values);
        fetch('/api/login',{
          method: 'POST'
        })
          .then(res => res.json())
          .then(userToken => localStorage.setItem('userToken', userToken.token));
          contactListModel.changeisLogin();
          fetch('/api/posts',{
            method: 'POST',
            headers: ({
              Authorization: `${values.username} ${localStorage.getItem('userToken')}`
            })
          })
            .then(response => console.log(response));
      };

      const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
      };


      
    return(
        <Form
            {...layout}
            name="basic"
            initialValues={{
            remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
            label="Username"
            name="username"
            rules={[
                {
                required: true,
                message: 'Please input your username!',
                },
            ]}
            >
            <Input />
            </Form.Item>
    
            <Form.Item
            label="Password"
            name="password"
            rules={[
                {
                required: true,
                message: 'Please input your password!',
                },
            ]}
            >
            <Input.Password />
            </Form.Item>
    
            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
            </Form.Item>
    
            <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
            </Form.Item>
      </Form>
    );
}

}

export default Forma;