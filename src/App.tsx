import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
// import { FloatingChatbot } from './components/FloatingChatbot';


// Lazy loaded pages
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const PropertyDetails = lazy(() => import('./pages/PropertyDetails').then(module => ({ default: module.PropertyDetails })));

const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy').then(module => ({ default: module.PrivacyPolicy })));
const TermsOfService = lazy(() => import('./pages/TermsOfService').then(module => ({ default: module.TermsOfService })));

function App() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-off-white">
        <Loader2 className="w-8 h-8 animate-spin text-gold-500" />
      </div>
    }>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property/:id" element={<PropertyDetails />} />

        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
      </Routes>
      {/* Hiding FloatingChatbot temporarily during development */}
      {/* <FloatingChatbot /> */}

    </Suspense>
  );
}

export default App;
