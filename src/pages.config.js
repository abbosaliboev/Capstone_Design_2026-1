/**
 * pages.config.js - Page routing configuration
 * 
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 * 
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 * 
 * Example file structure:
 * 
 *   import HomePage from './pages/HomePage';
 *   import Dashboard from './pages/Dashboard';
 *   import Settings from './pages/Settings';
 *   
 *   export const PAGES = {
 *       "HomePage": HomePage,
 *       "Dashboard": Dashboard,
 *       "Settings": Settings,
 *   }
 *   
 *   export const pagesConfig = {
 *       mainPage: "HomePage",
 *       Pages: PAGES,
 *   };
 * 
 * Example with Layout (wraps all pages):
 *
 *   import Home from './pages/Home';
 *   import Settings from './pages/Settings';
 *   import __Layout from './Layout.jsx';
 *
 *   export const PAGES = {
 *       "Home": Home,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "Home",
 *       Pages: PAGES,
 *       Layout: __Layout,
 *   };
 *
 * To change the main page from HomePage to Dashboard, use find_replace:
 *   Old: mainPage: "HomePage",
 *   New: mainPage: "Dashboard",
 *
 * The mainPage value must match a key in the PAGES object exactly.
 */
import Splash from './pages/Splash';
import RoleSelect from './pages/RoleSelect';
import CreateSession from './pages/CreateSession';
import JoinSession from './pages/JoinSession';
import LiveSession from './pages/LiveSession';
import Cameras from './pages/Cameras';
import CameraDetail from './pages/CameraDetail';
import Zones from './pages/Zones';
import Alerts from './pages/Alerts';
import VehicleDetection from './pages/VehicleDetection';
import HealthMonitoring from './pages/HealthMonitoring';
import HostControls from './pages/HostControls';
import AppSettings from './pages/AppSettings';
import Home from './pages/Home';


export const PAGES = {
    "Splash": Splash,
    "RoleSelect": RoleSelect,
    "CreateSession": CreateSession,
    "JoinSession": JoinSession,
    "LiveSession": LiveSession,
    "Cameras": Cameras,
    "CameraDetail": CameraDetail,
    "Zones": Zones,
    "Alerts": Alerts,
    "VehicleDetection": VehicleDetection,
    "HealthMonitoring": HealthMonitoring,
    "HostControls": HostControls,
    "AppSettings": AppSettings,
    "Home": Home,
}

export const pagesConfig = {
    mainPage: "Splash",
    Pages: PAGES,
};