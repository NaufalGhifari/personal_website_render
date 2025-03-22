
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { calculateFriability, formatPercentage, formatDecimal } from '@/lib/calculators';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const TabletFriability = () => {
  const [initialWeight, setInitialWeight] = useState<number>(0);
  const [finalWeight, setFinalWeight] = useState<number>(0);
  const [result, setResult] = useState<number | null>(null);
  const [interpretation, setInterpretation] = useState<string>('');

  useEffect(() => {
    if (initialWeight > 0 && finalWeight > 0 && finalWeight <= initialWeight) {
      const friabilityResult = calculateFriability(initialWeight, finalWeight);
      setResult(friabilityResult);
      
      if (friabilityResult <= 1) {
        setInterpretation('The friability is within acceptable limits (≤1%) according to USP standards.');
      } else {
        setInterpretation('The friability exceeds the acceptable limit (>1%) according to USP standards. Further formulation optimization may be needed.');
      }
    } else {
      setResult(null);
      setInterpretation('');
    }
  }, [initialWeight, finalWeight]);

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <Link to="/pharmacy/" className="inline-flex items-center text-sm text-slate-600 hover:text-pharma-600 dark:text-slate-400 dark:hover:text-pharma-300 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold mb-2">Tablet Friability Calculator</h1>
            <p className="text-slate-600 dark:text-slate-300">
              Calculate tablet friability to assess tablet durability during handling and shipping.
            </p>
          </div>
          
          <div className="glass-card rounded-xl p-6 mb-6 animate-scale-in">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="initialWeight" className="block text-sm font-medium">
                    Initial Weight (g)
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
                          Enter the total weight of the tablets before the friability test.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <input
                  id="initialWeight"
                  type="number"
                  min="0"
                  step="0.0001"
                  className="glass-input rounded-lg px-3 py-2 w-full focus:outline-none"
                  value={initialWeight || ''}
                  onChange={(e) => setInitialWeight(Number(e.target.value))}
                  placeholder="0.0000"
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="finalWeight" className="block text-sm font-medium">
                    Final Weight (g)
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
                          Enter the total weight of the tablets after the friability test.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <input
                  id="finalWeight"
                  type="number"
                  min="0"
                  max={initialWeight || undefined}
                  step="0.0001"
                  className="glass-input rounded-lg px-3 py-2 w-full focus:outline-none"
                  value={finalWeight || ''}
                  onChange={(e) => setFinalWeight(Number(e.target.value))}
                  placeholder="0.0000"
                />
              </div>
            </div>
          </div>
          
          <div className="glass-card rounded-xl p-6 animate-slide-in" style={{ animationDelay: '100ms' }}>
            <h2 className="text-lg font-semibold mb-4">Results</h2>
            
            <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-800 mb-4">
              <span className="text-sm font-medium">Friability</span>
              <span className="text-xl font-bold text-pharma-600 dark:text-pharma-300">
                {result !== null ? formatPercentage(result) : '—'}
              </span>
            </div>
            
            {initialWeight > 0 && finalWeight > 0 && finalWeight <= initialWeight && (
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Initial Weight</span>
                    <span className="text-sm font-medium">{formatDecimal(initialWeight, 4)} g</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Final Weight</span>
                    <span className="text-sm font-medium">{formatDecimal(finalWeight, 4)} g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Weight Loss</span>
                    <span className="text-sm font-medium">{formatDecimal(initialWeight - finalWeight, 4)} g</span>
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
            
            {(!initialWeight || !finalWeight || finalWeight > initialWeight) && (
              <div className="text-center py-6 text-slate-500 dark:text-slate-400">
                <p>
                  {finalWeight > initialWeight 
                    ? 'Final weight cannot exceed initial weight' 
                    : 'Enter weight values to see results'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabletFriability;
