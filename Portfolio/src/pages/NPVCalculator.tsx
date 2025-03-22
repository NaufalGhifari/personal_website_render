
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Info, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { calculateNPV, formatCurrency } from '@/lib/calculators';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

const NPVCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState<number>(0);
  const [discountRate, setDiscountRate] = useState<number>(5);
  const [cashFlows, setCashFlows] = useState<number[]>([0]);
  const [result, setResult] = useState<number | null>(null);
  const [interpretation, setInterpretation] = useState<string>('');

  useEffect(() => {
    if (initialInvestment > 0 && cashFlows.some(flow => flow > 0)) {
      const npvResult = calculateNPV(initialInvestment, cashFlows, discountRate);
      setResult(npvResult);
      
      if (npvResult > 0) {
        setInterpretation('The investment is expected to generate value. It may be worth pursuing.');
      } else if (npvResult === 0) {
        setInterpretation('The investment is expected to break even. Consider other factors in your decision.');
      } else {
        setInterpretation('The investment is expected to lose value. It may not be worth pursuing.');
      }
    } else {
      setResult(null);
      setInterpretation('');
    }
  }, [initialInvestment, cashFlows, discountRate]);

  const handleCashFlowChange = (index: number, value: number) => {
    const newCashFlows = [...cashFlows];
    newCashFlows[index] = value;
    setCashFlows(newCashFlows);
  };

  const addCashFlowYear = () => {
    setCashFlows([...cashFlows, 0]);
  };

  const removeCashFlowYear = (index: number) => {
    if (cashFlows.length > 1) {
      const newCashFlows = [...cashFlows];
      newCashFlows.splice(index, 1);
      setCashFlows(newCashFlows);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <Link to="/pharmacy/" className="inline-flex items-center text-sm text-slate-600 hover:text-pharma-600 dark:text-slate-400 dark:hover:text-pharma-300 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold mb-2">NPV Calculator</h1>
            <p className="text-slate-600 dark:text-slate-300">
              Calculate the Net Present Value of pharmacy investments over time.
            </p>
          </div>
          
          <div className="glass-card rounded-xl p-6 mb-6 animate-scale-in">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="initialInvestment" className="block text-sm font-medium">
                    Initial Investment
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
                          Enter the upfront cost of your investment (typically a negative value).
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                  <input
                    id="initialInvestment"
                    type="number"
                    min="0"
                    className="glass-input rounded-lg px-8 py-2 w-full focus:outline-none"
                    value={initialInvestment || ''}
                    onChange={(e) => setInitialInvestment(Number(e.target.value))}
                    placeholder="0.00"
                  />
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="discountRate" className="block text-sm font-medium">
                    Discount Rate (%)
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
                          The rate used to discount future cash flows to their present value, reflecting the time value of money and risk.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="relative">
                  <input
                    id="discountRate"
                    type="number"
                    min="0"
                    max="100"
                    step="0.5"
                    className="glass-input rounded-lg px-3 py-2 w-full focus:outline-none"
                    value={discountRate || ''}
                    onChange={(e) => setDiscountRate(Number(e.target.value))}
                    placeholder="5.00"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500">%</span>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium">
                    Cash Flows by Year
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
                          Enter the expected cash flows for each year of your investment period.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                
                <div className="space-y-2">
                  {cashFlows.map((flow, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                        <input
                          type="number"
                          className="glass-input rounded-lg px-8 py-2 w-full focus:outline-none"
                          value={flow || ''}
                          onChange={(e) => handleCashFlowChange(index, Number(e.target.value))}
                          placeholder="0.00"
                          aria-label={`Cash Flow Year ${index + 1}`}
                        />
                      </div>
                      <div className="bg-white dark:bg-slate-700 rounded-md px-3 py-2 text-sm text-slate-600 dark:text-slate-300">
                        Year {index + 1}
                      </div>
                      {cashFlows.length > 1 && (
                        <button 
                          onClick={() => removeCashFlowYear(index)}
                          className="p-2 text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400 transition-colors"
                          aria-label="Remove year"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                
                <Button 
                  onClick={addCashFlowYear}
                  variant="outline"
                  size="sm"
                  className="mt-3"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Year
                </Button>
              </div>
            </div>
          </div>
          
          <div className="glass-card rounded-xl p-6 animate-slide-in" style={{ animationDelay: '100ms' }}>
            <h2 className="text-lg font-semibold mb-4">Results</h2>
            
            <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-800 mb-4">
              <span className="text-sm font-medium">Net Present Value (NPV)</span>
              <span className="text-xl font-bold text-pharma-600 dark:text-pharma-300">
                {result !== null ? formatCurrency(result) : '—'}
              </span>
            </div>
            
            {result !== null && (
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Initial Investment</span>
                    <span className="text-sm font-medium">{formatCurrency(initialInvestment)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Discount Rate</span>
                    <span className="text-sm font-medium">{discountRate}%</span>
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
            
            {(!initialInvestment || !cashFlows.some(flow => flow > 0)) && (
              <div className="text-center py-6 text-slate-500 dark:text-slate-400">
                <p>Enter investment details to see results</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NPVCalculator;
