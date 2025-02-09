
export type ResourceType = "water" | "minerals" | "energy";

export type AlertPriority = "low" | "medium" | "high";

export type RequestCategory = "water" | "electricity" | "temperature" | "communication";
export type RequestStatus = "open" | "in_progress" | "resolved" | "closed";

export type MaintenanceRequest = {
  id: string;
  title: string;
  description: string | null;
  category: RequestCategory;
  status: RequestStatus;
  zoneId: string;
  createdAt: string;
  updatedAt: string | null;
  resolvedAt: string | null;
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
  maintenanceRequests: MaintenanceRequest[];
};
