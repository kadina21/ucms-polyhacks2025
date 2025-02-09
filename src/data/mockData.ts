import { Zone, Alert } from "@/types/zone";
import { MaintenanceTask } from "@/types/maintenance";

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

export const mockMaintenanceTasks: MaintenanceTask[] = [
  {
    id: "1",
    zoneId: "alpha",
    title: "UOE System Maintenance",
    description: "Routine maintenance of Underground Optimal Elevator systems",
    type: "routine",
    status: "pending",
    priority: "medium",
    scheduledDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    assignedTo: "Engineering Team A",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    estimatedDuration: "4 hours",
    notes: [],
  },
  {
    id: "2",
    zoneId: "beta",
    title: "Train Track Repair",
    description: "Emergency repair needed on multilevel train track section B-7",
    type: "repair",
    status: "in_progress",
    priority: "high",
    scheduledDate: new Date().toISOString(),
    assignedTo: "Maintenance Team C",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    estimatedDuration: "8 hours",
    notes: ["Material delivery scheduled", "Safety protocols reviewed"],
  },
  {
    id: "3",
    zoneId: "gamma",
    title: "Flying Vehicle Dock Upgrade",
    description: "Upgrade charging stations at two-seater flying vehicle docks",
    type: "upgrade",
    status: "pending",
    priority: "low",
    scheduledDate: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
    assignedTo: "Infrastructure Team B",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    estimatedDuration: "12 hours",
    notes: [],
  },
];
