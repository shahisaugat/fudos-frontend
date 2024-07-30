import SignIn from "./authentication/common/SignIn"
import SignUp from "./authentication/common/SignUp"
import UnAuthorized from "./authentication/common/UnAuthorized"
import AdminLayout from "./components/admin/AdminLayout"
import ContactPage from "./pages/ContactPage"
import Layout from "./pages/Layout"
import About from "./pages/About"
import Menu from "./pages/MenuPage"


// import DeliveryInfo from "./components/customer/DeliveryInfo"
// import DownloadSection from "./components/customer/DownloadSection"
// import Footer from "./components/shared/Footer"

// import MostPopulars from "./components/customer/MostPopulars"
// import Testimonial from "./components/customer/Testimonial"
// import Sidebar from "./components/admin/Sidebar"
import CustomerHome from "./pages/CustomerHome"


import React, { Suspense, lazy, useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Cart from "./pages/Cart"
import ProductDetailPage from "./pages/ProductDetailPage"

const queryClient = new QueryClient();


function App() {

  const [isLoading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  if (isLoading) return <div>Loading...</div>;
  const router = createBrowserRouter([ 
    {
      path: "/",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Layout>
            <CustomerHome />
          </Layout>
        </Suspense>
      ),
      errorElement: <>Error loading home component</>,
    },
    {
      path: "/home",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Layout>
            <CustomerHome />
          </Layout>
        </Suspense>
      ),
      errorElement: <>Error loading home component</>,
    },
    {
      path: "/about",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Layout>
            <About />
          </Layout>
        </Suspense>
      ),
      errorElement: <>Error loading home component</>,
    },
    {
      path: "/menu",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Layout>
            <Menu />
          </Layout>
        </Suspense>
      ),
      errorElement: <>Error loading home component</>,
    },
    {
      path: "/contact",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Layout>
            <ContactPage />
          </Layout>
        </Suspense>
      ),
      errorElement: <>Error loading contact component</>,
    },
    {
      path: "/cart",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Layout>
            <Cart />
          </Layout>
        </Suspense>
      ),
      errorElement: <>Error loading contact component</>,
    },
    {
      path: "/product/:id",
      element: (
        <Suspense fallback={<div>Loading...</div>} >
          <Layout>
            <ProductDetailPage />
          </Layout>
        </Suspense>
      ),
      errorElement: <>Error loading property details component</>,
    },
    {
      path: "/signin",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          
            <SignIn />
          
        </Suspense>
      ),
      errorElement: <>Error loading sign-in component</>,
    },
    {
      path: "/signup",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          
            <SignUp />
         
        </Suspense>
      ),
      errorElement: <>Error loading sign-up component</>,
    },
    {
      path: "/admin/*",
      element: isLoggedIn ? (
        <Suspense fallback={<div>Loading...</div>}>
          <AdminLayout />
        </Suspense>
      ) : (
        <Navigate to="/signin" replace />
      ),
      errorElement: <>Error loading admin component</>,
    },
    {
      path: "*",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <UnAuthorized />
        </Suspense>
      ),
      errorElement: <>Error loading unauthorized component</>,
    },
  ]);
  
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App
