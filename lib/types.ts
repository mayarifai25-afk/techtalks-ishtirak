export type UserRole = "ADMIN" | "WORKER" | "CUSTOMER";

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

export type CurrentUser = {
  id: string;
  name: string;
  role: UserRole;
  customer_id: string;
  redirect_path: string;
};

export type UserProfile = {
  name: string;
  email: string;
  phone: string;
  address: string;
  meter: string;
  plan: string;
  bill: string;
  dueDate: string;
};

export type CustomerMeter = {
  id: string;
  meter_number: string;
  meter_status: string;
};

export type CustomerSubscription = {
  id: string;
  subscription_status: string;
  tariff_name: string;
  price_per_kwh: number;
  fixed_fee: number;
};

export type ConsumptionItem = {
  period: string;
  consumption_kwh: number;
};

export type CustomerDashboard = {
  unpaid_balance: number;
  meter: CustomerMeter;
  subscription: CustomerSubscription;
  granularity: "monthly";
  consumption: ConsumptionItem[];
};

export type CustomerBill = {
  id: string;
  billing_period: string;
  consumption_kwh: number;
  amount: number;
  issue_date: string;
  due_date: string;
  bill_status: "PAID" | "UNPAID";
};

export type BillDetails = CustomerBill & {
  current_reading_id: string;
  previous_reading_id: string;
  price_per_kwh_snapshot: number;
  fixed_fee_snapshot: number;
};

export type CustomerPayment = {
  id: string;
  bill_id: string;
  amount_paid: number;
  payment_date: string;
  payment_method: "CASH";
  is_voided?: boolean;
};

export type CustomerReading = {
  id: string;
  reading_value: number;
  reading_date: string;
  status: string;
  has_photo: boolean;
};

export type CustomerHistory = {
  readings: CustomerReading[];
  bills: CustomerBill[];
  payments: CustomerPayment[];
};

export type ContactUpdate = {
  phone?: string;
  email?: string;
};

export type AdminContact = {
  phone: string;
  email: string;
};

// Temporary UI compatibility types
export type Bill = {
  month: string;
  amount: string;
  status: "Paid" | "Unpaid";
};

export type DayUsage = {
  day: string;
  val: number;
};