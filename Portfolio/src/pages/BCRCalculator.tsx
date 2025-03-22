
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { calculateBCR, formatCurrency } from '@/lib/calculators';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const BCRCalculator = () => {
  const [benefits, setBenefits] = useState<number>(0);
  const [costs, setCosts] = useState<number>(0);
  const [result, setResult] = useState<number | null>(null);
  const [interpretation, setInterpretation] = useState<string>('');

  useEffect(() => {
    if (benefits > 0 && costs > 0) {
      const bcrResult = calculateBCR(benefits, costs);
      setResult(bcrResult);
      
      if (bcrResult > 1) {
        setInterpretation('The benefits outweigh the costs. This investment appears economically viable.');
      } else if (bcrResult === 1) {
        setInterpretation('The benefits equal the costs. This investment breaks even.');
      } else {
        setInterpretation('The costs outweigh the benefits. This investment may not be economically viable.');
      }
    } else {
      setResult(null);
      setInterpretation('');
    }
  }, [benefits, costs]);

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <Link to="/pharmacy/" className="inline-flex items-center text-sm text-slate-600 hover:text-pharma-600 dark:text-slate-400 dark:hover:text-pharma-300 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold mb-2">BCR Calculator</h1>
            <p className="text-slate-600 dark:text-slate-300">
              Calculate the Benefit-Cost Ratio for investment decisions in your pharmacy.
            </p>
          </div>
          
          <div className="glass-card rounded-xl p-6 mb-6 animate-scale-in">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="benefits" className="block text-sm font-medium">
                    Total Benefits
                  </label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                          <Info className="w-4 h-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-64 text-xs">
                          Enter the total monetary value of all benefits expected from this investment (revenue, cost savings, etc.)
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                  <input
                    id="benefits"
                    type="number"
                    min="0"
                    className="glass-input rounded-lg px-8 py-2 w-full focus:outline-none"
                    value={benefits || ''}
                    onChange={(e) => setBenefits(Number(e.target.value))}
                    placeholder="0.00"
                  />
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="costs" className="block text-sm font-medium">
                    Total Costs
                  </label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                          <Info className="w-4 h-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-64 text-xs">
                          Enter the total monetary value of all costs associated with this investment (purchase, maintenance, operation, etc.)
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                  <input
                    id="costs"
                    type="number"
                    min="0"
                    className="glass-input rounded-lg px-8 py-2 w-full focus:outline-none"
                    value={costs || ''}
                    onChange={(e) => setCosts(Number(e.target.value))}
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="glass-card rounded-xl p-6 animate-slide-in" style={{ animationDelay: '100ms' }}>
            <h2 className="text-lg font-semibold mb-4">Results</h2>
            
            <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-800 mb-4">
              <span className="text-sm font-medium">Benefit-Cost Ratio (BCR)</span>
              <span className="text-xl font-bold text-pharma-600 dark:text-pharma-300">
                {result !== null ? result.toFixed(2) : '—'}
              </span>
            </div>
            
            {benefits > 0 && costs > 0 && (
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Total Benefits</span>
                    <span className="text-sm font-medium">{formatCurrency(benefits)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Total Costs</span>
                    <span className="text-sm font-medium">{formatCurrency(costs)}</span>
                  </div>
                </div>
                
                {interpretation && (
                  <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 text-sm">
                    <span className="font-medium">Interpretation: </span>
                    {interpretation}
                  </div>
                )}
              </div>
            )}
            
            {(!benefits || !costs) && (
              <div className="text-center py-6 text-slate-500 dark:text-slate-400">
                <p>Enter benefits and costs to see results</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BCRCalculator;
