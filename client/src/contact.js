import React from 'react';
import styles from './contact.module.css';

export default class extends React.Component {
    render(){
        return (
            <li className={styles.contact}>
            <img className={styles.contact_image} src={this.props.image} width="60px" height="60px" />
            <div className={styles.contact_info}>
                <div className={styles.contact_name}> {this.props.name} </div>
                <div className={styles.contact_number}> {this.props.phoneNumber} </div>
            </div>
            <button onClick={() => this.props.deleteContact(this.props.id)}
                className={styles.btn_delete}>
                    <span className={styles.text}>Удалить</span>
            </button> 
        </li> 

        );
    }
}