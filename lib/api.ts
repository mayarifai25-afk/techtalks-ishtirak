import type {
  ApiResponse,
  CurrentUser,
  CustomerDashboard,
  CustomerHistory,
  CustomerBill,
  BillDetails,
  CustomerPayment,
  ContactUpdate,
  AdminContact,
  UserProfile,
  Bill,
  DayUsage,
} from "./types";

import {
  user,
  bills,
  consumptionData,
} from "./mockData";

// Temporary Mock Mode
// Change to false when the Backend is ready.
export const USE_MOCK_DATA = true;

const mockCurrentUser: CurrentUser = {
  id: "user-001",
  name: user.name,
  role: "CUSTOMER",
  customer_id: "customer-001",
  redirect_path: "/customer/dashboard",
};

let mockPhone = "70123456";
let mockEmail = "customer@example.com";

function success<T>(data: T): ApiResponse<T> {
  return {
    success: true,
    data,
    message: "Success",
  };
}

// Authentication

export async function registerCustomer(data: {
  name: string;
  phone: string;
  meterId: string;
  password: string;
}) {
  if (USE_MOCK_DATA) {
    return success<null>(null);
  }

  return request<ApiResponse<null>>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function verifyCustomer(data: {
  phone: string;
  code: string;
}) {
  if (USE_MOCK_DATA) {
    return success<null>(null);
  }

  return request<ApiResponse<null>>("/auth/verify", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getCurrentUser() {
  if (USE_MOCK_DATA) {
    return success(mockCurrentUser);
  }

  return request<ApiResponse<CurrentUser>>("/me");
}

// Customer Dashboard

export async function getCustomerDashboard() {
  if (USE_MOCK_DATA) {
    const dashboard: CustomerDashboard = {
      unpaid_balance: user.balance,
      meter: {
        id: "meter-001",
        meter_number: "MTR-1001",
        meter_status: "ACTIVE",
      },
      subscription: {
        id: "subscription-001",
        subscription_status: "ACTIVE",
        tariff_name: user.plan,
        price_per_kwh: 0.18,
        fixed_fee: 15,
      },
      granularity: "monthly",
      consumption: consumptionData.map((item) => ({
        period: item.month,
        consumption_kwh: item.kwh,
      })),
    };

    return success(dashboard);
  }

  return request<ApiResponse<CustomerDashboard>>(
    "/customer/dashboard?granularity=monthly"
  );
}

// Customer Bills

function getMockBills(): CustomerBill[] {
  return bills.map((bill) => ({
    id: bill.id,
    billing_period: bill.month,
    consumption_kwh: bill.usage,
    amount: bill.amount,
    issue_date: bill.readOn,
    due_date: bill.due,
    bill_status: bill.status === "PAID" ? "PAID" : "UNPAID",
  }));
}

export async function getCustomerBills(
  status?: "PAID" | "UNPAID"
) {
  if (USE_MOCK_DATA) {
    const result = getMockBills();
    const filtered = status
      ? result.filter((bill) => bill.bill_status === status)
      : result;

    return success(filtered);
  }

  const query = status ? `?bill_status=${status}` : "";

  return request<ApiResponse<CustomerBill[]>>(
    `/bills${query}`
  );
}

export async function getBillDetails(id: string) {
  if (USE_MOCK_DATA) {
    const bill = bills.find((item) => item.id === id);

    if (!bill) {
      throw new Error("Invoice not found");
    }

    const details: BillDetails = {
      id: bill.id,
      billing_period: bill.month,
      consumption_kwh: bill.usage,
      amount: bill.amount,
      issue_date: bill.readOn,
      due_date: bill.due,
      bill_status: bill.status === "PAID" ? "PAID" : "UNPAID",
      current_reading_id: `reading-current-${bill.id}`,
      previous_reading_id: `reading-previous-${bill.id}`,
      price_per_kwh_snapshot: bill.energy / bill.usage,
      fixed_fee_snapshot: bill.sub + bill.meterFee,
    };

    return success(details);
  }

  return request<ApiResponse<BillDetails>>(
    `/bills/${encodeURIComponent(id)}`
  );
}

// Customer Payments

export async function getCustomerPayments() {
  if (USE_MOCK_DATA) {
    const payments: CustomerPayment[] = bills
      .filter((bill) => bill.status === "PAID")
      .map((bill, index) => ({
        id: `payment-${index + 1}`,
        bill_id: bill.id,
        amount_paid: bill.amount,
        payment_date: bill.due,
        payment_method: "CASH",
        is_voided: false,
      }));

    return success(payments);
  }

  return request<ApiResponse<CustomerPayment[]>>("/payments");
}

// Customer History

export async function getCustomerHistory() {
  if (USE_MOCK_DATA) {
    const history: CustomerHistory = {
      readings: bills.flatMap((bill, index) => [
        {
          id: `reading-${index}-previous`,
          reading_value: bill.prev,
          reading_date: bill.readOn,
          status: "APPROVED",
          has_photo: true,
        },
        {
          id: `reading-${index}-current`,
          reading_value: bill.curr,
          reading_date: bill.readOn,
          status: "APPROVED",
          has_photo: true,
        },
      ]),
      bills: getMockBills(),
      payments: bills
        .filter((bill) => bill.status === "PAID")
        .map((bill, index) => ({
          id: `payment-${index + 1}`,
          bill_id: bill.id,
          amount_paid: bill.amount,
          payment_date: bill.due,
          payment_method: "CASH",
          is_voided: false,
        })),
    };

    return success(history);
  }

  return request<ApiResponse<CustomerHistory>>(
    "/customer/history"
  );
}

// Customer Contact

export async function updateCustomerContact(
  data: ContactUpdate
) {
  if (USE_MOCK_DATA) {
    if (data.phone) mockPhone = data.phone;
    if (data.email) mockEmail = data.email;

    return success<null>(null);
  }

  return request<ApiResponse<null>>("/customer/contact", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function verifyCustomerContact(data: {
  code: string;
}) {
  if (USE_MOCK_DATA) {
    return success<null>(null);
  }

  return request<ApiResponse<null>>(
    "/customer/contact/verify",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
}

// Admin Contact

export async function getAdminContact() {
  if (USE_MOCK_DATA) {
    const contact: AdminContact = {
      phone: "",
      email: "",
    };

    return success(contact);
  }

  return request<ApiResponse<AdminContact>>(
    "/public/contact"
  );
}

// Temporary compatibility with existing components

export async function getBills(): Promise<Bill[]> {
  const response = await getCustomerBills();

  return response.data.map((bill) => ({
    month: bill.billing_period,
    amount: `$${Number(bill.amount).toFixed(2)}`,
    status: bill.bill_status === "PAID" ? "Paid" : "Unpaid",
  }));
}

export async function getWeeklyUsage(): Promise<DayUsage[]> {
  const response = await getCustomerDashboard();

  return response.data.consumption.map((item) => ({
    day: item.period,
    val: Number(item.consumption_kwh),
  }));
}

export async function updateProfile(
  data: UserProfile
): Promise<UserProfile> {
  if (USE_MOCK_DATA) {
    return {
      ...data,
      phone: mockPhone,
      email: mockEmail,
    };
  }

  throw new Error(
    "Profile editing is not available yet."
  );
}

// Internal request helper for real Backend mode

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`/api${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      result?.message || `Request failed: ${response.status}`
    );
  }

  return result as T;
}