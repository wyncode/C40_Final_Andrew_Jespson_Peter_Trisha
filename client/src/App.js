import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppContextProvider } from './context/AppContext';
import welcomebuttons from './components/authforms/welcomebuttons';
import UserRegister from './pages/Register';
import DashHompage from './pages/user/Homepage';
import Login from './pages/Login';
import ChefStore from './pages/ChefStore';
import MealSetForm from './components/mealSets/MealSetForm';
import StoreForm from './components/storeform/Storeform';
import StorePic from './components/storeform/StorePic';
import DishForm from './components/dishes/DishForm';
import DishImages from './components/dishes/DishImages';
import Home from './pages/Home';

function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/welcome" component={welcomebuttons} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={UserRegister} />
          <Route exact path="/storeform" component={StoreForm} />
          <Route exact path="/storepic" component={StorePic} />
          <Route exact path="/dishform" component={DishForm} />
          <Route exact path="/dishimages" component={DishImages} />
          <Route exact path="/mealsetform" component={MealSetForm} />
          <Route exact path="/" component={Home} />
          <Route exact path="/Dashboard" component={DashHompage} />
          <Route exact path="/stores/:id" component={ChefStore} />
        </Switch>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
