import React, { useState, useEffect } from "react";
import {
  Sun,
  MapPin,
  Zap,
  TrendingUp,
  Activity,
  Calendar as CalendarLucide,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, startOfYear, differenceInDays } from "date-fns";

const SolarCalculator = () => {
  // For standalone use - if no context, default to 'day'
  const [timeOfDay, setTimeOfDay] = useState("day");
  const isDay = timeOfDay === "day";

  const textColor = isDay ? "text-slate-800" : "text-white";
  const subTextColor = isDay ? "text-slate-600" : "text-blue-200";
  const cardBg = isDay ? "bg-white/40" : "bg-white/10";
  const cardBorder = isDay ? "border-slate-300/50" : "border-white/20";
  const inputBg = isDay ? "bg-white/50" : "bg-white/20";
  const inputBorder = isDay ? "border-slate-400/50" : "border-white/30";
  const chartStrokeColor = isDay ? "#334155" : "#fff";

  // Default to June 21, 2024 (Summer Solstice)
  const [date, setDate] = useState(new Date(2024, 5, 21));
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState("");

  const [inputs, setInputs] = useState({
    latitude: 21.2514,
    longitude: 81.6296,
    climateZone: "composite",
    availableArea: 100,
    dayOfYear: 172, // June 21
    altitude: 298,
  });

  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const climateZones = {
    hot_dry: { name: "Hot & Dry", ghi: 6.5, color: "#FF6B35" },
    warm_humid: { name: "Warm & Humid", ghi: 5.2, color: "#F7931E" },
    moderate: { name: "Moderate", ghi: 5.8, color: "#FDC830" },
    composite: { name: "Composite", ghi: 5.5, color: "#4ECDC4" },
    cold: { name: "Cold", ghi: 5.0, color: "#45B7D1" },
    cold_cloudy: { name: "Cold & Cloudy", ghi: 4.2, color: "#96CEB4" },
  };

  // Update day of year when date changes
  useEffect(() => {
    if (date) {
      const start = startOfYear(date);
      const day = differenceInDays(date, start) + 1;
      setInputs((prev) => ({ ...prev, dayOfYear: day }));
    }
  }, [date]);

  // ASHRAE Clear Sky Model Calculations
  const calculateSolarParameters = (lat, day, alt = 0) => {
    const phi = (lat * Math.PI) / 180;
    
    // Solar declination (Cooper's equation)
    const delta = 23.45 * Math.sin(((360 * (284 + day)) / 365) * (Math.PI / 180)) * (Math.PI / 180);
    
    // Hour angle at solar noon
    const omega = 0;
    
    // Solar altitude angle at solar noon
    const sinAlpha = Math.sin(phi) * Math.sin(delta) + Math.cos(phi) * Math.cos(delta) * Math.cos(omega);
    const alpha = Math.asin(sinAlpha);
    const alphaDeg = (alpha * 180) / Math.PI;
    
    // Extraterrestrial radiation
    const Gsc = 1367; // Solar constant W/m²
    const E0 = 1 + 0.033 * Math.cos(((360 * day) / 365) * (Math.PI / 180));
    const Gon = Gsc * E0;
    
    // Air mass
    const m = 1 / (sinAlpha + 0.50572 * Math.pow(alphaDeg + 6.07995, -1.6364));
    
    // Atmospheric transmittance for beam radiation
    const tau_b = 0.56 * (Math.exp(-0.65 * m) + Math.exp(-0.095 * m));
    
    // Direct Normal Irradiance
    const DNI = Gon * tau_b;
    
    // Diffuse Horizontal Irradiance
    const tau_d = 0.271 - 0.294 * tau_b;
    const DHI = Gon * tau_d * sinAlpha;
    
    // Global Horizontal Irradiance
    const GHI = DNI * sinAlpha + DHI;
    
    // Altitude correction (7% increase per 1000m)
    const altCorrection = 1 + (alt / 1000) * 0.07;

    return {
      declination: (delta * 180) / Math.PI,
      solarAltitude: alphaDeg,
      airMass: m,
      DNI: DNI * altCorrection,
      DHI: DHI * altCorrection,
      GHI: GHI * altCorrection,
      Gon: Gon,
    };
  };

  const calculateOptimalTilt = (lat, day, solarParams) => {
    const delta = solarParams.declination;
    
    // Daily optimal tilt (ASHRAE approach: latitude - declination)
    // This makes the panel perpendicular to sun's rays at solar noon
    const dailyOptimalTilt = lat - delta;
    
    // Annual optimal tilt (approximately equal to latitude)
    const annualTilt = lat;
    
    // Summer optimization (latitude - 15°)
    const summerTilt = lat - 15;
    
    // Winter optimization (latitude + 15°)
    const winterTilt = lat + 15;
    
    // Seasonal adjustment based on day of year
    let seasonalTilt;
    if (day >= 80 && day <= 172) { // Spring (Mar 21 - Jun 21)
      seasonalTilt = lat - 10;
    } else if (day > 172 && day <= 266) { // Summer (Jun 21 - Sep 23)
      seasonalTilt = summerTilt;
    } else if (day > 266 && day <= 355) { // Fall (Sep 23 - Dec 21)
      seasonalTilt = lat - 5;
    } else { // Winter (Dec 21 - Mar 21)
      seasonalTilt = winterTilt;
    }

    return {
      daily: Math.max(0, Math.min(90, dailyOptimalTilt)),
      annual: Math.max(0, Math.min(90, annualTilt)),
      summer: Math.max(0, Math.min(90, summerTilt)),
      winter: Math.max(0, Math.min(90, winterTilt)),
      seasonal: Math.max(0, Math.min(90, seasonalTilt)),
      recommended: Math.max(0, Math.min(90, dailyOptimalTilt)),
    };
  };

  const calculatePOA = (tiltAngle, lat, day, solarParams) => {
    const beta = (tiltAngle * Math.PI) / 180;
    const phi = (lat * Math.PI) / 180;
    const delta = (solarParams.declination * Math.PI) / 180;
    
    // Incidence angle on tilted surface (south-facing, solar noon)
    const cosTheta =
      Math.sin(delta) * Math.sin(phi) * Math.cos(beta) -
      Math.sin(delta) * Math.cos(phi) * Math.sin(beta) +
      Math.cos(delta) * Math.cos(phi) * Math.cos(beta);
    
    // Plane of Array irradiance
    const POA =
      solarParams.DNI * Math.max(0, cosTheta) +
      (solarParams.DHI * (1 + Math.cos(beta))) / 2;
    
    return Math.max(0, POA);
  };

  const validateInputs = () => {
    setError("");
    
    if (inputs.latitude < -90 || inputs.latitude > 90) {
      setError("Latitude must be between -90° and 90°");
      return false;
    }
    
    if (inputs.longitude < -180 || inputs.longitude > 180) {
      setError("Longitude must be between -180° and 180°");
      return false;
    }
    
    if (inputs.availableArea < 10) {
      setError("Available area must be at least 10 m²");
      return false;
    }
    
    if (inputs.altitude < 0 || inputs.altitude > 9000) {
      setError("Altitude must be between 0 and 9000 meters");
      return false;
    }
    
    return true;
  };

  const calculateResults = () => {
    if (!validateInputs()) {
      return;
    }
    
    setIsCalculating(true);
    setError("");
    
    try {
      const { latitude, dayOfYear, availableArea, altitude } = inputs;
      
      // Calculate solar parameters
      const solarParams = calculateSolarParameters(latitude, dayOfYear, altitude);
      
      // Calculate optimal tilt angles
      const tiltAngles = calculateOptimalTilt(latitude, dayOfYear, solarParams);
      
      // Calculate POA for recommended tilt
      const poaIrradiance = calculatePOA(tiltAngles.recommended, latitude, dayOfYear, solarParams);
      
      // System assumptions (optimized)
      const panelEfficiency = 0.21; // 21% - High efficiency monocrystalline
      const systemLoss = 0.14; // 14% - Optimized system losses
      const effectiveEfficiency = panelEfficiency * (1 - systemLoss);
      
      // Panel specifications
      const panelWattage = 450; // High-efficiency panel
      const panelArea = 2.1; // m² per panel
      
      // System configuration
      const numberOfPanels = Math.floor(availableArea / panelArea);
      const actualArea = numberOfPanels * panelArea;
      const systemCapacity = (numberOfPanels * panelWattage) / 1000; // kW
      
      // Energy calculations
      const peakSunHours = poaIrradiance / 1000; // Convert W/m² to kWh/m²/day
      const dailyEnergy = systemCapacity * peakSunHours * effectiveEfficiency / panelEfficiency;
      const monthlyEnergy = dailyEnergy * 30;
      const annualEnergy = dailyEnergy * 365;
      
      // Capacity factor
      const capacityFactor = (dailyEnergy * 365) / (systemCapacity * 8760) * 100;
      
      // Environmental impact
      const co2OffsetAnnual = annualEnergy * 0.82; // kg CO2 per kWh (India grid)
      const treesEquivalent = co2OffsetAnnual / 21.77; // kg CO2 absorbed per tree per year
      const coalSaved = annualEnergy * 0.45; // kg coal per kWh
      
      // Generate data for tilt vs radiation graph
      const tiltRadiationData = [];
      for (let tilt = 0; tilt <= 90; tilt += 5) {
        const poa = calculatePOA(tilt, latitude, dayOfYear, solarParams);
        tiltRadiationData.push({
          tilt: tilt,
          irradiance: parseFloat((poa / 1000).toFixed(2)),
        });
      }
      
      // Yearly energy distribution
      const yearlyData = [];
      for (let month = 1; month <= 12; month++) {
        const day = Math.floor((month - 1) * 30.5 + 15);
        const sp = calculateSolarParameters(latitude, day, altitude);
        const tilt = calculateOptimalTilt(latitude, day, sp);
        const poa = calculatePOA(tilt.seasonal, latitude, day, sp);
        const energy = ((poa / 1000) * systemCapacity * effectiveEfficiency / panelEfficiency) * 30;
        yearlyData.push({
          month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][month - 1],
          energy: parseFloat(energy.toFixed(0)),
          tilt: parseFloat(tilt.seasonal.toFixed(1)),
        });
      }

      setResults({
        tiltAngles,
        solarParams,
        poaIrradiance,
        panelWattage,
        panelEfficiency: panelEfficiency * 100,
        systemLoss: systemLoss * 100,
        numberOfPanels,
        actualArea,
        systemCapacity,
        dailyEnergy,
        monthlyEnergy,
        annualEnergy,
        capacityFactor,
        co2OffsetAnnual,
        treesEquivalent,
        coalSaved,
        tiltRadiationData,
        yearlyData,
      });
      
      setShowResults(true);
    } catch (err) {
      setError("Calculation error. Please check your inputs.");
      console.error("Calculation error:", err);
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className={`min-h-screen ${textColor} p-8 transition-colors duration-[5000ms] ease-in-out`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <Sun className="w-16 h-16 text-yellow-400 animate-spin-slow" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 bg-clip-text text-transparent">
            Solar Panel Optimizer for India
          </h1>
          <p className={`text-xl ${subTextColor}`}>
            ASHRAE Clear Sky Model | NIT Raipur
          </p>
        </div>

        {/* Input Section */}
        <div className={`${cardBg} backdrop-blur-lg rounded-2xl p-8 mb-8 shadow-2xl border ${cardBorder}`}>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <MapPin className="w-6 h-6 text-yellow-400" />
            Input Parameters
          </h2>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
              ⚠️ {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Latitude */}
            <div>
              <label className={`block text-sm font-semibold mb-2 ${subTextColor}`}>
                Latitude (°N)
              </label>
              <input
                type="number"
                step="0.0001"
                value={inputs.latitude}
                onChange={(e) => setInputs({ ...inputs, latitude: parseFloat(e.target.value) || 0 })}
                className={`w-full px-4 py-3 ${inputBg} rounded-lg border ${inputBorder} focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50 outline-none transition-all`}
                placeholder="e.g., 21.2514"
              />
              <p className={`text-xs ${isDay ? "text-slate-500" : "text-blue-300"} mt-1`}>
                NIT Raipur: 21.2514°N
              </p>
            </div>

            {/* Longitude */}
            <div>
              <label className={`block text-sm font-semibold mb-2 ${subTextColor}`}>
                Longitude (°E)
              </label>
              <input
                type="number"
                step="0.0001"
                value={inputs.longitude}
                onChange={(e) => setInputs({ ...inputs, longitude: parseFloat(e.target.value) || 0 })}
                className={`w-full px-4 py-3 ${inputBg} rounded-lg border ${inputBorder} focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50 outline-none transition-all`}
                placeholder="e.g., 81.6296"
              />
              <p className={`text-xs ${isDay ? "text-slate-500" : "text-blue-300"} mt-1`}>
                NIT Raipur: 81.6296°E
              </p>
            </div>

            {/* Date Picker */}
            <div>
              <label className={`block text-sm font-semibold mb-2 ${subTextColor}`}>
                Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal px-4 py-3 h-auto ${inputBg} border ${inputBorder} hover:bg-white/30`}
                  >
                    <CalendarLucide className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
              <p className={`text-xs ${isDay ? "text-slate-500" : "text-blue-300"} mt-1`}>
                Day {inputs.dayOfYear} of {date?.getFullYear()}
              </p>
            </div>

            {/* Climate Zone */}
            <div>
              <label className={`block text-sm font-semibold mb-2 ${subTextColor}`}>
                Climate Zone
              </label>
              <select
                value={inputs.climateZone}
                onChange={(e) => setInputs({ ...inputs, climateZone: e.target.value })}
                className={`w-full px-4 py-3 ${inputBg} rounded-lg border ${inputBorder} focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50 outline-none transition-all`}
              >
                {Object.entries(climateZones).map(([key, zone]) => (
                  <option
                    key={key}
                    value={key}
                    className={isDay ? "bg-gray-200 text-black" : "bg-gray-900 text-white"}
                  >
                    {zone.name}
                  </option>
                ))}
              </select>
              <p className={`text-xs ${isDay ? "text-slate-500" : "text-blue-300"} mt-1`}>
                Raipur: Composite Zone
              </p>
            </div>

            {/* Available Area */}
            <div>
              <label className={`block text-sm font-semibold mb-2 ${subTextColor}`}>
                Available Roof Area (m²)
              </label>
              <input
                type="number"
                min="10"
                value={inputs.availableArea}
                onChange={(e) => setInputs({ ...inputs, availableArea: parseInt(e.target.value) || 50 })}
                className={`w-full px-4 py-3 ${inputBg} rounded-lg border ${inputBorder} focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50 outline-none transition-all`}
                placeholder="e.g., 100"
              />
              <p className={`text-xs ${isDay ? "text-slate-500" : "text-blue-300"} mt-1`}>
                Typical HIG house: 80-150 m²
              </p>
            </div>

            {/* Altitude */}
            <div>
              <label className={`block text-sm font-semibold mb-2 ${subTextColor}`}>
                Altitude (m) - Optional
              </label>
              <input
                type="number"
                min="0"
                value={inputs.altitude}
                onChange={(e) => setInputs({ ...inputs, altitude: parseInt(e.target.value) || 0 })}
                className={`w-full px-4 py-3 ${inputBg} rounded-lg border ${inputBorder} focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50 outline-none transition-all`}
                placeholder="e.g., 298"
              />
              <p className={`text-xs ${isDay ? "text-slate-500" : "text-blue-300"} mt-1`}>
                NIT Raipur: 298m elevation
              </p>
            </div>
          </div>

          {/* Calculate Button */}
          <div className="mt-8 text-center">
            <button
              onClick={calculateResults}
              disabled={isCalculating}
              className={`px-12 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto ${isCalculating ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Zap className="w-5 h-5" />
              {isCalculating ? "Calculating..." : "Calculate Optimal Configuration"}
            </button>
          </div>
        </div>

        {/* Results Section */}
        {showResults && results && (
          <div className="space-y-8 animate-fade-in">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl p-6 shadow-xl text-gray-900">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">Optimal Tilt Angle</h3>
                  <TrendingUp className="w-6 h-6" />
                </div>
                <p className="text-4xl font-bold">{results.tiltAngles.recommended.toFixed(1)}°</p>
                <p className="text-sm text-gray-800 mt-2">
                  For {format(date, "do MMMM yyyy")}
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 shadow-xl text-white">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">Solar Irradiance</h3>
                  <Sun className="w-6 h-6" />
                </div>
                <p className="text-4xl font-bold">{(results.solarParams.GHI / 1000).toFixed(2)}</p>
                <p className="text-sm text-blue-100 mt-2">kWh/m²/day (GHI)</p>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl p-6 shadow-xl text-white">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">System Capacity</h3>
                  <Activity className="w-6 h-6" />
                </div>
                <p className="text-4xl font-bold">{results.systemCapacity.toFixed(2)}</p>
                <p className="text-sm text-green-100 mt-2">kW ({results.numberOfPanels} panels)</p>
              </div>
            </div>

            {/* Tilt vs Radiation Graph */}
            <div className={`${cardBg} backdrop-blur-lg rounded-2xl p-8 shadow-2xl border ${cardBorder}`}>
              <h3 className="text-2xl font-bold mb-6">Tilt Angle vs Solar Radiation</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={results.tiltRadiationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDay ? "#00000030" : "#ffffff30"} />
                  <XAxis
                    dataKey="tilt"
                    stroke={chartStrokeColor}
                    label={{ value: "Tilt Angle (°)", position: "insideBottom", offset: -5, fill: chartStrokeColor }}
                  />
                  <YAxis
                    stroke={chartStrokeColor}
                    label={{ value: "Solar Radiation (kWh/m²/day)", angle: -90, position: "insideLeft", fill: chartStrokeColor }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDay ? "#f1f5f9" : "#1e293b",
                      color: isDay ? "#1e293b" : "#f1f5f9",
                      border: "none",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="irradiance"
                    stroke="#fbbf24"
                    strokeWidth={3}
                    name="Solar Radiation"
                    dot={{ fill: "#fbbf24", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Annual Energy Profile */}
            <div className={`${cardBg} backdrop-blur-lg rounded-2xl p-8 shadow-2xl border ${cardBorder}`}>
              <h3 className="text-2xl font-bold mb-6">Annual Energy Generation Profile</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={results.yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDay ? "#00000030" : "#ffffff30"} />
                  <XAxis dataKey="month" stroke={chartStrokeColor} />
                  <YAxis
                    yAxisId="left"
                    stroke={chartStrokeColor}
                    label={{ value: "Energy (kWh)", angle: -90, position: "insideLeft", fill: chartStrokeColor }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke={chartStrokeColor}
                    label={{ value: "Tilt (°)", angle: 90, position: "insideRight", fill: chartStrokeColor }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDay ? "#f1f5f9" : "#1e293b",
                      color: isDay ? "#1e293b" : "#f1f5f9",
                      border: "none",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="energy"
                    stroke="#34d399"
                    strokeWidth={3}
                    name="Monthly Energy (kWh)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="tilt"
                    stroke="#fbbf24"
                    strokeWidth={3}
                    name="Optimal Tilt (°)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Detailed Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Tilt Angles */}
              <div className={`${cardBg} backdrop-blur-lg rounded-xl p-6 shadow-xl border ${cardBorder}`}>
                <h4 className="text-lg font-bold mb-4 text-yellow-400">Tilt Angle Analysis</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className={subTextColor}>Daily Optimal:</span>
                    <span className="font-semibold">{results.tiltAngles.recommended.toFixed(1)}°</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={subTextColor}>Seasonal Approx:</span>
                    <span className="font-semibold">{results.tiltAngles.seasonal.toFixed(1)}°</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={subTextColor}>Annual (Fixed):</span>
                    <span className="font-semibold">{results.tiltAngles.annual.toFixed(1)}°</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={subTextColor}>Summer (Fixed):</span>
                    <span className="font-semibold">{results.tiltAngles.summer.toFixed(1)}°</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={subTextColor}>Winter (Fixed):</span>
                    <span className="font-semibold">{results.tiltAngles.winter.toFixed(1)}°</span>
                  </div>
                </div>
              </div>

              {/* System Configuration */}
              <div className={`${cardBg} backdrop-blur-lg rounded-xl p-6 shadow-xl border ${cardBorder}`}>
                <h4 className="text-lg font-bold mb-4 text-green-400">System Configuration</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className={subTextColor}>Panel Wattage:</span>
                    <span className="font-semibold">{results.panelWattage}W</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={subTextColor}>Panel Efficiency:</span>
                    <span className="font-semibold">{results.panelEfficiency.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={subTextColor}>System Loss:</span>
                    <span className="font-semibold">{results.systemLoss.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={subTextColor}>Number of Panels:</span>
                    <span className="font-semibold">{results.numberOfPanels}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={subTextColor}>Utilized Area:</span>
                    <span className="font-semibold">{results.actualArea.toFixed(1)} m²</span>
                  </div>
                </div>
              </div>

              {/* Energy Generation */}
              <div className={`${cardBg} backdrop-blur-lg rounded-xl p-6 shadow-xl border ${cardBorder}`}>
                <h4 className="text-lg font-bold mb-4 text-blue-400">Energy Generation</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className={subTextColor}>Daily:</span>
                    <span className="font-semibold">{results.dailyEnergy.toFixed(2)} kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={subTextColor}>Monthly:</span>
                    <span className="font-semibold">{results.monthlyEnergy.toFixed(2)} kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={subTextColor}>Annual:</span>
                    <span className="font-semibold">{results.annualEnergy.toFixed(0)} kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={subTextColor}>Capacity Factor:</span>
                    <span className="font-semibold">{results.capacityFactor.toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              {/* Solar Parameters */}
              <div className={`${cardBg} backdrop-blur-lg rounded-xl p-6 shadow-xl border ${cardBorder}`}>
                <h4 className="text-lg font-bold mb-4 text-purple-400">ASHRAE Solar Data</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className={subTextColor}>Solar Declination:</span>
                    <span className="font-semibold">{results.solarParams.declination.toFixed(2)}°</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={subTextColor}>Solar Altitude:</span>
                    <span className="font-semibold">{results.solarParams.solarAltitude.toFixed(2)}°</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={subTextColor}>Air Mass:</span>
                    <span className="font-semibold">{results.solarParams.airMass.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={subTextColor}>DNI:</span>
                    <span className="font-semibold">{results.solarParams.DNI.toFixed(0)} W/m²</span>
                  </div>
                </div>
              </div>

              {/* Environmental Impact */}
              <div className={`${cardBg} backdrop-blur-lg rounded-xl p-6 shadow-xl border ${cardBorder}`}>
                <h4 className="text-lg font-bold mb-4 text-green-400">Environmental Impact</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className={subTextColor}>CO₂ Offset/Year:</span>
                    <span className="font-semibold">{(results.co2OffsetAnnual / 1000).toFixed(2)} tons</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={subTextColor}>Trees Equivalent:</span>
                    <span className="font-semibold">{Math.round(results.treesEquivalent)} trees</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={subTextColor}>Coal Saved/Year:</span>
                    <span className="font-semibold">{(results.coalSaved / 1000).toFixed(2)} tons</span>
                  </div>
                </div>
              </div>

              {/* Performance Recommendations */}
              <div className={`${cardBg} backdrop-blur-lg rounded-xl p-6 shadow-xl border ${cardBorder}`}>
                <h4 className="text-lg font-bold mb-4 text-orange-400">Recommendations</h4>
                <ul className={`space-y-2 text-sm ${subTextColor}`}>
                  <li>✓ Adjust tilt seasonally for +8% gain</li>
                  <li>✓ Clean panels monthly for optimal output</li>
                  <li>✓ South-facing orientation preferred</li>
                  <li>✓ Avoid shading from 10 AM - 2 PM</li>
                  <li>✓ Monitor performance quarterly</li>
                </ul>
              </div>
            </div>

            {/* Footer Info */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-center text-white">
              <p className="text-lg font-semibold mb-2">
                🎓 Project by: Aditya Dudhe, Arikathota Karthik, Abhishek Kumar Roy
              </p>
              <p className="text-sm text-blue-200">
                Department of Mechanical Engineering | NIT Raipur | Guided by: Dr. A. K. Tiwari
              </p>
              <p className="text-xs text-blue-300 mt-2">
                Based on ASHRAE Clear Sky Model | Optimized for Indian Climatic Zones
              </p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SolarCalculator;