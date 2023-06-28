import  {
  HashRouter as Router,
  Route,
  Routes
} from 'react-router-dom'

import {AuthProvider} from  './context/AuthContext'
import PrivateRoute from './utils/PrivateRoute'
import './App.css'
import Header from './components/Header'
import CarList from './pages/CarList'
import CarDetail from './pages/CarDetail'
import MechanicList from './pages/MechanicList'
import MechanicDetail from './pages/MechanicDetail'
import CarTypeList from './pages/CarTypeList'
import CarTypeDetail from './pages/CarTypeDetail'
import RepairedList from './pages/RepairedList'
import RepairedDetail from './pages/RepairedDetail'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import ChatAppPage from './pages/ChatAppPage'
function App() {
  return (
  <div className="Container">
    <div className="app">
   <Router>
      <AuthProvider>

      <Header />
       <Routes>

      <Route path = "/" exact element={<CarList/>} />
      <Route path = "/cars/:id" element={<CarDetail/>} />
      <Route path = "/mechanics" element={<MechanicList/>} />
     <Route path = "/chatApp" element={<ChatAppPage/>} />
      <Route path = "/mechanics/:id" element={<MechanicDetail/>} />

      <Route path = "/carTypes" element={<CarTypeList/> } />

      <Route path = "/carTypes/:id" element={<CarTypeDetail /> }/>

      <Route path = "/repaireds/:id" element={<RepairedDetail/>} />
      <Route path = "/repaireds" element={<PrivateRoute/> } >
      <Route path = "/repaireds" element={<RepairedList/>} />
       </Route>
      <Route path = "/sign_up"
      element={<SignUpPage />} />
      <Route path = "/login" element={<LoginPage/>} />
       </Routes>

       </AuthProvider>
   </Router>
   </div>
    </div>
  );
}

export default App;
