import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/login/Login';
import Register from './components/register/Register';
import { AuthProvider } from './context/AuthContext';
import Home from './components/home/Home';
import Logout from './components/logout/Logout';
import Form from './components/passwordForm/Form';
import Mail from './components/passwordForm/Mail';
import Newform from './components/passwordForm/Newform';
import Successpage from './components/passwordForm/Successpage';
import Dashboard from './components/dashboard/Dashboard';
import Myurl from './components/myurl/Myurl';
import Activation from './components/register/Activation';
import ActivationSuccess from './components/register/ActivationSuccess';

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/form" element={<Form/>} />
          <Route path="/mail" element={<Mail></Mail>} />
          <Route path="/newform" element={<Newform/>} />
          <Route path="/successpage" element={<Successpage/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/myurl" element={<Myurl/>} />
          <Route path="/activation" element={<Activation/>} />
          <Route path="/activationsuccess" element={<ActivationSuccess/>} />
          {/* Additional routes can be added here */}
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;
