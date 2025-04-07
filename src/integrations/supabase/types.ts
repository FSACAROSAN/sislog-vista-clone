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
      bodegas: {
        Row: {
          centro_logistico_id: string
          created_at: string | null
          estado: string | null
          id: string
          nombre: string
          updated_at: string | null
        }
        Insert: {
          centro_logistico_id: string
          created_at?: string | null
          estado?: string | null
          id?: string
          nombre: string
          updated_at?: string | null
        }
        Update: {
          centro_logistico_id?: string
          created_at?: string | null
          estado?: string | null
          id?: string
          nombre?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bodegas_centro_logistico_id_fkey"
            columns: ["centro_logistico_id"]
            isOneToOne: false
            referencedRelation: "centro_logistico"
            referencedColumns: ["id"]
          },
        ]
      }
      centro_logistico: {
        Row: {
          ciudad_id: string
          created_at: string | null
          estado: string | null
          id: string
          nombre: string
          pais_id: string
          updated_at: string | null
        }
        Insert: {
          ciudad_id: string
          created_at?: string | null
          estado?: string | null
          id?: string
          nombre: string
          pais_id: string
          updated_at?: string | null
        }
        Update: {
          ciudad_id?: string
          created_at?: string | null
          estado?: string | null
          id?: string
          nombre?: string
          pais_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "centro_logistico_ciudad_id_fkey"
            columns: ["ciudad_id"]
            isOneToOne: false
            referencedRelation: "ciudades"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "centro_logistico_pais_id_fkey"
            columns: ["pais_id"]
            isOneToOne: false
            referencedRelation: "paises"
            referencedColumns: ["id"]
          },
        ]
      }
      ciudades: {
        Row: {
          created_at: string | null
          estado: string | null
          id: string
          nombre: string
          pais_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          estado?: string | null
          id?: string
          nombre: string
          pais_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          estado?: string | null
          id?: string
          nombre?: string
          pais_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ciudades_pais_id_fkey"
            columns: ["pais_id"]
            isOneToOne: false
            referencedRelation: "paises"
            referencedColumns: ["id"]
          },
        ]
      }
      empresas: {
        Row: {
          correo: string | null
          created_at: string | null
          estado: string | null
          fecha_creacion: string | null
          id: string
          nombre: string
          telefono: string | null
          updated_at: string | null
        }
        Insert: {
          correo?: string | null
          created_at?: string | null
          estado?: string | null
          fecha_creacion?: string | null
          id?: string
          nombre: string
          telefono?: string | null
          updated_at?: string | null
        }
        Update: {
          correo?: string | null
          created_at?: string | null
          estado?: string | null
          fecha_creacion?: string | null
          id?: string
          nombre?: string
          telefono?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      paises: {
        Row: {
          codigo: number
          created_at: string | null
          estado: string | null
          id: string
          iso2: string
          iso3: string
          nombre_en: string
          nombre_es: string
          updated_at: string | null
        }
        Insert: {
          codigo: number
          created_at?: string | null
          estado?: string | null
          id?: string
          iso2: string
          iso3: string
          nombre_en: string
          nombre_es: string
          updated_at?: string | null
        }
        Update: {
          codigo?: number
          created_at?: string | null
          estado?: string | null
          id?: string
          iso2?: string
          iso3?: string
          nombre_en?: string
          nombre_es?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      stands: {
        Row: {
          bodega_id: string
          created_at: string | null
          estado: string | null
          id: string
          nombre: string
          updated_at: string | null
        }
        Insert: {
          bodega_id: string
          created_at?: string | null
          estado?: string | null
          id?: string
          nombre: string
          updated_at?: string | null
        }
        Update: {
          bodega_id?: string
          created_at?: string | null
          estado?: string | null
          id?: string
          nombre?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stands_bodega_id_fkey"
            columns: ["bodega_id"]
            isOneToOne: false
            referencedRelation: "bodegas"
            referencedColumns: ["id"]
          },
        ]
      }
      tarifas_generales: {
        Row: {
          created_at: string | null
          estado: string | null
          id: string
          nombre: string
          precio: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          estado?: string | null
          id?: string
          nombre: string
          precio: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          estado?: string | null
          id?: string
          nombre?: string
          precio?: number
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
