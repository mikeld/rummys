import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-pamplona-dark/80 backdrop-blur-sm shadow-md sticky top-0 z-10 border-b border-pamplona-gray/50">
      <div className="max-w-4xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center space-x-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-pamplona-red">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.5-10.5h-7a2.25 2.25 0 00-2.25 2.25v10.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-10.5a2.25 2.25 0 00-2.25-2.25z" />
          </svg>
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-white tracking-wider">
            Pamplona Secreta: La Ginkana de los Rummys
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;