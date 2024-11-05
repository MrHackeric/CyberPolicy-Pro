import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

// Import pages
import LoginPage from '../src/components/authentication/LoginPage';
import SignUpPage from '../src/components/authentication/SignUpPage';
import ForgotPasswordPage from '../src/components/authentication/ForgotPasswordPage';
import NotFoundPage from '../src/components/authentication/NotFoundPage';

import PrivacyPolicyPage from '../src/components/privacypolicy/PrivacyPolicyPage';
import LandingPage from '../src/components/landingpage/LandingPage';

import RiskScore from '../src/components/riskscore/RiskScore';
import Draft from '../src/components/draft/Draft';
import ProfileSettings from '../src/components/profilesettings/ProfileSettings';
import Notifications from '../src/components/notifications/Notifications';



function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signup" element={<SignUpPage />} />
        <Route exact path="/forgotpass" element={<ForgotPasswordPage />} />
        <Route exact path="/error" element={<NotFoundPage />} />
        <Route exact path="/privacy" element={<PrivacyPolicyPage />} />
        <Route exact path="/riskscore" element={<RiskScore />} />
        <Route exact path="/draft" element={<Draft />} />
        <Route exact path="/settings" element={<ProfileSettings />} />
        <Route exact path="/notifications" element={<Notifications />} />

      </Routes>
    </>
  );
}

export default App;
