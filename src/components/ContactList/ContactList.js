import { connect } from "react-redux";
import actions from "../../redux/contacts/contacts-actions";
import PropTypes from "prop-types";
import styles from "./ContactList.module.scss";

const ContactList = ({ contacts, onDelete }) => {
  return (
    <ul className={styles.ContactList}>
      {contacts.map((contact) => {
        const { id, name, number } = contact;
        return (
          <li key={id} className={styles.item}>
            {" "}
            <p className={styles.contactInfo}>
              <span className={styles.name}>{name}:</span>
              <span> {number}</span>
            </p>
            <button
              className="button"
              onClick={() => onDelete(id)}
              type="button"
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

const mapStateToProps = (state) => {
  const { filter, items } = state.contacts;
  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = items.filter(({ name }) =>
    name.toLowerCase().includes(normalizedFilter)
  );

  return {
    contacts: filteredContacts,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onDelete: (id) => dispatch(actions.deleteItem(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);

PropTypes.ContactList = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),

  onDelete: PropTypes.func.isRequired,
};
