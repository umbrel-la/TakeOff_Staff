import React from 'react';
import { observer} from 'mobx-react';
import contactListModel from './store/contactList';
import { Table, Tag } from 'antd';
import Contact from './contact';
const { Column, ColumnGroup } = Table;
import styles from './contact.module.css';


@observer class Contacts extends React.Component {

  state = {
    displayedContacts: contactListModel.CONTACTS,
    isAdd: false,
    isChange: false,
    inputName: NaN,
    inputPhone: NaN
  }
    handleSearch = (e) => {
    let serchQuery = e.target.value.toLowerCase();
    let displayedContacts = contactListModel.CONTACTS.filter((el) => {
      let searchValue = el.name.toLowerCase();
      return searchValue.indexOf(serchQuery) !== -1;
    });
    this.setState({
      displayedContacts: displayedContacts
    });

  }
    deleteContact = (id) => {
      let index = this.state.displayedContacts.findIndex((pr) => pr.id == id);
      let newContacts = [...this.state.displayedContacts];
      newContacts.splice(index, 1);
      this.setState({
        displayedContacts: newContacts
      });
      contactListModel.deleteContact(index);
    }

      toAddContact = () => this.setState({isAdd: !this.state.isAdd});
  

    toSaveChanges = (e) => {
      let value = e.target.value;
      if(e.target.name == 'name') {
        this.setState({ inputName: value })
      }
      else {
        this.setState({ inputPhone: value });
      }
    }

    addContact = (e) => {
      e.preventDefault();
      // min - 5 // max - 100000
      let randomId = Math.floor(Math.random() * (100000 - 5)) + 5;
      let newContacts = Object.values({...this.state.displayedContacts});
      newContacts.push({
              id: randomId,
              name: this.state.inputName,
              phoneNumber: this.state.inputPhone,
              image: 'img/chewbacca.gif' 
            });
            this.setState({ 
                            displayedContacts: newContacts,
                            isAdd: !this.state.isAdd
                            });
            
      contactListModel.addContact(newContacts);
    }
    render(){
        return(
          <div className={styles.contacts}>
          <input type="text" placeholder="Поиск контакта..."
           className={styles.input_field} onChange={(e) => this.handleSearch(e)} />
          <ul className={styles.contacts_list}>
              {
                 this.state.displayedContacts.map((el) => {
                    return (
                      <Contact
                      key={el.id}
                      id={el.id}
                      name={el.name}
                      phoneNumber={el.phoneNumber}
                      image={el.image}
                      deleteContact={this.deleteContact}
                      />
                    );
                 })
              }
          </ul>
          {this.state.isAdd ?
            <form onSubmit={(e) => this.addContact(e)}>
            <input type="text"
                   name="name"
                   placeholder="Имя" 
                   className={styles.input_field}
                   onChange={(e) => this.toSaveChanges(e)}
                   />
            <input  type="text"
                    name="phone" 
                    placeholder="Телефон" 
                    className={styles.input_field}
                    onChange={(e) => this.toSaveChanges(e)}
                    /> <br />
            <button className={styles.btn_add}>Добавить</button>
            </form>
            :  
            <a onClick={this.toAddContact} 
                className={styles.btn_add}>
                  Добавить контакт</a>
        }
         
      </div>
        );
    }
}

export default Contacts;