import React, { useEffect } from 'react';
import { GlobalProvider } from './context/GlobalState';
import { ModalProvider } from './components/modal/Modal';

import './styles/main.scss';
import './styles/sidebar.scss';

import { BusinessCase } from './components/business/index';

const App = () => {

  useEffect(() => {
    let navBar = document.getElementById("sideNavBox");
    if (navBar) {
      navBar.style.display = "none"
    }
  }, [])

  return (
    <GlobalProvider>
      <ModalProvider>
        <div className="wrapper">
          <input type="checkbox" className="openSidebarMenu" id="openSidebarMenu"></input>
          <div className="listHeader box-shadow-bottom">
            <div>​​​​​​​​​​​​​​​​​​​​​​React Spfx Test Page</div>
            <label htmlFor="openSidebarMenu" className="sidebarIconToggle">
              <div className="spinner diagonal part-1"></div>
              <div className="spinner horizontal"></div>
              <div className="spinner diagonal part-2"></div>
            </label>
          </div>
          <div className="content-wrapper">
            <BusinessCase />
          </div>
        </div>
      </ModalProvider>
    </GlobalProvider>
  )
}

export default App;