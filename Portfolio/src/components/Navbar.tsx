
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Calculator, Menu, X } from 'lucide-react';

interface NavItem {
  name: string;
  path: string;
}

const navItems: NavItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Calculators', path: '/pharmacy/' },
  { name: 'APIs', path: '/pharmacy/api' },
  { name: 'Pricing', path: '/pharmacy/pricing' },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-sm py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link
          to="/pharmacy/"
          className="flex items-center space-x-2 text-pharma-600 font-semibold"
        >
          <Calculator className="w-6 h-6" />
          <span className="text-lg">PharmCalc</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                location.pathname === item.path
                  ? 'text-pharma-600 bg-pharma-50 dark:text-pharma-300 dark:bg-pharma-900/30'
                  : 'text-slate-600 hover:text-pharma-600 hover:bg-pharma-50/70 dark:text-slate-300 dark:hover:text-pharma-300 dark:hover:bg-pharma-900/20'
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center text-slate-700 dark:text-slate-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          'fixed inset-x-0 top-[57px] z-40 md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md overflow-hidden transition-all duration-300 ease-in-out',
          isMenuOpen ? 'max-h-screen border-b border-slate-200 dark:border-slate-800' : 'max-h-0'
        )}
      >
        <nav className="container mx-auto px-4 py-2 flex flex-col">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'px-4 py-3 rounded-md text-base font-medium transition-colors',
                location.pathname === item.path
                  ? 'text-pharma-600 bg-pharma-50 dark:text-pharma-300 dark:bg-pharma-900/30'
                  : 'text-slate-600 hover:text-pharma-600 hover:bg-pharma-50/70 dark:text-slate-300 dark:hover:text-pharma-300 dark:hover:bg-pharma-900/20'
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
