
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { calculateReorderPoint, calculateEconomicOrderQuantity } from '@/lib/calculators';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const StockProcurement = () => {
  // Reorder Point (ROP) State
  const [averageDailyUsage, setAverageDailyUsage] = useState<number>(0);
  const [leadTime, setLeadTime] = useState<number>(0);
  const [safetyStock, setSafetyStock] = useState<number>(0);
  const [reorderPoint, setReorderPoint] = useState<number | null>(null);
  
  // Economic Order Quantity (EOQ) State
  const [annualDemand, setAnnualDemand] = useState<number>(0);
  const [orderCost, setOrderCost] = useState<number>(0);
  const [holdingCost, setHoldingCost] = useState<number>(0);
  const [eoq, setEoq] = useState<number | null>(null);

  // Calculate Reorder Point
  useEffect(() => {
    if (averageDailyUsage > 0 && leadTime > 0) {
      const ropResult = calculateReorderPoint(averageDailyUsage, leadTime, safetyStock);
      setReorderPoint(ropResult);
    } else {
      setReorderPoint(null);
    }
  }, [averageDailyUsage, leadTime, safetyStock]);

  // Calculate Economic Order Quantity
  useEffect(() => {
    if (annualDemand > 0 && orderCost > 0 && holdingCost > 0) {
      const eoqResult = calculateEconomicOrderQuantity(annualDemand, orderCost, holdingCost);
      setEoq(eoqResult);
    } else {
      setEoq(null);
    }
  }, [annualDemand, orderCost, holdingCost]);

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <Link to="/pharmacy/" className="inline-flex items-center text-sm text-slate-600 hover:text-pharma-600 dark:text-slate-400 dark:hover:text-pharma-300 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold mb-2">Stock Procurement Calculator</h1>
            <p className="text-slate-600 dark:text-slate-300">
              Optimize your inventory management with reorder point and economic order quantity calculations.
            </p>
          </div>
          
          <Tabs defaultValue="rop" className="animate-scale-in">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="rop">Reorder Point</TabsTrigger>
              <TabsTrigger value="eoq">Economic Order Quantity</TabsTrigger>
            </TabsList>
            
            <TabsContent value="rop">
              <div className="glass-card rounded-xl p-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="averageDailyUsage" className="block text-sm font-medium">
                        Average Daily Usage (units)
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
                              Enter the average number of units used or sold per day.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <input
                      id="averageDailyUsage"
                      type="number"
                      min="0"
                      className="glass-input rounded-lg px-3 py-2 w-full focus:outline-none"
                      value={averageDailyUsage || ''}
                      onChange={(e) => setAverageDailyUsage(Number(e.target.value))}
                      placeholder="0"
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="leadTime" className="block text-sm font-medium">
                        Lead Time (days)
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
                              Enter the average time (in days) between placing an order and receiving it.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <input
                      id="leadTime"
                      type="number"
                      min="0"
                      className="glass-input rounded-lg px-3 py-2 w-full focus:outline-none"
                      value={leadTime || ''}
                      onChange={(e) => setLeadTime(Number(e.target.value))}
                      placeholder="0"
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="safetyStock" className="block text-sm font-medium">
                        Safety Stock (units)
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
                              Enter the buffer stock kept to handle unexpected demand or supply delays.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <input
                      id="safetyStock"
                      type="number"
                      min="0"
                      className="glass-input rounded-lg px-3 py-2 w-full focus:outline-none"
                      value={safetyStock || ''}
                      onChange={(e) => setSafetyStock(Number(e.target.value))}
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
              
              <div className="glass-card rounded-xl p-6">
                <h2 className="text-lg font-semibold mb-4">Reorder Point Results</h2>
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-800 mb-4">
                  <span className="text-sm font-medium">Reorder Point (ROP)</span>
                  <span className="text-xl font-bold text-pharma-600 dark:text-pharma-300">
                    {reorderPoint !== null ? `${reorderPoint} units` : '—'}
                  </span>
                </div>
                
                {reorderPoint !== null && (
                  <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 text-sm">
                    <p>
                      <span className="font-medium">Recommendation: </span>
                      Place a new order when inventory reaches {reorderPoint} units to avoid stockouts.
                    </p>
                  </div>
                )}
                
                {(!averageDailyUsage || !leadTime) && (
                  <div className="text-center py-6 text-slate-500 dark:text-slate-400">
                    <p>Enter usage and lead time to calculate reorder point</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="eoq">
              <div className="glass-card rounded-xl p-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="annualDemand" className="block text-sm font-medium">
                        Annual Demand (units)
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
                              Enter the total number of units used or sold per year.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <input
                      id="annualDemand"
                      type="number"
                      min="0"
                      className="glass-input rounded-lg px-3 py-2 w-full focus:outline-none"
                      value={annualDemand || ''}
                      onChange={(e) => setAnnualDemand(Number(e.target.value))}
                      placeholder="0"
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="orderCost" className="block text-sm font-medium">
                        Order Cost ($)
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
                              Enter the cost associated with placing a single order (administrative costs, shipping, etc.).
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                      <input
                        id="orderCost"
                        type="number"
                        min="0"
                        className="glass-input rounded-lg px-8 py-2 w-full focus:outline-none"
                        value={orderCost || ''}
                        onChange={(e) => setOrderCost(Number(e.target.value))}
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="holdingCost" className="block text-sm font-medium">
                        Annual Holding Cost per Unit ($)
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
                              Enter the cost of holding one unit in inventory for a year (storage, insurance, opportunity cost, etc.).
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                      <input
                        id="holdingCost"
                        type="number"
                        min="0"
                        className="glass-input rounded-lg px-8 py-2 w-full focus:outline-none"
                        value={holdingCost || ''}
                        onChange={(e) => setHoldingCost(Number(e.target.value))}
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="glass-card rounded-xl p-6">
                <h2 className="text-lg font-semibold mb-4">Economic Order Quantity Results</h2>
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-800 mb-4">
                  <span className="text-sm font-medium">Economic Order Quantity (EOQ)</span>
                  <span className="text-xl font-bold text-pharma-600 dark:text-pharma-300">
                    {eoq !== null ? `${eoq} units` : '—'}
                  </span>
                </div>
                
                {eoq !== null && (
                  <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 text-sm">
                    <p>
                      <span className="font-medium">Recommendation: </span>
                      Order {eoq} units at a time to minimize total inventory costs.
                    </p>
                  </div>
                )}
                
                {(!annualDemand || !orderCost || !holdingCost) && (
                  <div className="text-center py-6 text-slate-500 dark:text-slate-400">
                    <p>Enter all values to calculate economic order quantity</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default StockProcurement;
