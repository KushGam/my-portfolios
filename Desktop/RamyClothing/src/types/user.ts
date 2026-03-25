/**
 * Account roles — frontend-ready for Supabase custom claims / profiles.
 * B2C default; wholesale and admin reserved for future B2B portal.
 */
export type AccountRole = "customer" | "wholesale" | "admin";

export type AccountProfile = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  /** Future: drive catalog visibility and net pricing UI. */
  role: AccountRole;
  marketingEmail: boolean;
  marketingSms: boolean;
};

export type SavedAddress = {
  id: string;
  label: string;
  firstName: string;
  lastName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  isDefaultShipping: boolean;
};
