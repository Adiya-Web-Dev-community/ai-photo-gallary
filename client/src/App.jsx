import "./App.css";
import { Routes, Route } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import AppNavbar from "./components/app-navbar/AppNavbar";
import Signin from "./components/signin/Signin";
import DashBoardDetails from "./components/dashboard-details/DashBoardDetails";
import SetupWatermark from "./components/setup-watermark/SetupWatermark";
import Gallary from "./components/gallary/Gallary";
import FaceRecognitionGallery from "./components/face-recognition-gallery/face-recognition-gallery";
import HomePage from "./components/home/home-page";
import EventFormPage from "./components/event-form-page/event-form-page";
import RegisterUser from "./components/register-user/register-user";
import SetPassword from "./components/register-user/set-passsword";
//public routes- full access  , face search
import FullEventForm from "./components/FullEventAccess/FullEventForm/FullEventForm";
import Event from "./components/FullEventAccess/Events/Event";

function App() {
  return (
    <Provider store={store}>
      <Toaster position="top-center" reverseOrder={false} />
      <AppNavbar />
      <div style={{ marginTop: "5rem" }}>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/dashboard-details" element={<DashBoardDetails />} />
          <Route path="/home-page" element={<HomePage />} />
          <Route
            path="/event-form-page/:eventName/:eventId"
            element={<EventFormPage />}
          />
          <Route path="/gallary/:id" element={<Gallary />} />
          <Route path="/watermaker-setup" element={<SetupWatermark />} />
          <Route
            path="/facerecognitiongallery"
            element={<FaceRecognitionGallery />}
          />
          <Route path="/register-new-user" element={<RegisterUser />} />
          <Route path="/set-password" element={<SetPassword />} />
          {/* full access */}
          <Route path="/fullaccesseventform" element={<FullEventForm />} />
          <Route path="/show-event-data" element={<Event />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
