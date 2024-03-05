import './App.css';
import { Routes,BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Browse from './pages/Browse';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Layout from './components/Layout';
import UserPage from './pages/UserPage';
import AddPet from './pages/AddPet';
import Nopage from './pages/Nopage';
import PetPage from './pages/PetPage';
import AddManipulation from './pages/AddManipulation';
import ManipulationPage from './pages/ManipulationPage';
import EditManipulation from './pages/EditManipulation';
import UpdateUserInfo from './pages/UpdateUserInfo';


function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/" element = {<Layout />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/users" element={<Browse />} />
              <Route path="/users/:id" element={<UserPage />} />
              <Route path="/users/:id/update" element={<UpdateUserInfo/>} />
              <Route path="/users/:id/addpet" element={<AddPet />} />
              <Route path="/users/:id/:petId" element={<PetPage />} />
              <Route path="/users/:id/:petId/add" element={<AddManipulation />} />
              <Route path="/users/:id/:petId/:manipulationId" element={<ManipulationPage />} />
              <Route path="/users/:id/:petId/:manipulationId/edit" element={<EditManipulation/>} />
              <Route path="*" element={<Nopage />} />
            </Route>
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
