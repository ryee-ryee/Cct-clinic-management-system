import { useState } from "react";
import logo from "../assets/logo.png";
import homeIcon from "../assets/home.png";
import addPatientIcon from "../assets/add_patient.png";
import addSupplyIcon from "../assets/add_supply.png";
import reportsIcon from "../assets/reports.png";
import menuIcon from "../assets/menu.png";
import './Main.css';

import Dashboard from './Dashboard.jsx';
import Addpatient from "./Addpatient.jsx";
import Addsupply from "./Addsupply.jsx";
import PatientsPage from './patientsPage.jsx';
import OngoingPatientsPage from './OngoingPatientsPage.jsx';
import SupplyPage from './SupplyPage.jsx';

const navItems = [
  { label: "Home", icon: homeIcon, key: "home" },
  { label: "Add Patient", icon: addPatientIcon, key: "add-patient" },
  { label: "Add Supply", icon: addSupplyIcon, key: "add-supply" },
  { label: "Reports", icon: reportsIcon, key: "reports" }
];

export const Home = () => {
  const [activeKey, setActiveKey] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (key) => {
    setActiveKey(key);
  };

  const handleLogout = () => {
  const confirmLogout = window.confirm("Do you really want to logout?");
  if (confirmLogout) {
    localStorage.clear();
    sessionStorage.clear();
    
    window.location.href = '/login';
  }
};

  const handleAboutUs = () => {
    console.log("About Us clicked");
    setActiveKey("about");
  };

  const renderContent = () => {
    switch (activeKey) {
      case "home":
        return <Dashboard onNavigate={handleNavigate} />;
      case "add-patient":
        return <Addpatient />;
      case "add-supply":
        return <Addsupply />;
      case "reports":
        return <h2>Reports Section</h2>;
      case "patients":
        return <PatientsPage />;
      case "ongoing":
        return <OngoingPatientsPage />;
      case "supply":
        return <SupplyPage />;
      case "about":
        return (
          <div className="about-section">
            <h2>About CCT Clinic</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum..</p>
            <h2> About the Developers</h2>
          </div>
        );
      default:
        return <h2>Unknown Section</h2>;
    }
  };

  const activeIndex = navItems.findIndex(item => item.key === activeKey);

  return (
    <div className="main-container">
      <aside className="sidebar">
        <div className="inner">
          <div className="header">
            <img src={logo} className="logo-img2" alt="logo" />
            <h1><span className="cct">CCT</span> clinic</h1>
          </div>

          <nav className="menu" style={{ "--top": `${activeIndex * 56}px` }}>
            {navItems.map((item) => (
              <button
                key={item.key}
                className={activeKey === item.key ? "active" : ""}
                onClick={() => handleNavigate(item.key)}
              >
                <img src={item.icon} alt={item.label} className="nav-icon" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
          <br />
          <div className="menu-dropdown-container">
            <button 
              className="menu-button" 
              onMouseEnter={() => setIsMenuOpen(true)}
              onMouseLeave={() => setIsMenuOpen(false)}
            >
              <img src={menuIcon} className="menu-icon" alt="Menu" />
              
            </button>
            
            {isMenuOpen && (
              <div 
                className="dropdown-menu"
                onMouseEnter={() => setIsMenuOpen(true)}
                onMouseLeave={() => setIsMenuOpen(false)}
              >
                <button className="dropdown-item" onClick={handleAboutUs}>
                  About Us
                </button>
                <button className="dropdown-item" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      <main className="content">
        {renderContent()}
      </main>
    </div>
  );
};