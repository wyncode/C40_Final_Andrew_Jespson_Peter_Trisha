import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppContextProvider } from './context/AppContext';
import welcomebuttons from './components/authforms/welcomebuttons';
import Shop from './components/search/Shop';
import ChefRegister from './pages/chefregister';
import UserRegister from './pages/userregistration';
import DashHompage from './pages/user/Homepage';
import Login from './pages/login';

import './App.css';

function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/welcome" component={welcomebuttons} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/chef-register" component={ChefRegister} />
          <Route exact path="/user-register" component={UserRegister} />
          <Route exact path="/Dashboard" component={DashHompage} />
          <Route exact path="/shop" component={Shop} />
        </Switch>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
