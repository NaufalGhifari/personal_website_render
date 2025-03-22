
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { calculateDosage, formatDecimal } from '@/lib/calculators';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const DosageCalculator = () => {
  const [stockStrength, setStockStrength] = useState<number>(0);
  const [prescribedDose, setPrescribedDose] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0);
  const [strengthUnit, setStrengthUnit] = useState<string>('mg');
  const [volumeUnit, setVolumeUnit] = useState<string>('mL');
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    if (stockStrength > 0 && prescribedDose > 0 && volume > 0) {
      const dosageResult = calculateDosage(stockStrength, prescribedDose, volume);
      setResult(dosageResult);
    } else {
      setResult(null);
    }
  }, [stockStrength, prescribedDose, volume]);

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <Link to="/pharmacy/" className="inline-flex items-center text-sm text-slate-600 hover:text-pharma-600 dark:text-slate-400 dark:hover:text-pharma-300 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold mb-2">Dosage Calculator</h1>
            <p className="text-slate-600 dark:text-slate-300">
              Calculate accurate medication dosages for patients.
            </p>
          </div>
          
          <div className="glass-card rounded-xl p-6 mb-6 animate-scale-in">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="stockStrength" className="block text-sm font-medium">
                    Stock Strength
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
                          Enter the strength of the medication as stated on the label (e.g., 5 mg/mL).
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex space-x-2">
                  <input
                    id="stockStrength"
                    type="number"
                    min="0"
                    step="0.01"
                    className="glass-input rounded-lg px-3 py-2 flex-1 focus:outline-none"
                    value={stockStrength || ''}
                    onChange={(e) => setStockStrength(Number(e.target.value))}
                    placeholder="0.00"
                  />
                  <select
                    value={strengthUnit}
                    onChange={(e) => setStrengthUnit(e.target.value)}
                    className="glass-input rounded-lg px-3 py-2 focus:outline-none"
                  >
                    <option value="mg">mg/mL</option>
                    <option value="mcg">mcg/mL</option>
                    <option value="g">g/mL</option>
                    <option value="%">%</option>
                  </select>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="prescribedDose" className="block text-sm font-medium">
                    Prescribed Dose
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
                          Enter the prescribed dose of medication (e.g., 10 mg).
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex space-x-2">
                  <input
                    id="prescribedDose"
                    type="number"
                    min="0"
                    step="0.01"
                    className="glass-input rounded-lg px-3 py-2 flex-1 focus:outline-none"
                    value={prescribedDose || ''}
                    onChange={(e) => setPrescribedDose(Number(e.target.value))}
                    placeholder="0.00"
                  />
                  <select
                    value={strengthUnit}
                    className="glass-input rounded-lg px-3 py-2 focus:outline-none"
                    disabled
                  >
                    <option value={strengthUnit}>{strengthUnit}</option>
                  </select>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="volume" className="block text-sm font-medium">
                    Volume of Dose Form
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
                          Enter the volume of the dose form (e.g., 5 mL).
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex space-x-2">
                  <input
                    id="volume"
                    type="number"
                    min="0"
                    step="0.01"
                    className="glass-input rounded-lg px-3 py-2 flex-1 focus:outline-none"
                    value={volume || ''}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    placeholder="0.00"
                  />
                  <select
                    value={volumeUnit}
                    onChange={(e) => setVolumeUnit(e.target.value)}
                    className="glass-input rounded-lg px-3 py-2 focus:outline-none"
                  >
                    <option value="mL">mL</option>
                    <option value="L">L</option>
                    <option value="cc">cc</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          <div className="glass-card rounded-xl p-6 animate-slide-in" style={{ animationDelay: '100ms' }}>
            <h2 className="text-lg font-semibold mb-4">Results</h2>
            
            <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-800 mb-4">
              <span className="text-sm font-medium">Required Dose</span>
              <span className="text-xl font-bold text-pharma-600 dark:text-pharma-300">
                {result !== null ? `${formatDecimal(result, 2)} ${volumeUnit}` : '—'}
              </span>
            </div>
            
            {result !== null && (
              <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 text-sm">
                <p className="mb-2">
                  <span className="font-medium">Formula: </span>
                  <span className="font-italic">
                    (Prescribed Dose ÷ Stock Strength) × Volume
                  </span>
                </p>
                <p>
                  <span className="font-medium">Calculation: </span>
                  ({prescribedDose} {strengthUnit} ÷ {stockStrength} {strengthUnit}/{volumeUnit}) × {volume} {volumeUnit} = {formatDecimal(result, 2)} {volumeUnit}
                </p>
              </div>
            )}
            
            {(!stockStrength || !prescribedDose || !volume) && (
              <div className="text-center py-6 text-slate-500 dark:text-slate-400">
                <p>Enter all values to calculate dosage</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DosageCalculator;
