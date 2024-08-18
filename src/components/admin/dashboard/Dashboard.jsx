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
          axios.get('http://localhost:8080/api/products/count'),
          axios.get('http://localhost:8080/api/orders/count'),
          axios.get('http://localhost:8080/customer/count'),
          axios.get('http://localhost:8080/api/contacts/count'),
        ]);

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
      <h1 className='mx-4 my-4 text-xl font-bold md:text-xl lg:text-2xl xl:text-2xl'>
        Dashboard
      </h1>

      <div className='mx-4 my-6'>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <CardDataStats title="Total Products" total={data.totalProducts} />
          <CardDataStats title="Total Orders" total={data.totalOrders} />
          <CardDataStats title="Total Customers" total={data.totalCustomers} />
          <CardDataStats title="Total Contacts" total={data.totalContacts} />
        </div>

        <div className='mt-8'>
          <Linegraph />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
