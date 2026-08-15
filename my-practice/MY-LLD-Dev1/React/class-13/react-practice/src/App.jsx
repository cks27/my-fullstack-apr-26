import { useState } from 'react';
import Stopwatch from './components/Stopwatch';
import Carousel from './components/carousel';
import SearchComponent from './components/SearchComponent';
import neonCityImg from './assets/neon_city.png';
import forestLakeImg from './assets/forest_lake.png';
import cosmicOceanImg from './assets/cosmic_ocean.png';
import sandDunesImg from './assets/sand_dunes.png';
import './App.css';

const slidesData = [
  {
    image: neonCityImg,
    title: "Neon Oasis",
    description: "Explore the pulsing lights, high-tech corridors, and towering skyscrapers of a cyberpunk future."
  },
  {
    image: forestLakeImg,
    title: "Emerald Echoes",
    description: "Unwind by the tranquil mountain lake enveloped in the cool mist of a deep emerald forest."
  },
  {
    image: cosmicOceanImg,
    title: "Bioluminescent Odyssey",
    description: "Sail beneath cosmic nebulae on a shimmering, star-filled ocean illuminated by glowing waves."
  },
  {
    image: sandDunesImg,
    title: "Whispering Sands",
    description: "Watch the sun dip below rolling dunes, painting the desert in golden orange hues and soft shadows."
  }
];

function App() {
  const [activeTab, setActiveTab] = useState('carousel');

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>React Practice Suite</h1>
        <p className="app-subtitle">Interactive Frontend LLD Components</p>
        
        <div className="tab-navigation">
          <button 
            className={`tab-btn ${activeTab === 'carousel' ? 'active' : ''}`}
            onClick={() => setActiveTab('carousel')}
          >
            <svg className="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 3v18M15 3v18" />
            </svg>
            <span>Interactive Carousel</span>
          </button>
          
          <button 
            className={`tab-btn ${activeTab === 'stopwatch' ? 'active' : ''}`}
            onClick={() => setActiveTab('stopwatch')}
          >
            <svg className="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <span>Precision Stopwatch</span>
          </button>

          <button 
            className={`tab-btn ${activeTab === 'search' ? 'active' : ''}`}
            onClick={() => setActiveTab('search')}
          >
            <svg className="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <span>Search Filter</span>
          </button>
        </div>
      </header>
      
      <main className="content-area">
        {activeTab === 'carousel' && (
          <div className="component-wrapper fade-in">
            <div className="component-header">
              <h2>Interactive Showcase</h2>
              <p>Supports swipe gestures, keyboard arrow control, custom hover pause autoplay and autoplay progress tracking.</p>
            </div>
            <Carousel slides={slidesData} autoPlayInterval={5000} infinite={true} />
          </div>
        )}
        
        {activeTab === 'stopwatch' && (
          <div className="component-wrapper fade-in">
            <div className="component-header">
              <h2>Laps & Timing</h2>
              <p>Precise milisecond timer with stateful lap splits and visual markers.</p>
            </div>
            <Stopwatch />
          </div>
        )}

        {activeTab === 'search' && (
          <div className="component-wrapper fade-in">
            <div className="component-header">
              <h2>Filter & Search</h2>
              <p>Interactive search filter with dynamic results updating in real-time.</p>
            </div>
            <SearchComponent />
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Built with React & Vanilla CSS &bull; Scaler LLD Practice</p>
      </footer>
    </div>
  );
}

export default App;


