import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SidePanel from './components/SidePanel';
import { Navbar } from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Holdings from './pages/Holdings';
import Watchlist from './pages/Watchlist';

function App() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';  // Prevent body scroll
    } else {
      document.body.style.overflow = 'auto';  // Allow body scroll
    }

    return () => {
      document.body.style.overflow = 'auto';  // Cleanup on unmount
    };
  }, [isSidebarOpen]);
  

  return (
    <Router>
      <div className='flex bg-[#F4F5F6]'>
          {/* <div className=""><MobileSidePanel isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/></div> */}
          <div className=""><SidePanel /></div>
          <div className={`md:flex-1 md:ml-[20%] 2xl:ml-[18%] px-5 2xl:px-8 overflow-x-hidden afterthis flex flex-col transition-all duration-300 ease-in-out ${isSidebarOpen && 'overflow-hidden md:overflow-visible'}`}> 
            {/* flex flex-col min-h-screen transition-all duration-300 ease-in-out ${isSidebarOpen && 'overflow-hidden md:overflow-visible'} */}
            <Navbar toggleSidebar={toggleSidebar}  />
            <div className="routes">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/holdings" element={<Holdings />} />
                <Route path="/watchlist" element={<Watchlist />} />
              </Routes>
            </div>
        </div>
      </div>
    </Router>
  )
}

export default App
