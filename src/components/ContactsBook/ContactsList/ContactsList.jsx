import React from 'react';
import PropTypes from 'prop-types';
import css from './contactsList.module.css';

export default function ContactsList({ contacts, deleteContact }) {
  const elements = contacts.map(contact => (
    <li key={contact.id}>
      <p>
        &#8226; {contact.name}: {contact.number}
      </p>
      <button
        type="button"
        className={css.delete__btn}
        onClick={() => deleteContact(contact.id)}
      >
        Delete
      </button>
    </li>
  ));
  return <ul>{elements}</ul>;
}
ContactsList.propType = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
  deleteContact: PropTypes.func.isRequired,
};

ContactsList.defaultProps = { contacts: [] };
