import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-primary text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Respiratory Disease Diagnosis
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:text-primary-light">
                Home
              </Link>
            </li>
            <li>
              <Link href="/diagnosis" className="hover:text-primary-light">
                Diagnosis
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;