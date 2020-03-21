import {observable, computed, action} from 'mobx';

class ContactList {

  inputName = NaN;
  inputPhone = NaN;
  // @observable isAdd = false;

  @observable isLogin = false;

  CONTACTS = [
      {
          id: 1,
          name: 'Darth Vader',
          phoneNumber: '+250966666666',
          image: 'img/darth.gif'
      }, {
          id: 2,
          name: 'Princess Leia',
          phoneNumber: '+250966344466',
          image: 'img/leia.gif'
      }, {
          id: 3,
          name: 'Luke Skywalker',
          phoneNumber: '+250976654433',
          image: 'img/luke.gif'
      }, {
          id: 4,
          name: 'Chewbacca',
          phoneNumber: '+250456784935',
          image: 'img/chewbacca.gif'
      }
  ];

    addContact = (mass) => this.CONTACTS = mass;
    deleteContact = (id) => this.CONTACTS.splice(id, 1);  

  // toSaveChanges = (e) => {
  //   let value = e.target.value;
  //   if(e.target.name == 'name') {
  //     console.log(e.target.value);
  //     this.inputName = value;
  //     console.log(this.inputName);
  //   }
  //   else {
  //     this.inputPhone = value;
  //   }
  // }

  // @action addContact = (e) => {
  //   e.preventDefault();
  //   // min - 5 // max - 100000
  //   let randomId = Math.floor(Math.random() * (100000 - 5)) + 5;
    
  //   this.CONTACTS.push({
  //           id: randomId,
  //           name: this.inputName,
  //           phoneNumber: this.inputPhone,
  //           image: 'img/chewbacca.gif' 
  //         });

  // }

  // @action deleteContact = (id) => {
  //   let index = this.CONTACTS.findIndex((pr) => pr.id == id);
  //   this.CONTACTS.splice(index, 1);

  // }



    // @action toAddContact() {
    //   this.isAdd = !this.isAdd;
    // }
  
    @action changeisLogin(){
        this.isLogin = !this.isLogin;
    }
}

export default new ContactList();