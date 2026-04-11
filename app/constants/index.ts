import type { AxisModel } from "@syncfusion/ej2-react-charts";

export const sidebarItems = [
  {
    id: 1,
    icon: "/assets/icons/home.svg",
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    id: 3,
    icon: "/assets/icons/inventory.svg",
    label: "Inventory",
    href: "/inventory",
  },
  {
    id: 2,
    icon: "/assets/icons/inventory.svg",
    label: "Orders",
    href: "/orders",
  },
  {
    id: 4,
    icon: "/assets/icons/inventory.svg",
    label: "Reports",
    href: "/reports",
  },
];

export const inventoryItems = [
  {
    $id: "inv_001",
    name: "Surgical Face Masks",
    category: "ppe",
    quantity: 1200,
    expiryDate: "2026-12-31T00:00:00.000Z",
    $createdAt: "2026-03-01T08:00:00.000Z",
    $updatedAt: "2026-03-01T08:00:00.000Z",
  },
  {
    $id: "inv_002",
    name: "Paracetamol 500mg Tablets",
    category: "medicine",
    quantity: 850,
    expiryDate: "2027-06-15T00:00:00.000Z",
    $createdAt: "2026-03-01T08:10:00.000Z",
    $updatedAt: "2026-03-01T08:10:00.000Z",
  },
  {
    $id: "inv_003",
    name: "Disposable Syringes 10ml",
    category: "consumable",
    quantity: 600,
    expiryDate: "2028-01-20T00:00:00.000Z",
    $createdAt: "2026-03-01T08:20:00.000Z",
    $updatedAt: "2026-03-01T08:20:00.000Z",
  },
  {
    $id: "inv_004",
    name: "Ceftriaxone Injection",
    category: "injectable",
    quantity: 300,
    expiryDate: "2026-09-10T00:00:00.000Z",
    $createdAt: "2026-03-01T08:30:00.000Z",
    $updatedAt: "2026-03-01T08:30:00.000Z",
  },
  {
    $id: "inv_005",
    name: "Latex Examination Gloves",
    category: "ppe",
    quantity: 1500,
    expiryDate: "2027-03-05T00:00:00.000Z",
    $createdAt: "2026-03-01T08:40:00.000Z",
  },
];

export const orderItems = [
  {
    orderNo: "PPE-20260409-4356",
    Date: "2026-04-09T08:40:00.000Z",
    category: "ppe",
    quantity: 700,
  },
  {
    orderNo: "MED-20260408-1234",
    Date: "2026-04-08T14:15:00.000Z",
    category: "medicine",
    quantity: 450,
  },
  {
    orderNo: "CON-20260407-9876",
    Date: "2026-04-07T09:30:00.000Z",
    category: "consumable",
    quantity: 1200,
  },
  {
    orderNo: "INJ-20260406-5543",
    Date: "2026-04-06T11:45:00.000Z",
    category: "injectable",
    quantity: 200,
  },
  {
    orderNo: "PPE-20260405-7788",
    Date: "2026-04-05T07:20:00.000Z",
    category: "ppe",
    quantity: 950,
  },
  {
    orderNo: "MED-20260404-3321",
    Date: "2026-04-04T16:10:00.000Z",
    category: "medicine",
    quantity: 600,
  },
  {
    orderNo: "CON-20260403-6655",
    Date: "2026-04-03T13:50:00.000Z",
    category: "consumable",
    quantity: 800,
  },
  {
    orderNo: "INJ-20260402-9980",
    Date: "2026-04-02T10:05:00.000Z",
    category: "injectable",
    quantity: 310,
  },
];

// Mock data (you should move this to constants later)
export const demandData = [
  { day: 'Apr 14', value: 340, low: 320, high: 360 },
  { day: 'Apr 18', value: 345, low: 325, high: 370 },
  { day: 'Apr 22', value: 350, low: 330, high: 380 },
  { day: 'Apr 26', value: 360, low: 335, high: 390 },
  { day: 'Apr 30', value: 355, low: 330, high: 385 },
  { day: 'May 2', value: 370, low: 340, high: 400 },
  { day: 'May 5', value: 365, low: 345, high: 395 },
  { day: 'May 7', value: 380, low: 350, high: 410 },
];

export const consumptionData = [
  { item: 'Paracetamol', value: 900 },
  { item: 'Disposable syringes', value: 750 },
  { item: 'Saline IV', value: 620 },
  { item: 'Gloves (L)', value: 580 },
  { item: 'Amoxicillin', value: 430 },
  { item: 'Metformin', value: 380 },
];

export const inventoryReport = [
  { name: 'Amoxicillin 500mg', stock: 120, status: 'Critical', days: '3d' },
  { name: 'Surgical gloves (L)', stock: 340, status: 'Critical', days: '5d' },
  { name: 'N95 Respirators', stock: 85, status: 'Critical', days: '6d' },
  { name: 'IV Saline 0.9%', stock: 210, status: 'Low', days: '9d' },
  { name: 'Paracetamol 500mg', stock: 680, status: 'OK', days: '22d' },
];

// Mock order data — replace with real API data
export const mockOrders = [
  {
    id: 'PO-20250419-3979',
    supplier: 'MedSupply Co.',
    date: 'Apr 19, 2025',
    status: 'Confirmed',
    amount: '$1,648.00',
    details: {
      itemName: 'Surgical Gloves (L)',
      category: 'PPE',
      quantity: 200,
      orderDate: 'Apr 19, 2025',
      location: 'Main Warehouse',
      paymentMethod: 'CASH',
      createdBy: 'System Admin',
      supplier: 'MedSupply Co.',
      supplierAddress: 'Industrial Area, Block 4',
      supplierPhone: '0712345678',
      supplierEmail: 'orders@medsupply.com',
    },
  },
  {
    id: 'PO-20250419-1178',
    supplier: 'PharmaDist Ltd.',
    date: 'Apr 19, 2025',
    status: 'Confirmed',
    amount: '$2,498.00',
    details: {
      itemName: 'Amoxicillin 500mg',
      category: 'Medicine',
      quantity: 500,
      orderDate: 'Apr 19, 2025',
      location: 'Pharmacy Store',
      paymentMethod: 'BANK TRANSFER',
      createdBy: 'John Doe',
      supplier: 'PharmaDist Ltd.',
      supplierAddress: 'Commerce Street, Suite 12',
      supplierPhone: '0776650325',
      supplierEmail: 'supply@pharmadist.com',
    },
  },
  {
    id: 'PO-20250418-0042',
    supplier: 'InjectPro',
    date: 'Apr 18, 2025',
    status: 'Pending',
    amount: '$890.00',
    details: {
      itemName: 'IV Drip Set',
      category: 'Injectable',
      quantity: 100,
      orderDate: 'Apr 18, 2025',
      location: 'ICU Store',
      paymentMethod: 'CASH',
      createdBy: 'Jane Smith',
      supplier: 'InjectPro',
      supplierAddress: 'Health Park, Unit 7',
      supplierPhone: '0798765432',
      supplierEmail: 'info@injectpro.com',
    },
  },
];
