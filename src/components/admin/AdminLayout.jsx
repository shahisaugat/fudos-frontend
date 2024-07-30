import React, { Suspense, lazy } from 'react';
import {  Routes, Route } from 'react-router-dom';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));
const Sidebar = lazy(() => import('./Sidebar'));
const Products = lazy(() => import('./products/Products'));
const Customer = lazy(() => import('./customer/Customer'));
const Order = lazy(() => import('./order/Order'));
const Contact = lazy(() => import('./support/Contact'));
const AddAdmin = lazy(() => import('./addAdmin/AddAdmin'));

const AdminLayout = () => (
  <div className="flex h-screen bg-white dark:bg-zinc-200">
    <Suspense fallback={<div>Loading Sidebar...</div>}>
      <Sidebar />
    </Suspense>
    <div className="flex-grow overflow-y-auto">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="customers" element={<Customer />} />
          <Route path="order" element={<Order />} />
          <Route path="addadmin" element={<AddAdmin />} />
          <Route path="addadmin" element={<AddAdmin />} />
          <Route path="support" element={<Contact />} />
          
        </Routes>
      </Suspense>
    </div>
  </div>
);

export default AdminLayout;
