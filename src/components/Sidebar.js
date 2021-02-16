import React from 'react'

export const Sidebar = () => {
  return (
    <>
      <input type="checkbox" className="openSidebarMenu" id="openSidebarMenu"></input>
      <div id="sidebarMenu">
        <ul className="sidebarMenuInner">
          <li><a href="#" target="_blank">Business Cases</a></li>
          <li><a href="#" target="_blank">Bug Tracking</a></li>
        </ul>
      </div>
    </>
  )
}
