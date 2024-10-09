import React from 'react';
import ProfileRoaster from './components/ProfileRoaster';
import ToastProfile from './components/ToastProfile';
import { FaFire } from 'react-icons/fa';

function App() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <h1 className="text-5xl font-bold text-white mb-4 flex items-center animate-pulse">
        <FaFire className="mr-2 text-orange-500" />
        ROASTER TOASTER
      </h1>
      <p className="text-gray-400 mb-8 text-center">Serving up hot and crispy roasts, one profile at a time!</p>
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8">
        <ProfileRoaster />
        <ToastProfile />
      </div>
    </div>
  );
}

export default App;