
export type ResourceType = "water" | "minerals" | "energy";

export type AlertPriority = "low" | "medium" | "high";

export type Resource = {
  type: ResourceType;
  current: number;
  capacity: number;
  unit: string;
};

export type Infrastructure = {
  hospitals: number;
  schools: number;
  residentialUnits: number;
  transportationHubs: number;
  powerPlants: number;
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
};
