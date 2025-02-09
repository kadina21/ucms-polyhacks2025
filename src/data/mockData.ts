
import { Zone, Alert, MaintenanceRequest } from "@/types/zone";

export const mockMaintenanceRequests: MaintenanceRequest[] = [
  {
    id: "1",
    title: "Fix Water Filtration System",
    description: "Regular maintenance needed for water filtration system in sector A",
    status: "pending",
    priority: "high",
    zoneId: "alpha",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    title: "Transport Hub Inspection",
    description: "Scheduled inspection of main transport hub",
    status: "in_progress",
    priority: "medium",
    zoneId: "beta",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    title: "Power Grid Maintenance",
    description: "Regular maintenance of power distribution grid",
    status: "completed",
    priority: "low",
    zoneId: "gamma",
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

export const mockZones: Zone[] = [
  {
    id: "alpha",
    name: "Alpha Zone",
    maturityScore: 85,
    resources: [
      { type: "water", current: 75000, capacity: 100000, unit: "m³" },
      { type: "minerals", current: 45000, capacity: 60000, unit: "tons" },
      { type: "energy", current: 8500, capacity: 10000, unit: "MWh" },
    ],
    infrastructure: {
      hospitals: 3,
      schools: 8,
      residentialUnits: 2500,
      transportationHubs: 5,
      powerPlants: 2,
      transportation: {
        uoeCount: 12,
        multilevelTrains: 8,
        flyingVehicles: 250,
        accessibilityRate: 95,
      },
    },
    demographics: {
      totalPopulation: 25000,
      growthRate: 2.5,
      density: 125,
      ageDistribution: {
        under18: 28,
        adults: 58,
        seniors: 14,
      },
    },
    environment: {
      airQuality: 92,
      waterQuality: 88,
      seismicStability: 95,
      temperatureControl: 90,
    },
    alerts: [],
    maintenanceRequests: mockMaintenanceRequests.filter(req => req.zoneId === "alpha"),
  },
  {
    id: "beta",
    name: "Beta Zone",
    maturityScore: 72,
    resources: [
      { type: "water", current: 45000, capacity: 80000, unit: "m³" },
      { type: "minerals", current: 25000, capacity: 50000, unit: "tons" },
      { type: "energy", current: 5500, capacity: 8000, unit: "MWh" },
    ],
    infrastructure: {
      hospitals: 2,
      schools: 5,
      residentialUnits: 1800,
      transportationHubs: 3,
      powerPlants: 1,
      transportation: {
        uoeCount: 8,
        multilevelTrains: 5,
        flyingVehicles: 150,
        accessibilityRate: 88,
      },
    },
    demographics: {
      totalPopulation: 18000,
      growthRate: 3.2,
      density: 150,
      ageDistribution: {
        under18: 32,
        adults: 55,
        seniors: 13,
      },
    },
    environment: {
      airQuality: 85,
      waterQuality: 82,
      seismicStability: 88,
      temperatureControl: 87,
    },
    alerts: [],
    maintenanceRequests: mockMaintenanceRequests.filter(req => req.zoneId === "beta"),
  },
  {
    id: "gamma",
    name: "Gamma Zone",
    maturityScore: 65,
    resources: [
      { type: "water", current: 25000, capacity: 60000, unit: "m³" },
      { type: "minerals", current: 15000, capacity: 40000, unit: "tons" },
      { type: "energy", current: 3500, capacity: 6000, unit: "MWh" },
    ],
    infrastructure: {
      hospitals: 1,
      schools: 3,
      residentialUnits: 1200,
      transportationHubs: 2,
      powerPlants: 1,
      transportation: {
        uoeCount: 5,
        multilevelTrains: 3,
        flyingVehicles: 80,
        accessibilityRate: 75,
      },
    },
    demographics: {
      totalPopulation: 12000,
      growthRate: 4.1,
      density: 180,
      ageDistribution: {
        under18: 35,
        adults: 54,
        seniors: 11,
      },
    },
    environment: {
      airQuality: 78,
      waterQuality: 75,
      seismicStability: 82,
      temperatureControl: 80,
    },
    alerts: [],
    maintenanceRequests: mockMaintenanceRequests.filter(req => req.zoneId === "gamma"),
  },
];

export const mockAlerts: Alert[] = [
  {
    id: "1",
    title: "Low Water Reserves",
    message: "Water reserves in Gamma Zone falling below 45% capacity",
    priority: "high",
    zoneId: "gamma",
    timestamp: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Population Density Warning",
    message: "Beta Zone approaching maximum recommended population density",
    priority: "medium",
    zoneId: "beta",
    timestamp: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Maintenance Required",
    message: "Routine maintenance needed for Alpha Zone transportation systems",
    priority: "low",
    zoneId: "alpha",
    timestamp: new Date().toISOString(),
  },
];
