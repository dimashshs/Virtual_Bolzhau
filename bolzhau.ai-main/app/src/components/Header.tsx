'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white shadow p-4 fixed top-0 left-0 right-0 z-50 h-16 flex items-center">
        <div className="container mx-auto flex items-center justify-between relative h-full">
          <div className="absolute left-0 flex items-center h-full">
            <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-full text-lg flex items-center">
              Bolzhau.AI
            </button>
          </div>

          <div className="hidden lg:flex flex-1 justify-center">
            <nav className="flex space-x-8">
              {[
                { href: '/', label: 'Сөздер болжамы' },
                { href: '/LLM', label: 'LLM' },
                { href: '/modelInfo', label: 'Модельдер' },
                { href: '/authors', label: 'Біз' }
              ].map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className={`relative text-gray-700 hover:text-blue-500 transition text-lg ${pathname === href ? 'active' : ''}`}
                >
                  {label}
                  {pathname === href && (
                    <span className="absolute left-1/2 transform -translate-x-1/2 -top-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-blue-500"></span>
                  )}
                </a>
              ))}
            </nav>
          </div>

          <button
            className="lg:hidden absolute right-0 text-gray-700 hover:text-blue-500 transition text-xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-white z-40 p-6">
          <button
            className="absolute top-20 right-4 text-gray-700 text-2xl"
            onClick={() => setMenuOpen(false)}
          >
            ✖
          </button>
          <nav className="flex flex-col space-y-4 text-center pt-16">
            {[
              { href: '/', label: 'Сөздерді болжамды енгізу' },
              { href: '/LLM', label: 'LLM' },
              { href: '/authors', label: 'Біз туралы' },
              { href: '/modelInfo', label: 'Модельдер' }
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-gray-700 hover:text-blue-500 transition text-lg"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;