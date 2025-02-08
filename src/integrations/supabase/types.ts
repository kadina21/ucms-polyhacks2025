export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      alerts: {
        Row: {
          created_at: string | null
          id: string
          message: string
          priority: Database["public"]["Enums"]["alert_priority"]
          timestamp: string | null
          title: string
          updated_at: string | null
          zone_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          priority: Database["public"]["Enums"]["alert_priority"]
          timestamp?: string | null
          title: string
          updated_at?: string | null
          zone_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          priority?: Database["public"]["Enums"]["alert_priority"]
          timestamp?: string | null
          title?: string
          updated_at?: string | null
          zone_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "alerts_zone_id_fkey"
            columns: ["zone_id"]
            isOneToOne: false
            referencedRelation: "zones"
            referencedColumns: ["id"]
          },
        ]
      }
      demographics: {
        Row: {
          adults_population: number
          created_at: string | null
          density: number
          growth_rate: number
          id: string
          seniors_population: number
          total_population: number
          under_18_population: number
          updated_at: string | null
          zone_id: string | null
        }
        Insert: {
          adults_population?: number
          created_at?: string | null
          density?: number
          growth_rate?: number
          id?: string
          seniors_population?: number
          total_population?: number
          under_18_population?: number
          updated_at?: string | null
          zone_id?: string | null
        }
        Update: {
          adults_population?: number
          created_at?: string | null
          density?: number
          growth_rate?: number
          id?: string
          seniors_population?: number
          total_population?: number
          under_18_population?: number
          updated_at?: string | null
          zone_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "demographics_zone_id_fkey"
            columns: ["zone_id"]
            isOneToOne: true
            referencedRelation: "zones"
            referencedColumns: ["id"]
          },
        ]
      }
      environment: {
        Row: {
          air_quality: number
          created_at: string | null
          id: string
          seismic_stability: number
          temperature_control: number
          updated_at: string | null
          water_quality: number
          zone_id: string | null
        }
        Insert: {
          air_quality?: number
          created_at?: string | null
          id?: string
          seismic_stability?: number
          temperature_control?: number
          updated_at?: string | null
          water_quality?: number
          zone_id?: string | null
        }
        Update: {
          air_quality?: number
          created_at?: string | null
          id?: string
          seismic_stability?: number
          temperature_control?: number
          updated_at?: string | null
          water_quality?: number
          zone_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "environment_zone_id_fkey"
            columns: ["zone_id"]
            isOneToOne: true
            referencedRelation: "zones"
            referencedColumns: ["id"]
          },
        ]
      }
      infrastructure: {
        Row: {
          created_at: string | null
          hospitals: number
          id: string
          power_plants: number
          residential_units: number
          schools: number
          transportation_hubs: number
          updated_at: string | null
          zone_id: string | null
        }
        Insert: {
          created_at?: string | null
          hospitals?: number
          id?: string
          power_plants?: number
          residential_units?: number
          schools?: number
          transportation_hubs?: number
          updated_at?: string | null
          zone_id?: string | null
        }
        Update: {
          created_at?: string | null
          hospitals?: number
          id?: string
          power_plants?: number
          residential_units?: number
          schools?: number
          transportation_hubs?: number
          updated_at?: string | null
          zone_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "infrastructure_zone_id_fkey"
            columns: ["zone_id"]
            isOneToOne: true
            referencedRelation: "zones"
            referencedColumns: ["id"]
          },
        ]
      }
      resources: {
        Row: {
          capacity: number
          created_at: string | null
          current: number
          id: string
          type: Database["public"]["Enums"]["resource_type"]
          unit: string
          updated_at: string | null
          zone_id: string | null
        }
        Insert: {
          capacity: number
          created_at?: string | null
          current: number
          id?: string
          type: Database["public"]["Enums"]["resource_type"]
          unit: string
          updated_at?: string | null
          zone_id?: string | null
        }
        Update: {
          capacity?: number
          created_at?: string | null
          current?: number
          id?: string
          type?: Database["public"]["Enums"]["resource_type"]
          unit?: string
          updated_at?: string | null
          zone_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resources_zone_id_fkey"
            columns: ["zone_id"]
            isOneToOne: false
            referencedRelation: "zones"
            referencedColumns: ["id"]
          },
        ]
      }
      zones: {
        Row: {
          created_at: string | null
          id: string
          maturity_score: number
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          maturity_score: number
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          maturity_score?: number
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      alert_priority: "low" | "medium" | "high"
      resource_type: "water" | "minerals" | "energy"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
