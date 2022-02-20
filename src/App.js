import { 
  HashRouter as Router, 
  Switch, 
  Route,
  Redirect
} from "react-router-dom";
import EventEmitter from "events";
import AppDashboard from './screens/App';
import Home from "./screens/Home";
import Signin from "./screens/Signin";
import Signup from "./screens/Signup";
import ForgotPassword from "./screens/Forgot";
import 'bootstrap/dist/css/bootstrap.min.css';

export const event = new EventEmitter()

const App = () => {
  window.flash = (message, type = "success") => event.emit(
    'flash',
    ({ message, type })
  );
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/dashboard" component={AppDashboard} />
        <Route exact path="/login" component={Signin} />
        <Route exact path="/register" component={Signup} />
        <Route exact path="/forgot" component={ForgotPassword} />
        <Route exact path="/logout" component={() => {
          if (!localStorage.getItem('email')) {
            setTimeout(() => {
              window.flash('You were not logged in', 'warning');
            }, 100)
          } else {
            localStorage.clear();
            setTimeout(() => {
              window.flash('Logged out successfully', 'success');
            }, 100)
          }
          return <Redirect to='/' />;
          }} />
      </Switch>
    </Router>
  )
}

export default App