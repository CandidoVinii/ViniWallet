import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      enterBtn: true,
    };
  }

  validate = () => {
    const { email, password } = this.state;
    const MAGIC_NUMBER = 5;
    const regex = /\S+@\S+\.\S+/;
    if (regex.test(email) && password.length > MAGIC_NUMBER) {
      this.setState({
        enterBtn: false,
      });
    } else {
      this.setState({
        enterBtn: true,
      });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validate());
  };

  userClick = () => {
    const { email } = this.state;
    const { saveEmail, history } = this.props;
    saveEmail(email);
    history.push('/carteira');
  };

  render() {
    const { email, password, enterBtn } = this.state;
    return (
      <>
        <div>
          <input
            data-testid="email-input"
            type="text"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
          <input
            data-testid="password-input"
            type="password"
            name="password"
            value={ password }
            onChange={ this.handleChange }
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={ enterBtn }
            onClick={ this.userClick }
          >
            Entrar
          </button>
        </div>
      </>
    );
  }
}

Login.propTypes = {
  saveEmail: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (state) => dispatch(changeEmail(state)),
});

export default connect(null, mapDispatchToProps)(Login);
