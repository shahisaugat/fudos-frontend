import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardDataStats from './CardDataStats';
import Linegraph from './Linegraph';

const Dashboard = () => {
  const [data, setData] = useState({
    totalProducts: '0',
    totalOrders: '0',
    totalCustomers: '0',
    totalContacts: '0',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, ordersRes, customersRes, contactsRes] = await Promise.all([
          axios.get('http://localhost:8080/api/products/count'), // Get total products count
          axios.get('http://localhost:8080/api/orders/count'), // Get total orders count
          axios.get('http://localhost:8080/customer/count'), // Get total customers count
          axios.get('http://localhost:8080/api/contacts/count'), // Get total contacts count
        ]);

        console.log('products Response:', productsRes.data);
        console.log('Orders Response:', ordersRes.data);
        console.log('Customers Response:', customersRes.data);
        console.log('Contacts Response:', contactsRes.data);

        setData({
          totalProducts: productsRes.data.data || '0', 
          totalOrders: ordersRes.data || '0', 
          totalCustomers: customersRes.data.data || '0', 
          totalContacts: contactsRes.data || '0', 
        });
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 className='mx-4 text-2xl font-bold'>Dashboard</h1>

      <div className='m-4'>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <CardDataStats title="Total products" total={data.totalProducts} />
          <CardDataStats title="Total Orders" total={data.totalOrders} />
          <CardDataStats title="Total Customers" total={data.totalCustomers} />
          <CardDataStats title="Total Contacts" total={data.totalContacts} />
        </div>

        <div className='my-4'>
          <Linegraph />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
