import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  route('sign-in', 'routes/root/sign-in.tsx'),
  layout('routes/admin/admin-layout.tsx', [
    route('dashboard', 'routes/admin/Dashboard.tsx'),
    route('inventory', 'routes/admin/Inventory.tsx'),
    route('inventory/order', 'routes/admin/orderInventory.tsx'),
    route('orders', 'routes/admin/Order.tsx'),
    route('reports', 'routes/admin/Reports.tsx'),
    route('inventory/add', 'routes/admin/AddInventory.tsx')
  ]),
] satisfies RouteConfig;