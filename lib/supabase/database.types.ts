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
      ad_products: {
        Row: {
          ad_zone: string
          created_at: string
          credit_cost_2month: number
          credit_cost_3month: number
          credit_cost_6month: number
          credit_cost_monthly: number
          credit_cost_yearly: number
          description: string
          icon_key: string
          id: string
          is_active: boolean
          name: string
          slug: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          ad_zone?: string
          created_at?: string
          credit_cost_2month?: number
          credit_cost_3month?: number
          credit_cost_6month?: number
          credit_cost_monthly: number
          credit_cost_yearly?: number
          description?: string
          icon_key?: string
          id?: string
          is_active?: boolean
          name: string
          slug: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          ad_zone?: string
          created_at?: string
          credit_cost_2month?: number
          credit_cost_3month?: number
          credit_cost_6month?: number
          credit_cost_monthly?: number
          credit_cost_yearly?: number
          description?: string
          icon_key?: string
          id?: string
          is_active?: boolean
          name?: string
          slug?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      ad_purchases: {
        Row: {
          ad_product_id: string
          admin_note: string | null
          approved_at: string | null
          banner_image_url: string | null
          created_at: string
          credits_spent: number
          duration: string
          ends_at: string
          id: string
          link_url: string | null
          starts_at: string
          status: string
          user_id: string
        }
        Insert: {
          ad_product_id: string
          admin_note?: string | null
          approved_at?: string | null
          banner_image_url?: string | null
          created_at?: string
          credits_spent: number
          duration: string
          ends_at: string
          id?: string
          link_url?: string | null
          starts_at?: string
          status?: string
          user_id: string
        }
        Update: {
          ad_product_id?: string
          admin_note?: string | null
          approved_at?: string | null
          banner_image_url?: string | null
          created_at?: string
          credits_spent?: number
          duration?: string
          ends_at?: string
          id?: string
          link_url?: string | null
          starts_at?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ad_purchases_ad_product_id_fkey"
            columns: ["ad_product_id"]
            isOneToOne: false
            referencedRelation: "ad_products"
            referencedColumns: ["id"]
          },
        ]
      }
      board_posts: {
        Row: {
          author_name: string
          board_slug: string
          category: string
          comments: number
          content: string
          created_at: string
          id: number
          images: string[] | null
          is_pinned: boolean
          password_hash: string | null
          status: string
          title: string
          updated_at: string
          user_id: string | null
          views: number
        }
        Insert: {
          author_name: string
          board_slug: string
          category: string
          comments?: number
          content?: string
          created_at?: string
          id?: never
          images?: string[] | null
          is_pinned?: boolean
          password_hash?: string | null
          status?: string
          title: string
          updated_at?: string
          user_id?: string | null
          views?: number
        }
        Update: {
          author_name?: string
          board_slug?: string
          category?: string
          comments?: number
          content?: string
          created_at?: string
          id?: never
          images?: string[] | null
          is_pinned?: boolean
          password_hash?: string | null
          status?: string
          title?: string
          updated_at?: string
          user_id?: string | null
          views?: number
        }
        Relationships: []
      }
      categories: {
        Row: {
          category_group: string
          category_values: string[] | null
          created_at: string | null
          icon_key: string | null
          id: string
          label: string
          parent_id: string | null
          slug: string
          sort_order: number
          updated_at: string | null
        }
        Insert: {
          category_group?: string
          category_values?: string[] | null
          created_at?: string | null
          icon_key?: string | null
          id?: string
          label: string
          parent_id?: string | null
          slug: string
          sort_order?: number
          updated_at?: string | null
        }
        Update: {
          category_group?: string
          category_values?: string[] | null
          created_at?: string | null
          icon_key?: string | null
          id?: string
          label?: string
          parent_id?: string | null
          slug?: string
          sort_order?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          address: string
          category: string
          company_name: string
          contact: string
          created_at: string
          description: string | null
          fax: string | null
          id: string
          is_vip: boolean
          logo_url: string | null
          password: string
          status: string
          updated_at: string
          user_id: string | null
          website: string | null
        }
        Insert: {
          address: string
          category: string
          company_name: string
          contact: string
          created_at?: string
          description?: string | null
          fax?: string | null
          id?: string
          is_vip?: boolean
          logo_url?: string | null
          password: string
          status?: string
          updated_at?: string
          user_id?: string | null
          website?: string | null
        }
        Update: {
          address?: string
          category?: string
          company_name?: string
          contact?: string
          created_at?: string
          description?: string | null
          fax?: string | null
          id?: string
          is_vip?: boolean
          logo_url?: string | null
          password?: string
          status?: string
          updated_at?: string
          user_id?: string | null
          website?: string | null
        }
        Relationships: []
      }
      contacts: {
        Row: {
          admin_note: string | null
          created_at: string
          email: string
          id: string
          inquiry_type: string
          message: string
          name: string
          phone: string | null
          status: string
          subject: string
          updated_at: string
        }
        Insert: {
          admin_note?: string | null
          created_at?: string
          email: string
          id?: string
          inquiry_type: string
          message: string
          name: string
          phone?: string | null
          status?: string
          subject: string
          updated_at?: string
        }
        Update: {
          admin_note?: string | null
          created_at?: string
          email?: string
          id?: string
          inquiry_type?: string
          message?: string
          name?: string
          phone?: string | null
          status?: string
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      credit_packages: {
        Row: {
          bonus: number
          created_at: string
          credits: number
          id: string
          is_active: boolean
          name: string
          popular: boolean
          price: number
          slug: string
          sort_order: number
          tag: string | null
          updated_at: string
        }
        Insert: {
          bonus?: number
          created_at?: string
          credits: number
          id?: string
          is_active?: boolean
          name: string
          popular?: boolean
          price: number
          slug: string
          sort_order?: number
          tag?: string | null
          updated_at?: string
        }
        Update: {
          bonus?: number
          created_at?: string
          credits?: number
          id?: string
          is_active?: boolean
          name?: string
          popular?: boolean
          price?: number
          slug?: string
          sort_order?: number
          tag?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      credit_transactions: {
        Row: {
          confirmed_at: string | null
          created_at: string
          credits_amount: number
          id: string
          order_id: string
          package_id: string
          payment_amount: number
          payment_key: string | null
          status: string
          user_id: string
        }
        Insert: {
          confirmed_at?: string | null
          created_at?: string
          credits_amount: number
          id?: string
          order_id: string
          package_id: string
          payment_amount: number
          payment_key?: string | null
          status?: string
          user_id: string
        }
        Update: {
          confirmed_at?: string | null
          created_at?: string
          credits_amount?: number
          id?: string
          order_id?: string
          package_id?: string
          payment_amount?: number
          payment_key?: string | null
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          category: string
          created_at: string
          id: string
          is_published: boolean
          question: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          answer: string
          category: string
          created_at?: string
          id?: string
          is_published?: boolean
          question: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          answer?: string
          category?: string
          created_at?: string
          id?: string
          is_published?: boolean
          question?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      form_documents: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          download_count: number | null
          file_path: string
          file_size: number
          file_type: string
          id: string
          is_published: boolean | null
          sort_order: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          download_count?: number | null
          file_path: string
          file_size: number
          file_type: string
          id?: string
          is_published?: boolean | null
          sort_order?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          download_count?: number | null
          file_path?: string
          file_size?: number
          file_type?: string
          id?: string
          is_published?: boolean | null
          sort_order?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      listing_daily_views: {
        Row: {
          id: number
          listing_id: string
          view_count: number
          view_date: string
        }
        Insert: {
          id?: never
          listing_id: string
          view_count?: number
          view_date?: string
        }
        Update: {
          id?: never
          listing_id?: string
          view_count?: number
          view_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "listing_daily_views_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      listings: {
        Row: {
          category: string
          company_name: string | null
          condition: string
          contact: string
          created_at: string
          description: string | null
          engine: string | null
          id: string
          listing_type: string
          manufacturer: string
          model: string
          month: number
          payment: string | null
          photos: string[] | null
          price: number
          region: string
          status: string
          subcategory: string | null
          tonnage: number | null
          transmission: string | null
          type: string
          undercarriage_condition: string | null
          undercarriage_type: string | null
          updated_at: string
          usage_amount: number | null
          usage_unit: string | null
          user_id: string | null
          views: number
          year: number
          youtube_url: string | null
        }
        Insert: {
          category: string
          company_name?: string | null
          condition: string
          contact: string
          created_at?: string
          description?: string | null
          engine?: string | null
          id?: string
          listing_type?: string
          manufacturer: string
          model: string
          month: number
          payment?: string | null
          photos?: string[] | null
          price: number
          region: string
          status?: string
          subcategory?: string | null
          tonnage?: number | null
          transmission?: string | null
          type: string
          undercarriage_condition?: string | null
          undercarriage_type?: string | null
          updated_at?: string
          usage_amount?: number | null
          usage_unit?: string | null
          user_id?: string | null
          views?: number
          year: number
          youtube_url?: string | null
        }
        Update: {
          category?: string
          company_name?: string | null
          condition?: string
          contact?: string
          created_at?: string
          description?: string | null
          engine?: string | null
          id?: string
          listing_type?: string
          manufacturer?: string
          model?: string
          month?: number
          payment?: string | null
          photos?: string[] | null
          price?: number
          region?: string
          status?: string
          subcategory?: string | null
          tonnage?: number | null
          transmission?: string | null
          type?: string
          undercarriage_condition?: string | null
          undercarriage_type?: string | null
          updated_at?: string
          usage_amount?: number | null
          usage_unit?: string | null
          user_id?: string | null
          views?: number
          year?: number
          youtube_url?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          company: string | null
          created_at: string
          credits: number
          email: string
          full_name: string
          id: string
          phone: string
          role: string
          status: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string
          credits?: number
          email?: string
          full_name?: string
          id: string
          phone?: string
          role?: string
          status?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string
          credits?: number
          email?: string
          full_name?: string
          id?: string
          phone?: string
          role?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      recruits: {
        Row: {
          applicants: number
          company: string
          created_at: string
          deadline: string
          id: string
          location: string
          salary: string
          status: string
          title: string
          type: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          applicants?: number
          company: string
          created_at?: string
          deadline: string
          id?: string
          location: string
          salary: string
          status?: string
          title: string
          type?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          applicants?: number
          company?: string
          created_at?: string
          deadline?: string
          id?: string
          location?: string
          salary?: string
          status?: string
          title?: string
          type?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      site_visits: {
        Row: {
          created_at: string
          id: number
          visit_count: number
          visit_date: string
        }
        Insert: {
          created_at?: string
          id?: number
          visit_count?: number
          visit_date?: string
        }
        Update: {
          created_at?: string
          id?: number
          visit_count?: number
          visit_date?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      approve_ad_purchase: {
        Args: { p_admin_note?: string; p_purchase_id: string }
        Returns: Json
      }
      get_admin_users: {
        Args: never
        Returns: {
          avatar_url: string
          company: string
          created_at: string
          email: string
          full_name: string
          id: string
          last_sign_in_at: string
          listing_count: number
          phone: string
          post_count: number
          role: string
          status: string
          updated_at: string
        }[]
      }
      get_board_stats: {
        Args: never
        Returns: {
          board_slug: string
          post_count: number
          total_views: number
        }[]
      }
      get_trending_listings: {
        Args: { p_limit?: number }
        Returns: {
          id: string
          manufacturer: string
          model: string
          today_views: number
        }[]
      }
      increment_board_post_views: {
        Args: { post_id: number }
        Returns: undefined
      }
      increment_credits: {
        Args: { p_amount: number; p_user_id: string }
        Returns: undefined
      }
      increment_download_count: { Args: { doc_id: string }; Returns: undefined }
      increment_listing_views: {
        Args: { p_listing_id: string }
        Returns: undefined
      }
      is_admin: { Args: never; Returns: boolean }
      purchase_ad: {
        Args: {
          p_ad_product_id: string
          p_credits_spent: number
          p_duration: string
          p_user_id: string
        }
        Returns: Json
      }
      record_visit: { Args: never; Returns: Json }
      reject_ad_purchase: {
        Args: { p_admin_note?: string; p_purchase_id: string }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
