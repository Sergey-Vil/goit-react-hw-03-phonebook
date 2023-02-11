import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactsForm from './ContactsForm/ContactsForm';
import ContactsList from './ContactsList/ContactsList';
import ContactsFilter from './ContactsFilter/ContactsFilter';
import css from './contactsBook.modale.css';

export class ContactsBook extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  componentDidMount() {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (savedContacts) {
      this.setState({ contacts: savedContacts });
    }
  }
  componentDidUpdate(_, prevState) {
    if (prevState.contacts.length !== this.state.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  addContacts = data => {
    const newContact = { ...data, id: nanoid() };

    this.state.contacts.some(
      contact =>
        contact.name.toLowerCase().trim() ===
          newContact.name.toLowerCase().trim() ||
        contact.number.trim() === newContact.number.trim()
    )
      ? alert(`${newContact.name} already exists`)
      : this.setState(prevState => ({
          contacts: [...prevState.contacts, newContact],
        }));
  };
  changeFilter = e => {
    this.setState({ filter: e.target.value.trim().toString() });
  };
  findContacts = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };
  render() {
    const { filter } = this.state;
    return (
      <div className={css.phonebook}>
        <h2 className={css.title}>Phonebook</h2>
        <ContactsForm onSubmit={this.addContacts} />
        <h2 className={css.title}>Contacts</h2>
        <ContactsFilter filter={filter} onChangeFilter={this.changeFilter} />
        <ContactsList
          contacts={this.findContacts()}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default ContactsBook;
