import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Home from '../Home/Home';
import Admin from '../Admin/Admin';
import About from '../About/About';
import News from '../News/News';
import Library from '../Library/Library';
import SingleNewsPage from '../News/SingleNewsPage';
import LoginPage from '../Login/LoginPage';
import SignupPage from '../Signup/SignupPage';
import { getUserAuthInfo, logoutUser } from '../../Auth/Auth';
import RestorePasswordPage from '../RestorePasswordPage/RestorePasswordPage';
import UserAccount from '../UserAccount/UserAccount';
import CalendarPage from '../CalendarPage/CalendarPage';
import OrganizationsPage from '../Organizations/OrganizationsPage';
import ChangeForgottenPasswordPage from '../ChangeForgottenPasswordPage/ChangeForgottenPasswordPage';
import Message from '../Message/Message';
import { clearMessageTimer } from '../../configs/config.json';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      message: {
        type: '',
        text: '',
      },
    };
    this.onAuthChange = this.onAuthChange.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.showMessage = this.showMessage.bind(this);
  }

  componentDidMount() {
    getUserAuthInfo()
      .then((userInfo) => {
        this.setState({
          userInfo,
        });
      })
      .catch((err) => {
        if (err.response.status === 401) {
          this.setState({ userInfo: { admin: false, name: '' } });
        }
      });
  }

  onAuthChange(userInfo) {
    this.setState({
      userInfo,
    });
  }

  onLogout() {
    logoutUser();
    this.setState({
      userInfo: { admin: false, name: '' },
    });
  }

  showMessage({ type, text }) {
    this.setState({ message: { type, text } });
    this.clearMessage();
  }

  clearMessage() {
    this.timerID = setTimeout(() => {
      this.setState({ message: null });
    }, clearMessageTimer);
  }

  render() {
    return (
      <div className='app'>
        <Header {...this.state} onLogout={this.onLogout} />
        <Switch>
          <Route path='/home' component={Home} />
          <Route
            path='/admin'
            render={() => <Admin {...this.state} showMessage={this.showMessage} />}
          />
          <Route path='/about' component={About} />
          <Route path='/news/:id' component={SingleNewsPage} />
          <Route path='/news' component={News} />
          <Route path='/calendar' component={CalendarPage} />
          <Route path='/library' render={() => <Library {...this.state} />} />
          <Route
            path='/login'
            render={() => (
              <LoginPage onAuthChange={this.onAuthChange} showMessage={this.showMessage} />
            )}
          />
          <Route
            path='/signup'
            render={() => (
              <SignupPage onAuthChange={this.onAuthChange} showMessage={this.showMessage} />
            )}
          />
          <Route
            path='/restore-password'
            render={() => <RestorePasswordPage showMessage={this.showMessage} />}
          />
          <Route
            path='/change-password/:token'
            render={() => <ChangeForgottenPasswordPage showMessage={this.showMessage} />}
          />
          <Route
            path='/account'
            render={() => <UserAccount {...this.state} showMessage={this.showMessage} />}
          />
          <Route
            path='/organizations'
            render={() => (
              <OrganizationsPage userInfo={this.state.userInfo} showMessage={this.showMessage} />
            )}
          />
          <Redirect to='/home' />
        </Switch>
        <Message {...this.state.message} />
        <Footer />
      </div>
    );
  }
}
