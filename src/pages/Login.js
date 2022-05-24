/* eslint-disable max-len */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeEmail } from '../actions';
import { Lock, LockOpen, Wallet, GithubLogo } from 'phosphor-react';

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
      <div className="justify-center items-center flex h-screen ">
        <div className="w-full max-w-xs m-auto bg-indigo-100 rounded p-5">
          <h1 className="text-center text-indigo-500 mt-4 text-3xl ">ViniWallet</h1>
          <div className="w-20 mx-auto mb-5 items-center mt-2 flex justify-center">
            <Wallet size={48} color={'#09090A'} />
          </div>
          <div>
            <label
              className="mb-2 text-indigo-500"
              for="email">
              Email:
            </label>
              <input
                data-testid="email-input"
                className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
                type="text"
                name="email"
                value={ email }
                onChange={ this.handleChange }
              />
          </div>
          <div>
            <label
              for="password"
              className="block mb-2 text-indigo-500"
            >
              Senha:
            </label>
              <input
                data-testid="password-input"
                className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
                type="password"
                name="password"
                value={ password }
                onChange={ this.handleChange }
              />
          </div>
          <div className="flex-col justify-center">
            <button
              className="w-full flex justify-center bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 mb-6 rounded"
              type="submit"
              disabled={ enterBtn }
              onClick={ this.userClick }
            >
              { 
                enterBtn 
                ? <Lock size={32} color="#09090A" />
                  : <LockOpen size={32} color="#09090A" /> }
            </button>
            <a target="_blank" className="flex items-center w-full justify-center"  href="https://github.com/CandidoVinii">
              <GithubLogo size={28} color="#151414" weight="thin" />
            </a>
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
