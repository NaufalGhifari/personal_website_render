
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface CalculatorCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  className?: string;
}

const CalculatorCard: React.FC<CalculatorCardProps> = ({
  title,
  description,
  icon,
  path,
  className,
}) => {
  return (
    <Link
      to={path}
      className={cn(
        'glass-card hover-lift rounded-xl p-6 flex flex-col h-full',
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="bg-pharma-50 dark:bg-pharma-900/30 p-3 rounded-lg text-pharma-600 dark:text-pharma-300">
          {icon}
        </div>
        <ArrowRight className="w-5 h-5 text-pharma-400 opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 flex-grow">{description}</p>
      <div className="mt-auto">
        <span className="inline-flex items-center text-sm font-medium text-pharma-600 dark:text-pharma-400 group">
          <span className="mr-2">Get started</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
        </span>
      </div>
    </Link>
  );
};

export default CalculatorCard;
