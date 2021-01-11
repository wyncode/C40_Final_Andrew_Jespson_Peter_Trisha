import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppContextProvider } from './context/AppContext';
import welcomebuttons from './components/authforms/welcomebuttons';
import ChefRegister from './pages/chefregister';
import UserRegister from './pages/userregistration';
import DashHompage from './pages/user/Homepage';
import Login from './pages/login';
import ChefStore from './pages/ChefStore';
import StoreTabPanel from './components/StoreFront/StoreTabPanel';
import MealCards from './components/StoreFront/MealCards';
import MealSetForm from './components/mealSets/MealSetForm';
import StoreHeader from './components/StoreFront/StoreHeader';
import AboutSection from './components/StoreFront/AboutSection';
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
          <Route exact path="/stores/:id" component={ChefStore} />
        </Switch>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
