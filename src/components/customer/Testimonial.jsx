import React from 'react';
import chefTestimonial from '../../assets/icons/chef-testimonial.png';

const Testimonial = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-6 md:p-12 space-y-6 md:space-y-0 md:space-x-6">
      <div className="relative flex-shrink-0 w-full md:w-1/2 lg:w-[500px]">
        <img src={chefTestimonial} alt="Chef holding a plate of food" className="rounded-lg w-full h-auto" />
      </div>
      <div className="max-w-md text-center md:text-left">
        <h3 className="text-sm font-semibold uppercase text-[#EB5757]">What They Say</h3>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-2">What Our Customers Say About Us</h2>
        <p className="mt-4 text-sm lg:text-lg text-muted-foreground">
          “Fudo is the best. Besides the many and delicious meals, the service is also very good, especially in the very fast delivery. I highly recommend Fudo to you”.
        </p>
        <div className="flex items-center justify-center md:justify-start mt-4">
          <img src="https://placehold.co/40x40" alt="Theresa Jordan" className="w-10 h-10 rounded-full" />
          <div className="ml-3">
            <p className="font-semibold">Theresa Jordan</p>
            <p className="text-sm text-muted-foreground">Food Enthusiast</p>
          </div>
        </div>
        <div className="flex items-center justify-center md:justify-start mt-2">
          <div className="flex space-x-1 text-yellow-500">
            <span>⭐</span>
            <span>⭐</span>
            <span>⭐</span>
            <span>⭐</span>
            <span>⭐</span>
          </div>
          <span className="ml-2 text-muted-foreground">4.8</span>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
