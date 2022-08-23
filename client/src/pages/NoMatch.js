import React from 'react';
import Header from '../components/Header'

const NoMatch = () => {
  return (
    <main className="flex-row justify-center mb-4">
      <Header/>
    <div className='oops'>
      <h3>
      Oops! we couldn't find that page.
      </h3>
    </div>
    </main>
  );
};

export default NoMatch;