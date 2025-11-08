import React, { useState } from 'react';
import { Sun, MapPin, Zap, DollarSign, TrendingUp, Leaf, Settings, Calculator, ChevronDown, ChevronUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { showError } from '@/utils/toast';

export default function CalculatorPage() {
  const [formData, setFormData] = useState({
    latitude: 21.25,
    longitude: 81.63,
    altitude: 298,
    climaticZone: 'moderate',
    area: 50,
    panelEfficiency: 20,
    systemLoss: 15,
    panelWattage: 400,
    month: 6,
    analysisType: 'annual',
    electricityRate: 7.5,
    installCost: 50000
  });

  const [results, setResults] = useState<any>(null);
  const [expandedSections, setExpandedSections] = useState({
    location: true,
    system: true,
    time: true,
    economic: true
  });
  
  const [calculationMode, setCalculationMode] = useState<'month' | 'day'>('month');
  const [date, setDate] = useState<Date | undefined>(new Date());

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || value
    }));
  };

  const calculateSolarMetrics = () => {
    const {
      latitude, longitude, altitude, climaticZone, area,
      panelEfficiency, systemLoss, panelWattage, month,
      analysisType, electricityRate, installCost
    } = formData;

    if (!latitude || !area || !climaticZone) {
        showError("Please fill in all required fields.");
        return;
    }
    if (calculationMode === 'day' && !date) {
        showError("Please select a date for day-wise calculation.");
        return;
    }

    let dayOfYear;
    let currentMonth = month;
    if (calculationMode === 'day' && date) {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date.getTime() - start.getTime();
        const oneDay = 1000 * 60 * 60 * 24;
        dayOfYear = Math.floor(diff / oneDay);
        currentMonth = date.getMonth() + 1;
    } else {
        dayOfYear = (month - 1) * 30.5 + 15;
    }

    const declination = 23.45 * Math.sin((360/365) * (dayOfYear - 81) * Math.PI / 180);
    const sinAltitude = Math.sin(latitude * Math.PI / 180) * Math.sin(declination * Math.PI / 180) + 
                       Math.cos(latitude * Math.PI / 180) * Math.cos(declination * Math.PI / 180);
    const sunAltitude = Math.asin(sinAltitude) * 180 / Math.PI;
    const monthlyTilt = latitude - declination;
    const annualTilt = latitude;
    const summerTilt = latitude - 15;
    const winterTilt = latitude + 15;

    let optimalTilt;
    if (calculationMode === 'day') {
        optimalTilt = monthlyTilt;
    } else if (analysisType === 'monthly') {
      optimalTilt = monthlyTilt;
    } else if (analysisType === 'seasonal') {
      optimalTilt = (currentMonth >= 4 && currentMonth <= 9) ? summerTilt : winterTilt;
    } else {
      optimalTilt = annualTilt;
    }

    const zoneFactors: { [key: string]: any } = {
      'hot-dry': { cloudFactor: 0.95 }, 'warm-humid': { cloudFactor: 0.80 },
      'moderate': { cloudFactor: 0.88 }, 'cold-sunny': { cloudFactor: 0.92 },
      'cold-cloudy': { cloudFactor: 0.70 }, 'composite': { cloudFactor: 0.85 }
    };
    const zoneData = zoneFactors[climaticZone];
    const altitudeCorrection = 1 + (altitude / 1000) * 0.07;
    const extraterrestrialRadiation = 1367;
    const airMass = 1 / Math.sin(Math.max(sunAltitude, 5) * Math.PI / 180);
    const taub = 0.4;
    const dni = (extraterrestrialRadiation * Math.exp(-taub * airMass)) * zoneData.cloudFactor / 1000 * 8;
    const taud = 2.0;
    const dhi = (extraterrestrialRadiation * Math.exp(-taud * airMass) * 0.5) * zoneData.cloudFactor / 1000 * 8;
    const ghi = dni * Math.sin(sunAltitude * Math.PI / 180) + dhi;
    const tiltAngleRad = optimalTilt * Math.PI / 180;
    const declinationRad = declination * Math.PI / 180;
    const latitudeRad = latitude * Math.PI / 180;
    const cosIncidence = Math.sin(latitudeRad - tiltAngleRad) * Math.sin(declinationRad) + 
                        Math.cos(latitudeRad - tiltAngleRad) * Math.cos(declinationRad);
    const tiltCorrectionFactor = Math.max(cosIncidence / Math.cos(latitudeRad), 1);
    const poi = (dni * Math.max(cosIncidence, 0) + dhi * (1 + Math.cos(tiltAngleRad)) / 2 + 
                ghi * 0.2 * (1 - Math.cos(tiltAngleRad)) / 2);
    const estimatedIrradiance = poi * tiltCorrectionFactor * altitudeCorrection;
    const panelArea = panelWattage / 200;
    const maxPanels = Math.floor(area / panelArea);
    const totalPanelArea = maxPanels * panelArea;
    const spaceUtilization = (totalPanelArea / area * 100);
    const systemCapacity = (maxPanels * panelWattage / 1000);
    const systemEfficiencyFactor = (1 - systemLoss / 100) * (panelEfficiency / 100);
    const dailyGeneration = systemCapacity * estimatedIrradiance * systemEfficiencyFactor;
    const monthlyGeneration = dailyGeneration * 30;
    const seasonalVariation = [0.85, 0.90, 0.95, 1.00, 1.05, 1.05, 0.90, 0.95, 1.00, 1.05, 0.95, 0.85];
    let annualGeneration = 0;
    for (let m = 0; m < 12; m++) {
      annualGeneration += dailyGeneration * seasonalVariation[m] * 30;
    }
    const peakPower = systemCapacity;
    const capacityFactor = (annualGeneration / (systemCapacity * 8760)) * 100;
    const totalInstallationCost = systemCapacity * installCost;
    const annualSavings = annualGeneration * electricityRate;
    const lifetimeSavings = annualSavings * 25;
    const paybackPeriod = totalInstallationCost / annualSavings;
    const roi = ((lifetimeSavings - totalInstallationCost) / totalInstallationCost * 100);
    const discountRate = 0.06;
    let npv = -totalInstallationCost;
    for (let year = 1; year <= 25; year++) {
      npv += annualSavings * (1 - 0.005 * year) / Math.pow(1 + discountRate, year);
    }
    const co2PerKwh = 0.82;
    const co2Offset = annualGeneration * co2PerKwh;
    const co2Lifetime = co2Offset * 25 / 1000;
    const treesEquivalent = Math.round(co2Offset / 21);
    const coalSaved = annualGeneration * 0.6;
    const carsOffRoad = (co2Offset / 4600).toFixed(2);
    const recommendations = [];
    if (spaceUtilization < 70) recommendations.push("Consider higher wattage panels to better utilize space.");
    if (optimalTilt < 10) recommendations.push("Low tilt angle may cause dust accumulation; increase cleaning.");
    if (optimalTilt > 45) recommendations.push("High tilt angle; ensure structural support for wind loads.");
    if (climaticZone === 'warm-humid' || climaticZone === 'cold-cloudy') recommendations.push("Consider anti-reflective coating for cloudy conditions.");
    if (paybackPeriod < 7) recommendations.push("Excellent ROI; consider expanding system capacity.");
    if (capacityFactor > 18) recommendations.push("Excellent capacity factor; system is well optimized.");
    recommendations.push("Recommended orientation: True South (180° azimuth).");

    setResults({
      tilt: { optimal: optimalTilt, monthly: monthlyTilt, annual: annualTilt, summer: summerTilt, winter: winterTilt, sunAltitude },
      radiation: { dni, dhi, ghi, poi, irradiance: estimatedIrradiance },
      system: { numPanels: maxPanels, totalArea: totalPanelArea, spaceUtil: spaceUtilization, capacity: systemCapacity },
      energy: { daily: dailyGeneration, monthly: monthlyGeneration, annual: annualGeneration, peakPower, capacityFactor },
      economics: { totalCost: totalInstallationCost, annualSavings, lifetimeSavings, payback: paybackPeriod, roi, npv },
      environment: { co2: co2Offset, co2Lifetime, trees: treesEquivalent, coal: coalSaved, cars: carsOffRoad },
      recommendations
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateSolarMetrics();
  };

  return (
    <div className="min-h-screen bg-transparent p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-black/20 backdrop-blur-lg rounded-3xl p-8 mb-6 border border-white/20 shadow-2xl">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Sun className="w-12 h-12 text-yellow-400 animate-pulse" />
            <h1 className="text-4xl font-bold text-white text-center">Advanced Solar Calculator</h1>
          </div>
          <p className="text-center text-purple-200 text-lg">ASHRAE Model-Based Solar Energy Optimization</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-black/20 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {Object.keys(expandedSections).map((sectionKey) => (
                <div key={sectionKey} className="border border-purple-400/30 rounded-2xl p-6 bg-white/5">
                  <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection(sectionKey)}>
                    <div className="flex items-center gap-3">
                      {sectionKey === 'location' && <MapPin className="w-6 h-6 text-purple-400" />}
                      {sectionKey === 'system' && <Settings className="w-6 h-6 text-purple-400" />}
                      {sectionKey === 'time' && <Calculator className="w-6 h-6 text-purple-400" />}
                      {sectionKey === 'economic' && <DollarSign className="w-6 h-6 text-purple-400" />}
                      <h3 className="text-xl font-semibold text-white capitalize">{sectionKey} Parameters</h3>
                    </div>
                    {expandedSections[sectionKey as keyof typeof expandedSections] ? <ChevronUp className="w-5 h-5 text-purple-400" /> : <ChevronDown className="w-5 h-5 text-purple-400" />}
                  </div>
                  {expandedSections[sectionKey as keyof typeof expandedSections] && (
                    <div className="mt-4 space-y-4">
                      {sectionKey === 'location' && <>
                        <div><label className="block text-purple-200 mb-2 font-medium">Latitude (°)</label><input type="number" name="latitude" value={formData.latitude} onChange={handleInputChange} step="0.01" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-purple-400/30 text-white focus:ring-2 focus:ring-purple-500" placeholder="e.g., 21.25" /></div>
                        <div><label className="block text-purple-200 mb-2 font-medium">Longitude (°)</label><input type="number" name="longitude" value={formData.longitude} onChange={handleInputChange} step="0.01" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-purple-400/30 text-white focus:ring-2 focus:ring-purple-500" placeholder="e.g., 81.63" /></div>
                        <div><label className="block text-purple-200 mb-2 font-medium">Altitude (m)</label><input type="number" name="altitude" value={formData.altitude} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-white/10 border border-purple-400/30 text-white focus:ring-2 focus:ring-purple-500" placeholder="e.g., 298" /></div>
                        <div><label className="block text-purple-200 mb-2 font-medium">Climatic Zone</label><select name="climaticZone" value={formData.climaticZone} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-white/10 border border-purple-400/30 text-white focus:ring-2 focus:ring-purple-500"><option value="hot-dry" className="bg-purple-900">Hot & Dry</option><option value="warm-humid" className="bg-purple-900">Warm & Humid</option><option value="moderate" className="bg-purple-900">Moderate</option><option value="cold-sunny" className="bg-purple-900">Cold & Sunny</option><option value="cold-cloudy" className="bg-purple-900">Cold & Cloudy</option><option value="composite" className="bg-purple-900">Composite</option></select></div>
                      </>}
                      {sectionKey === 'system' && <>
                        <div><label className="block text-purple-200 mb-2 font-medium">Available Area (m²)</label><input type="number" name="area" value={formData.area} onChange={handleInputChange} step="0.1" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-purple-400/30 text-white focus:ring-2 focus:ring-purple-500" placeholder="e.g., 50" /></div>
                        <div><label className="block text-purple-200 mb-2 font-medium">Panel Efficiency (%)</label><input type="number" name="panelEfficiency" value={formData.panelEfficiency} onChange={handleInputChange} step="0.1" min="10" max="25" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-purple-400/30 text-white focus:ring-2 focus:ring-purple-500" /></div>
                        <div><label className="block text-purple-200 mb-2 font-medium">System Loss (%)</label><input type="number" name="systemLoss" value={formData.systemLoss} onChange={handleInputChange} step="0.1" min="5" max="30" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-purple-400/30 text-white focus:ring-2 focus:ring-purple-500" /></div>
                        <div><label className="block text-purple-200 mb-2 font-medium">Panel Wattage (W)</label><select name="panelWattage" value={formData.panelWattage} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-white/10 border border-purple-400/30 text-white focus:ring-2 focus:ring-purple-500"><option value="300" className="bg-purple-900">300W</option><option value="350" className="bg-purple-900">350W</option><option value="400" className="bg-purple-900">400W</option><option value="450" className="bg-purple-900">450W</option><option value="500" className="bg-purple-900">500W</option></select></div>
                      </>}
                      {sectionKey === 'time' && <Tabs value={calculationMode} onValueChange={(v) => setCalculationMode(v as any)} className="w-full"><TabsList className="grid w-full grid-cols-2 bg-black/20"><TabsTrigger value="month">Month Wise</TabsTrigger><TabsTrigger value="day">Day Wise</TabsTrigger></TabsList><TabsContent value="month" className="mt-4 space-y-4"><div><label className="block text-purple-200 mb-2 font-medium">Analysis Month</label><select name="month" value={formData.month} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-white/10 border border-purple-400/30 text-white focus:ring-2 focus:ring-purple-500">{['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((m, i) => (<option key={i} value={i + 1} className="bg-purple-900">{m}</option>))}</select></div><div><label className="block text-purple-200 mb-2 font-medium">Analysis Type</label><select name="analysisType" value={formData.analysisType} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-white/10 border border-purple-400/30 text-white focus:ring-2 focus:ring-purple-500"><option value="monthly" className="bg-purple-900">Monthly</option><option value="seasonal" className="bg-purple-900">Seasonal</option><option value="annual" className="bg-purple-900">Annual Fixed</option></select></div></TabsContent><TabsContent value="day" className="mt-4 flex justify-center"><Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border bg-black/20" /></TabsContent></Tabs>}
                      {sectionKey === 'economic' && <>
                        <div><label className="block text-purple-200 mb-2 font-medium">Electricity Rate (₹/kWh)</label><input type="number" name="electricityRate" value={formData.electricityRate} onChange={handleInputChange} step="0.1" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-purple-400/30 text-white focus:ring-2 focus:ring-purple-500" /></div>
                        <div><label className="block text-purple-200 mb-2 font-medium">Installation Cost (₹/kW)</label><input type="number" name="installCost" value={formData.installCost} onChange={handleInputChange} step="1000" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-purple-400/30 text-white focus:ring-2 focus:ring-purple-500" /></div>
                      </>}
                    </div>
                  )}
                </div>
              ))}
              <button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 rounded-2xl transition transform hover:scale-105 shadow-2xl flex items-center justify-center gap-3 text-lg"><Calculator className="w-6 h-6" />Calculate Analysis</button>
            </form>
          </div>
          <div className="space-y-6">
            {results ? (<>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 shadow-2xl text-center text-white transform hover:scale-105 transition"><div className="text-4xl font-bold">{Math.round(results.tilt.optimal)}°</div><div className="text-sm mt-2 opacity-90">Optimal Tilt</div></div>
                <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl p-6 shadow-2xl text-center text-white transform hover:scale-105 transition"><div className="text-4xl font-bold">{results.radiation.irradiance.toFixed(1)}</div><div className="text-sm mt-2 opacity-90">kWh/m²/day</div></div>
                <div className="bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl p-6 shadow-2xl text-center text-white transform hover:scale-105 transition"><div className="text-4xl font-bold">{results.system.capacity.toFixed(1)}</div><div className="text-sm mt-2 opacity-90">kW System</div></div>
              </div>
              <div className="bg-black/20 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-2xl space-y-4"><div className="flex items-center gap-3 border-b border-purple-400/30 pb-3"><Sun className="w-6 h-6 text-yellow-400" /><h3 className="text-2xl font-bold text-white">Tilt Angle Analysis</h3></div><div className="grid grid-cols-2 gap-4 text-purple-200"><div className="bg-white/5 rounded-xl p-4"><div className="text-sm opacity-80">Monthly Optimal</div><div className="text-2xl font-bold text-white">{Math.round(results.tilt.monthly)}°</div></div><div className="bg-white/5 rounded-xl p-4"><div className="text-sm opacity-80">Annual Optimal</div><div className="text-2xl font-bold text-white">{Math.round(results.tilt.annual)}°</div></div><div className="bg-white/5 rounded-xl p-4"><div className="text-sm opacity-80">Summer Tilt</div><div className="text-2xl font-bold text-white">{Math.round(results.tilt.summer)}°</div></div><div className="bg-white/5 rounded-xl p-4"><div className="text-sm opacity-80">Winter Tilt</div><div className="text-2xl font-bold text-white">{Math.round(results.tilt.winter)}°</div></div></div></div>
              <div className="bg-black/20 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-2xl space-y-4"><div className="flex items-center gap-3 border-b border-purple-400/30 pb-3"><Zap className="w-6 h-6 text-yellow-400" /><h3 className="text-2xl font-bold text-white">ASHRAE Solar Radiation</h3></div><div className="space-y-3 text-purple-200"><div className="flex justify-between items-center bg-white/5 rounded-xl p-3"><span>DNI</span><span className="font-bold text-white">{results.radiation.dni.toFixed(2)} kWh/m²</span></div><div className="flex justify-between items-center bg-white/5 rounded-xl p-3"><span>DHI</span><span className="font-bold text-white">{results.radiation.dhi.toFixed(2)} kWh/m²</span></div><div className="flex justify-between items-center bg-white/5 rounded-xl p-3"><span>GHI</span><span className="font-bold text-white">{results.radiation.ghi.toFixed(2)} kWh/m²</span></div><div className="flex justify-between items-center bg-white/5 rounded-xl p-3"><span>POA Irradiance</span><span className="font-bold text-white">{results.radiation.poi.toFixed(2)} kWh/m²</span></div></div></div>
            </>) : (<div className="bg-black/20 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl flex items-center justify-center h-full text-center"><div className="text-center"><Calculator className="w-16 h-16 text-purple-300 mx-auto mb-4" /><h3 className="text-2xl font-bold text-white">Your Analysis Awaits</h3><p className="text-purple-200 mt-2">Fill in the parameters to see a detailed solar report.</p></div></div>)}
          </div>
        </div>
      </div>
    </div>
  );
}