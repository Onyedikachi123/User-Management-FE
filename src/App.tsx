import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'; 
import { store } from './app/store'; 
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import UserDetail from './pages/UserDetail';

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Provider store={store}> 
      <Router>
        <div className="flex h-screen">
          <Sidebar collapsed={collapsed} />
          <div className="flex flex-col w-full">
            <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
            <div className="p-4 bg-white overflow-auto">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/userdetail/:id" element={<UserDetail />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
