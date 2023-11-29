import React from 'react';
import VideoAudioPlayer from "./components/VideoAudioPlayer"
import './App.css';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <VideoAudioPlayer />
    </div>
  );
}

export default App;
