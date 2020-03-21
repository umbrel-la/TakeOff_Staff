import React from 'react';
import Form from './form';
import Contacts from './contacts';
import styles from './app.module.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { observer } from 'mobx-react';
import contactListModel from './store/contactList';

import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

 @observer class App extends React.Component{
    render(){
        const { Header, Content, Footer } = Layout;
        // console.log(contactListModel.isLogin);
        return (
            <Router>
            <div className={styles.App}>
                <Layout className="layout">
                    <Header>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                    >
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                    </Header>
                    <Content style={{ padding: '0 50px', height: '86vh' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-content">
                    <Switch>
                      <Route exact path="/">
                          {
                            !contactListModel.isLogin ?
                            
                            <Form /> 
                            :
                            <Contacts />
                          }
                      </Route>
                      <Route exact path="/contacts">
                          <Contacts /> 
                      </Route> 
                    </Switch>
                    </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>     
            </div>
            </Router>
        );
    }
}

export default App;

