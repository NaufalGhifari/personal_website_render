
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  TrendingUp,
  PieChart, 
  Tablets, 
  ShoppingCart, 
  Pill
} from 'lucide-react';
import CalculatorCard from '@/components/CalculatorCard';

const Index = () => {
  const calculators = [
    {
      title: 'BCR Calculator',
      description: 'Calculate Benefit-Cost Ratio for investment decisions',
      icon: <TrendingUp className="w-6 h-6" />,
      path: '/pharmacy/bcr-calculator',
    },
    {
      title: 'NPV Calculator',
      description: 'Determine Net Present Value of investments over time',
      icon: <PieChart className="w-6 h-6" />,
      path: '/pharmacy/npv-calculator',
    },
    {
      title: 'Tablet Friability',
      description: 'Calculate tablet durability through friability testing',
      icon: <Tablets className="w-6 h-6" />,
      path: '/pharmacy/tablet-friability',
    },
    {
      title: 'Stock Procurement',
      description: 'Optimize inventory with reorder points and EOQ',
      icon: <ShoppingCart className="w-6 h-6" />,
      path: '/pharmacy/stock-procurement',
    },
    {
      title: 'Dosage Calculator',
      description: 'Calculate accurate medication dosages for patients',
      icon: <Pill className="w-6 h-6" />,
      path: '/pharmacy/dosage-calculator',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
      <section className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in">
            <div className="inline-block mb-4 px-3 py-1 rounded-full bg-pharma-100 dark:bg-pharma-900/30 text-pharma-600 dark:text-pharma-300 text-sm font-medium">
              <span>Pharmaceutical Calculations by Naufal</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Pharmacy Calculator Hub
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8">
              Streamline your pharmaceutical calculations with our comprehensive suite of tools designed for pharmacy professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#calculators"
                className="px-8 py-3 rounded-lg bg-slate-100 text-slate-800 font-medium hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors duration-300"
              >
                View Calculators
              </a>
            </div>
          </div>
          
          <div id="calculators" className="pt-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Choose a Calculator</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {calculators.map((calc, index) => (
                <div 
                  key={calc.path}
                  className="opacity-0 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                >
                  <CalculatorCard
                    title={calc.title}
                    description={calc.description}
                    icon={calc.icon}
                    path={calc.path}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Why Use PharmCalc?</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-12">
              Our calculators are designed to help pharmacy professionals make accurate calculations quickly and efficiently.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
              <div className="p-6 rounded-xl glass-card">
                <div className="w-12 h-12 bg-pharma-100 dark:bg-pharma-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-6 h-6 text-pharma-600 dark:text-pharma-300" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Precision</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Get accurate calculations that comply with pharmaceutical standards.
                </p>
              </div>
              
              <div className="p-6 rounded-xl glass-card">
                <div className="w-12 h-12 bg-pharma-100 dark:bg-pharma-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-pharma-600 dark:text-pharma-300" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Efficiency</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Save time with instant calculations and intuitive interfaces.
                </p>
              </div>
              
              <div className="p-6 rounded-xl glass-card sm:col-span-2 md:col-span-1">
                <div className="w-12 h-12 bg-pharma-100 dark:bg-pharma-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="w-6 h-6 text-pharma-600 dark:text-pharma-300" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Comprehensive</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  All the tools you need in one convenient dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-10 text-center text-slate-600 dark:text-slate-400 text-sm">
        <div className="container mx-auto px-4 md:px-6">
          <p>© {new Date().getFullYear()} PharmCalc. Author: Muhammad Naufal Al Ghifari</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
