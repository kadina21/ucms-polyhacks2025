
import { useState, useEffect } from "react";
import { Zone } from "@/types/zone";
import { supabase } from "@/integrations/supabase/client";

export const useZoneData = (id: string | undefined) => {
  const [zone, setZone] = useState<Zone | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchZoneDetails = async () => {
    if (!id) return;

    try {
      const { data: zoneData, error: zoneError } = await supabase
        .from('zone_details')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (zoneError) {
        console.error("Error fetching zone details:", zoneError);
        return;
      }

      if (!zoneData) {
        console.error("Zone not found");
        return;
      }

      const { data: resourcesData, error: resourcesError } = await supabase
        .from('zone_resources')
        .select('resources')
        .eq('zone_id', id)
        .maybeSingle();

      if (resourcesError) {
        console.error("Error fetching resources:", resourcesError);
        return;
      }

      const completeZone: Zone = {
        id: zoneData.id,
        name: zoneData.name,
        maturityScore: zoneData.maturity_score,
        demographics: {
          totalPopulation: zoneData.total_population,
          growthRate: zoneData.growth_rate,
          density: zoneData.density,
          ageDistribution: {
            under18: Math.round((zoneData.under_18_population / zoneData.total_population) * 100),
            adults: Math.round((zoneData.adults_population / zoneData.total_population) * 100),
            seniors: Math.round((zoneData.seniors_population / zoneData.total_population) * 100),
          },
        },
        environment: {
          airQuality: zoneData.air_quality,
          waterQuality: zoneData.water_quality,
          seismicStability: zoneData.seismic_stability,
          temperatureControl: zoneData.temperature_control,
        },
        infrastructure: {
          hospitals: zoneData.hospitals,
          schools: zoneData.schools,
          residentialUnits: zoneData.residential_units,
          transportationHubs: zoneData.transportation_hubs,
          powerPlants: zoneData.power_plants,
        },
        resources: resourcesData?.resources as Zone['resources'] || [],
      };

      setZone(completeZone);
    } catch (error) {
      console.error("Error fetching zone data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchZoneDetails();
  }, [id]);

  return { zone, isLoading };
};
