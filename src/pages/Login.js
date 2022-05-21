/* eslint-disable max-len */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeEmail } from '../actions';
import { Lock, LockOpen, Wallet } from 'phosphor-react';

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
      <div className="justify-center items-center flex h-screen bg-zinc-600">
        <div className="justify-center h-96 w-96 items-center flex-col border-2 bg-[#09090A] rounded-lg">
          <h1 className="text-center tex mt-4 text-4xl ">Login</h1>
          <div className="items-center mt-2 flex justify-center">
            <Wallet size={48} />
          </div>
          <div className="flex mt-14 -ml-4 justify-center">
            <label
              className="flex items-center w-8/12 h-10 text-[#09090A] hover:bg-white hover:text-left uppercase hover:text-zinc-900 transition-all rounded-lg"
              for="email">
              Email:
              <input
                data-testid="email-input"
                className="rounded-lg h-10 hover:ml-10 hover:text-[#09090A] focus:border-2transition-all"
                type="text"
                name="email"
                value={ email }
                onChange={ this.handleChange }
              />
            </label>
          </div>
          <div className="flex mt-2 -ml-[21px] justify-center">
            <label
              for="password"
              className="flex items-center w-8/12 h-10 text-[#09090A] uppercase hover:bg-white hover:text-zinc-900 transition-all rounded-lg"
            >
              Senha:
              <input
                data-testid="password-input"
                className="rounded-lg h-10 hover:ml-10 hover:text-[#09090A] focus:border-2 transition-all"
                type="password"
                name="password"
                value={ password }
                onChange={ this.handleChange }
              />
            </label>

          </div>
          <div className="flex justify-center">
            <button
              className="mt-14 w-20 h-10 justify-center flex items-center rounded-lg transition-colors"
              type="submit"
              disabled={ enterBtn }
              onClick={ this.userClick }
            >
              { 
                enterBtn 
                ? <Lock size={42} color="#DC2626" className="border-2 rounded-lg" />
                  : <LockOpen size={42} color="#65A30D" className="border-2 rounded-lg"  /> }
            </button>
          </div>
        </div>
      </div>
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
