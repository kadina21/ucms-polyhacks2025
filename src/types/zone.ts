
export type ResourceType = "water" | "minerals" | "energy";

export type AlertPriority = "low" | "medium" | "high";

export type MaintenanceRequestStatus = "pending" | "in_progress" | "completed";
export type MaintenanceRequestPriority = "low" | "medium" | "high";

export type MaintenanceRequest = {
  id: string;
  title: string;
  description: string | null;
  status: MaintenanceRequestStatus;
  priority: MaintenanceRequestPriority;
  zoneId: string;
  createdAt: string;
  updatedAt: string;
};

export type Alert = {
  id: string;
  title: string;
  message: string;
  priority: AlertPriority;
  zoneId: string;
  timestamp: string;
};

export type Resource = {
  type: ResourceType;
  current: number;
  capacity: number;
  unit: string;
};

export type Transportation = {
  uoeCount: number;
  multilevelTrains: number;
  flyingVehicles: number;
  accessibilityRate: number;
};

export type Infrastructure = {
  hospitals: number;
  schools: number;
  residentialUnits: number;
  transportationHubs: number;
  powerPlants: number;
  transportation: Transportation;
};

export type Demographics = {
  totalPopulation: number;
  growthRate: number;
  density: number;
  ageDistribution: {
    under18: number;
    adults: number;
    seniors: number;
  };
};

export type Environment = {
  airQuality: number;
  waterQuality: number;
  seismicStability: number;
  temperatureControl: number;
};

export type Zone = {
  id: string;
  name: string;
  maturityScore: number;
  resources: Resource[];
  infrastructure: Infrastructure;
  demographics: Demographics;
  environment: Environment;
  alerts: Alert[];
  maintenanceRequests?: MaintenanceRequest[];
};

