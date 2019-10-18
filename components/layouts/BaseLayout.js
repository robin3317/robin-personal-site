import React from 'react';
import Header from '../shared/Header';

const BaseLayout = props => {
  const { className, children, isAuthenticated } = props;

  return (
    <div className="layout-container">
      <Header isAuthenticated={isAuthenticated} />
      <main className={`cover ${className}`}>
        <div className="wrapper">{children}</div>
      </main>
    </div>
  );
};

export default BaseLayout;
