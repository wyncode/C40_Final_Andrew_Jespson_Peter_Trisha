import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppContextProvider } from './context/AppContext';
import { welcomebuttons } from './components/authforms/welcomebuttons';
import { ChefRegister } from './pages/chefregister';
import { UserRegister } from './pages/userregistration';

import './App.css';

function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/welcome" component={welcomebuttons} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/chef-register" component={ChefRegister} />
          <Route exact path="/user-register" component={UserRegister} />
        </Switch>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
