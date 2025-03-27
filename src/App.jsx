import { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SidePanel from './components/SidePanel/SidePanel';
import { Navbar } from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Holdings from './pages/Holdings';
import Watchlist from './pages/Watchlist';
import Funds from './pages/Funds';
import SingInPage from './pages/SingInPage';
import ProtectedRoute from './routes/ProtectedRoute'; // Update the path as needed
import { AuthContext } from './context/AuthContext';
import WebSocketComponent from './components/WebSocketComponent';
import ListStocks from './pages/Admin/ListStocks';
import AddStock from './pages/Admin/AddStock';
import TemporaryWebsocketPage from './pages/TemporaryWebsocketPage';
import { StompSessionProvider } from 'react-stomp-hooks';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useContext(AuthContext);

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
    // <StompSessionProvider url='ws://f54b-14-142-39-150.ngrok-free.app/ws'>
    <Router>
      {user ? (
        <div className='flex bg-[#F4F5F6]'>
          <div className=""><SidePanel /></div>
          <div className={`md:flex-1 md:ml-[20%] 2xl:ml-[18%] px-5 2xl:px-8 overflow-x-hidden afterthis flex flex-col transition-all duration-300 ease-in-out ${isSidebarOpen && 'overflow-hidden md:overflow-visible'}`}> 
            <Navbar toggleSidebar={toggleSidebar} />
            <div className="routes">
              <Routes>
                <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/holdings" element={<Holdings />} />
                  <Route path="/watchlist" element={<Watchlist />} />
                  <Route path="/funds" element={<Funds/>} />
                  {/* Admin Routes */}
                  <Route path="/list-stocks" element={<ListStocks/>} />
                  <Route path="/add-stock" element={<AddStock/>} />
                </Route>
                <Route path="/sign-in" element={
                  user ? <Navigate to="/web-socket" replace /> : <SingInPage />
                } />
                <Route path="*" element={<Navigate to="/web-socket" replace />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/sign-in" element={<SingInPage />} />
          <Route path="*" element={<Navigate to="/sign-in" replace />} />
        </Routes>
      )}
    </Router>
    // </StompSessionProvider>
  );
}

export default App;