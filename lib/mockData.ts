export const user = { name: "Ahmed Hassan", plan: "Residential Saver", nextBill: "Jun 8", balance: 102.52, weather: "66°F Partly cloudy" };
export const bills = [
  { id: "INV-2025-005", month: "May 2025", due: "08 Jun 2025", usage: 486.2, amount: 102.52, status: "DUE SOON", prev: 15356.4, curr: 15842.6, energy: 87.52, sub: 10.00, meterFee: 5.00, confidence: 99.2, readBy: "Karim Nasser", readOn: "31 May 2025", photo: "15842.6" },
  { id: "INV-2025-004", month: "April 2025", due: "08 May 2025", usage: 471.1, amount: 99.80, status: "UNPAID", prev: 14885.3, curr: 15356.4, energy: 84.80, sub: 10.00, meterFee: 5.00, confidence: 98.7, readBy: "Karim Nasser", readOn: "30 Apr 2025", photo: "15356.4" },
  { id: "INV-2025-003", month: "March 2025", due: "08 Apr 2025", usage: 500.0, amount: 105.00, status: "PAID", prev: 14385.3, curr: 14885.3, energy: 90.00, sub: 10.00, meterFee: 5.00, confidence: 99.5, readBy: "Karim Nasser", readOn: "31 Mar 2025", photo: "14885.3" },
  { id: "INV-2025-002", month: "Feb 2025", due: "08 Mar 2025", usage: 390.4, amount: 85.27, status: "PAID", prev: 13994.9, curr: 14385.3, energy: 70.27, sub: 10.00, meterFee: 5.00, confidence: 98.9, readBy: "Karim Nasser", readOn: "28 Feb 2025", photo: "14385.3" },
];
export const consumptionData = [
  { month: "Jan", kwh: 420 }, { month: "Feb", kwh: 390.4 },
  { month: "Mar", kwh: 500 }, { month: "Apr", kwh: 471.1 },
  { month: "May", kwh: 486.2 },
];