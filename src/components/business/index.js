import React from 'react';
import { Header } from './Header';
import Content from './Content';

export const BusinessCase = () => {
  return (
    <div id="list-content">
      <div className="list-card">
        <Header />
        <Content />
      </div>
    </div>
  )
}
