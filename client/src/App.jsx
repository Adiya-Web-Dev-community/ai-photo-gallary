import './App.css';
import { Routes, Route } from 'react-router-dom'
import { store } from './store'
import { Provider } from 'react-redux';
import { Toaster } from "react-hot-toast";
import AppNavbar from './components/app-navbar/AppNavbar';
import Signin from './components/signin/Signin';
import DashBoardDetails from './components/dashboard-details/DashBoardDetails';
import SetupWatermark from './components/setup-watermark/SetupWatermark';
import Gallary from './components/gallary/Gallary';
import FaceRecognitionGallery from './components/face-recognition-gallery/face-recognition-gallery';
import HomePage from './components/home/home-page';
import EventFormPage from './components/event-form-page/event-form-page';
import RegisterUser from './components/register-user/register-user';
import SetPassword from './components/register-user/set-passsword';

function App() {
  return (
    <Provider store={store}>
      <Toaster position="top-center" reverseOrder={false} />
      <AppNavbar />
      <div style={{ marginTop: '5rem' }}>
        <Routes>
          <Route path='/' element={<Signin />} />
          <Route path='/dashboard-details' element={<DashBoardDetails />} />
          <Route path='/home-page' element={<HomePage />} />
          <Route path='/event-form-page/:eventName/:eventId' element={<EventFormPage />} />
          <Route path='/gallary/:id' element={<Gallary />} />
          <Route path='/watermaker-setup' element={<SetupWatermark />} />
          <Route path='/facerecognitiongallery' element={<FaceRecognitionGallery />} />
          <Route path='/register-new-user' element={<RegisterUser />} />
          <Route path='/set-password' element={<SetPassword />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
