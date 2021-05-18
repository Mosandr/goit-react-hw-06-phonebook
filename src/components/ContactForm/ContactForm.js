import { Component } from "react";
import { connect } from "react-redux";
import actions from "../../redux/contacts/contacts-actions";
import shortId from "shortid";
import PropTypes from "prop-types";
import styles from "./ContactForm.module.scss";

class ContactForm extends Component {
  state = {
    name: "",
    number: "",
  };

  isContainsInputedName() {
    const { contacts } = this.props;
    const inputedName = this.state.name;
    return !!contacts.find(
      (contact) => contact.name.toLowerCase() === inputedName.toLowerCase()
    );
  }

  handleChange = (event) => {
    const { target } = event;
    this.setState({
      [target.name]: target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.isContainsInputedName()) {
      alert(`${this.state.name} is already in contacts`);
      return;
    }

    const data = this.state;
    this.props.onSubmit(data);
    this.setState({
      name: "",
      number: "",
    });
  };

  render() {
    const { name, number } = this.state;
    const idForName = shortId.generate();
    const idForNumber = shortId.generate();

    return (
      <form className={styles.ContactForm} onSubmit={this.handleSubmit}>
        <label className={styles.label} htmlFor={idForName}>
          Name
        </label>
        <input
          className={styles.input}
          id={idForName}
          onChange={this.handleChange}
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
        />
        <label className={styles.label} htmlFor={idForNumber}>
          Number
        </label>
        <input
          className={styles.input}
          id={idForNumber}
          onChange={this.handleChange}
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
        />
        <button className="button" type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return { contacts: state.contacts.items };
};

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (contact) => dispatch(actions.addItem(contact)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);

PropTypes.ContactForm = {
  onAddContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
