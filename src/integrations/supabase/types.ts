export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          created_at: string
          entity_id: string | null
          entity_type: string
          id: string
          new_value: Json | null
          old_value: Json | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          entity_id?: string | null
          entity_type: string
          id?: string
          new_value?: Json | null
          old_value?: Json | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          id?: string
          new_value?: Json | null
          old_value?: Json | null
          user_id?: string | null
        }
        Relationships: []
      }
      client_memory: {
        Row: {
          client_id: string
          created_at: string
          expires_at: string | null
          id: string
          key: string
          memory_type: Database["public"]["Enums"]["memory_type"]
          relevance_score: number | null
          updated_at: string
          value: Json
        }
        Insert: {
          client_id: string
          created_at?: string
          expires_at?: string | null
          id?: string
          key: string
          memory_type: Database["public"]["Enums"]["memory_type"]
          relevance_score?: number | null
          updated_at?: string
          value: Json
        }
        Update: {
          client_id?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          key?: string
          memory_type?: Database["public"]["Enums"]["memory_type"]
          relevance_score?: number | null
          updated_at?: string
          value?: Json
        }
        Relationships: [
          {
            foreignKeyName: "client_memory_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      client_profiles: {
        Row: {
          buyer_psychology: Json | null
          client_id: string
          created_at: string
          do_not_say: string[] | null
          id: string
          notes: string | null
          preferred_structure: string | null
          risk_level: string | null
          updated_at: string
          voice_preferences: Json | null
          winning_patterns: Json | null
        }
        Insert: {
          buyer_psychology?: Json | null
          client_id: string
          created_at?: string
          do_not_say?: string[] | null
          id?: string
          notes?: string | null
          preferred_structure?: string | null
          risk_level?: string | null
          updated_at?: string
          voice_preferences?: Json | null
          winning_patterns?: Json | null
        }
        Update: {
          buyer_psychology?: Json | null
          client_id?: string
          created_at?: string
          do_not_say?: string[] | null
          id?: string
          notes?: string | null
          preferred_structure?: string | null
          risk_level?: string | null
          updated_at?: string
          voice_preferences?: Json | null
          winning_patterns?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "client_profiles_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: true
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          created_at: string
          id: string
          industry: string | null
          name: string
          offer_type: string | null
          settings: Json | null
          updated_at: string
          website: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          industry?: string | null
          name: string
          offer_type?: string | null
          settings?: Json | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          industry?: string | null
          name?: string
          offer_type?: string | null
          settings?: Json | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      prompt_runs: {
        Row: {
          client_id: string | null
          created_at: string
          feedback: string | null
          human_rating: number | null
          id: string
          inputs: Json | null
          metrics: Json | null
          output: string | null
          prompt_template_id: string | null
          template_version: number | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          feedback?: string | null
          human_rating?: number | null
          id?: string
          inputs?: Json | null
          metrics?: Json | null
          output?: string | null
          prompt_template_id?: string | null
          template_version?: number | null
        }
        Update: {
          client_id?: string | null
          created_at?: string
          feedback?: string | null
          human_rating?: number | null
          id?: string
          inputs?: Json | null
          metrics?: Json | null
          output?: string | null
          prompt_template_id?: string | null
          template_version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "prompt_runs_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prompt_runs_prompt_template_id_fkey"
            columns: ["prompt_template_id"]
            isOneToOne: false
            referencedRelation: "prompt_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      prompt_templates: {
        Row: {
          client_id: string | null
          constraints: Json | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          intent_tags: string[] | null
          name: string
          output_schema: Json | null
          parent_version_id: string | null
          performance_score: number | null
          scope: Database["public"]["Enums"]["prompt_scope"]
          status: Database["public"]["Enums"]["prompt_status"]
          template: string
          updated_at: string
          variables: Json | null
          version: number
        }
        Insert: {
          client_id?: string | null
          constraints?: Json | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          intent_tags?: string[] | null
          name: string
          output_schema?: Json | null
          parent_version_id?: string | null
          performance_score?: number | null
          scope?: Database["public"]["Enums"]["prompt_scope"]
          status?: Database["public"]["Enums"]["prompt_status"]
          template: string
          updated_at?: string
          variables?: Json | null
          version?: number
        }
        Update: {
          client_id?: string | null
          constraints?: Json | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          intent_tags?: string[] | null
          name?: string
          output_schema?: Json | null
          parent_version_id?: string | null
          performance_score?: number | null
          scope?: Database["public"]["Enums"]["prompt_scope"]
          status?: Database["public"]["Enums"]["prompt_status"]
          template?: string
          updated_at?: string
          variables?: Json | null
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "prompt_templates_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prompt_templates_parent_version_id_fkey"
            columns: ["parent_version_id"]
            isOneToOne: false
            referencedRelation: "prompt_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      memory_type: "episodic" | "semantic"
      prompt_scope: "global" | "domain" | "client"
      prompt_status:
        | "draft"
        | "active"
        | "deprecated"
        | "champion"
        | "challenger"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      memory_type: ["episodic", "semantic"],
      prompt_scope: ["global", "domain", "client"],
      prompt_status: [
        "draft",
        "active",
        "deprecated",
        "champion",
        "challenger",
      ],
    },
  },
} as const
