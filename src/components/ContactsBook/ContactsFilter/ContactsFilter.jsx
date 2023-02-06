import React from 'react';
import PropTypes from 'prop-types';
import css from './contactsFilter.css';

function ContactsFilter({ filter, onChangeFilter }) {
  return (
    <div className={css.filter}>
      <p className={css.title__filter}>Find contacts by name</p>
      <input
        onChange={onChangeFilter}
        name="filter"
        type="text"
        value={filter}
      />
    </div>
  );
}
ContactsFilter.propType = {
  filter: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};
export default ContactsFilter;
