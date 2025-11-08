import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator as CalculatorIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

type ResultsState = {
  tiltAngle: string;
  annualTilt: string;
  seasonalAdj: string;
  irradiance: string;
  panelConfig: string;
  energyGen: string;
};

const CalculatorPage = () => {
  const [latitude, setLatitude] = useState<number | "">("");
  const [climaticZone, setClimaticZone] = useState("");
  const [area, setArea] = useState<number | "">("");
  const [month, setMonth] = useState("1");
  const [results, setResults] = useState<ResultsState | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (latitude === "" || area === "" || !climaticZone) return;

    const latNum = Number(latitude);
    const areaNum = Number(area);
    const monthNum = parseInt(month);

    const dayOfYear = (monthNum - 1) * 30.5 + 15;
    const declination = 23.45 * Math.sin(((360 / 365) * (dayOfYear - 81) * Math.PI) / 180);
    const monthlyTilt = latNum - declination;
    const annualTilt = latNum;

    let seasonalAdjustment;
    if (monthNum >= 3 && monthNum <= 5) {
      seasonalAdjustment = "Spring/Summer: Reduce tilt by ~15° from annual optimal";
    } else if (monthNum >= 6 && monthNum <= 8) {
      seasonalAdjustment = "Summer/Monsoon: Reduce tilt by ~15° from annual optimal";
    } else if (monthNum >= 9 && monthNum <= 11) {
      seasonalAdjustment = "Autumn: Use annual optimal tilt";
    } else {
      seasonalAdjustment = "Winter: Increase tilt by ~15° from annual optimal";
    }

    const zoneFactors: { [key: string]: number } = {
      'hot-dry': 6.5, 'warm-humid': 5.2, 'moderate': 5.8,
      'cold-sunny': 6.0, 'cold-cloudy': 4.5, 'composite': 5.5
    };
    const baseIrradiance = zoneFactors[climaticZone] || 5.5;
    const tiltCorrectionFactor = 1.12;
    const estimatedIrradiance = (baseIrradiance * tiltCorrectionFactor).toFixed(2);

    const panelArea = 1.6; // Average area of a residential solar panel
    const maxPanels = Math.floor(areaNum / panelArea);
    const panelWattage = 330; // Average wattage
    const systemEfficiency = 0.75; // Includes inverter, wiring, and other losses
    const annualEnergy = ((maxPanels * panelWattage * baseIrradiance * 365 * systemEfficiency) / 1000).toFixed(0);

    setResults({
      tiltAngle: Math.round(monthlyTilt).toString(),
      annualTilt: Math.round(annualTilt).toString(),
      seasonalAdj: seasonalAdjustment,
      irradiance: estimatedIrradiance,
      panelConfig: `${maxPanels} panels × ${panelWattage}W ≈ ${(maxPanels * panelWattage / 1000).toFixed(1)} kW system`,
      energyGen: annualEnergy,
    });
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={containerVariants}
      className="w-full h-full flex items-center justify-center p-4 md:p-8 bg-background"
    >
      <Card className="w-full max-w-5xl bg-card/80 backdrop-blur-sm border-primary/20 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-primary">
            Solar Optimization Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCalculate} className="grid md:grid-cols-2 gap-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="latitude">Latitude (degrees)</Label>
                <Input id="latitude" type="number" value={latitude} onChange={(e) => setLatitude(e.target.value === '' ? '' : parseFloat(e.target.value))} required placeholder="e.g., 21.25 for Raipur" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="climaticZone">Climatic Zone</Label>
                <Select value={climaticZone} onValueChange={setClimaticZone} required>
                  <SelectTrigger id="climaticZone"><SelectValue placeholder="Select Zone" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hot-dry">Hot & Dry</SelectItem>
                    <SelectItem value="warm-humid">Warm & Humid</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="cold-sunny">Cold & Sunny</SelectItem>
                    <SelectItem value="cold-cloudy">Cold & Cloudy</SelectItem>
                    <SelectItem value="composite">Composite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="area">Available Rooftop Area (sq. meters)</Label>
                <Input id="area" type="number" value={area} onChange={(e) => setArea(e.target.value === '' ? '' : parseFloat(e.target.value))} required placeholder="e.g., 50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="month">Month for Analysis</Label>
                <Select value={month} onValueChange={setMonth} required>
                  <SelectTrigger id="month"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">January</SelectItem><SelectItem value="2">February</SelectItem>
                    <SelectItem value="3">March</SelectItem><SelectItem value="4">April</SelectItem>
                    <SelectItem value="5">May</SelectItem><SelectItem value="6">June</SelectItem>
                    <SelectItem value="7">July</SelectItem><SelectItem value="8">August</SelectItem>
                    <SelectItem value="9">September</SelectItem><SelectItem value="10">October</SelectItem>
                    <SelectItem value="11">November</SelectItem><SelectItem value="12">December</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full text-lg bg-primary hover:bg-primary/90 text-primary-foreground">
                <CalculatorIcon className="mr-2 h-5 w-5" /> Calculate
              </Button>
            </motion.div>
            <motion.div variants={itemVariants}>
              <div className="p-6 bg-muted/50 rounded-lg h-full">
                <h3 className="text-xl font-semibold mb-4 text-foreground">Optimization Results</h3>
                {results ? (
                  <div className="space-y-3">
                    <div className="p-3 bg-card rounded-md shadow-sm">
                      <p className="text-muted-foreground">Optimal Tilt for Selected Month</p>
                      <p className="font-bold text-primary text-2xl">{results.tiltAngle}°</p>
                    </div>
                    <div className="p-3 bg-card rounded-md shadow-sm">
                      <p className="text-muted-foreground">Annual Fixed-Tilt Recommendation</p>
                      <p className="font-bold text-primary text-lg">{results.annualTilt}°</p>
                    </div>
                    <div className="p-3 bg-card rounded-md shadow-sm">
                      <p className="text-muted-foreground">Seasonal Adjustment Strategy</p>
                      <p className="font-bold text-primary text-base">{results.seasonalAdj}</p>
                    </div>
                    <div className="p-3 bg-card rounded-md shadow-sm">
                      <p className="text-muted-foreground">Potential System Configuration</p>
                      <p className="font-bold text-primary text-base">{results.panelConfig}</p>
                    </div>
                    <div className="p-3 bg-card rounded-md shadow-sm">
                      <p className="text-muted-foreground">Estimated Annual Energy Generation</p>
                      <p className="font-bold text-primary text-lg">{results.energyGen} kWh/year</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <p>Enter all values to calculate.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CalculatorPage;