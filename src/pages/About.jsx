import React from "react";
import chefTestimonial from '../assets/icons/chef-testimonial.png';

const About = () => {
  return (
    <div className=" mx-auto">
      <section className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-4 md:mb-0">
          <img
            src={chefTestimonial}
            alt="About Us Image"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-lg leading-relaxed mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            sit amet congue nisl, vitae fermentum urna. Fusce aliquet felis eu
            tortor placerat, nec laoreet metus consectetur. In id odio vitae
            nisi fringilla eleifend et et quam.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia Curae; Proin eget fermentum ipsum. Nullam dictum
            purus ac felis mollis tincidunt. Integer tincidunt ultricies odio
            a vestibulum.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            Donec a odio vestibulum, cursus quam ac, fermentum quam. Nullam
            feugiat interdum elit, a commodo eros lacinia at. In hac habitasse
            platea dictumst.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
