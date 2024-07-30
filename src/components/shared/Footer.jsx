import React from 'react';
import fudoLogo from '../../assets/icons/fudo_logo.png';
import carbonSend from '../../assets/icons/carbon_send.png';
import instagramIcon from '../../assets/icons/instagram_icon.png';
import facebookIcon from '../../assets/icons/facebook_icon.png';
import twitterIcon from '../../assets/icons/twitter_icon.png';

const footerClasses = {
  container: 'container mx-auto px-4 md:px-8 lg:px-6 xl:px-4 flex flex-wrap justify-between',
  logoText: 'text-xl md:text-2xl font-bold',
  textMuted: 'text-base md:text-lg text-muted-foreground',
  socialIcon: 'text-primary',
  menuItem: 'text-base md:text-lg text-muted-foreground hover:text-primary',
  input: 'bg-input text-base md:text-lg text-foreground p-2 rounded-l-lg border border-border focus:ring-primary focus:border-primary',
  submitButton: 'bg-primary text-base md:text-lg text-primary-foreground p-2 rounded-r-lg hover:bg-primary/80',
  icon: 'h-6 w-6',
};

const Footer = () => {
  return (
    <footer className="bg-white py-8">
      <div className={footerClasses.container + ' sm:px-6'}>
        <div className="w-full sm:w-1/2 md:w-1/4 mb-6 md:mb-0 lg:mb-0 lg:pb-6 sm:ml-2 sm:mr-2">
          <div className="flex items-center mb-4">
            <img src={fudoLogo} alt="Fudo Logo" className="mr-4" style={{ width: '40px', height: '40px' }} />
            <span className={footerClasses.logoText}>Fudo</span>
          </div>
          <p className={footerClasses.textMuted}>Our job is to fill your tummy with delicious food and provide fast and free delivery.</p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className={footerClasses.socialIcon}>
              <img src={instagramIcon} alt="Instagram" className={footerClasses.icon} />
            </a>
            <a href="#" className={footerClasses.socialIcon}>
              <img src={facebookIcon} alt="Facebook" className={footerClasses.icon} />
            </a>
            <a href="#" className={footerClasses.socialIcon}>
              <img src={twitterIcon} alt="Twitter" className={footerClasses.icon} />
            </a>
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/6 mb-6 md:mb-0 lg:mb-0 lg:pb-6 sm:ml-2 sm:mr-2">
          <h3 className="font-semibold text-base md:text-lg mb-4">About</h3>
          <ul className="space-y-2">
            <li>
              <a href="/about" className={footerClasses.menuItem}>
                About Us
              </a>
            </li>
            <li>
              <a href="#" className={footerClasses.menuItem}>
                Features
              </a>
            </li>
            <li>
              <a href="#" className={footerClasses.menuItem}>
                News
              </a>
            </li>
            <li>
              <a href="/menu" className={footerClasses.menuItem}>
                Menu
              </a>
            </li>
          </ul>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/6 mb-6 md:mb-0 lg:mb-0 lg:pb-6 sm:ml-2 sm:mr-2">
          <h3 className="font-semibold text-base md:text-lg mb-4">Support</h3>
          <ul className="space-y-2">
            <li>
              <a href="/signin" className={footerClasses.menuItem}>
                Account
              </a>
            </li>
            <li>
              <a href="/contact" className={footerClasses.menuItem}>
                Support Center
              </a>
            </li>
            <li>
              <a href="/contact" className={footerClasses.menuItem}>
                Feedback
              </a>
            </li>
            <li>
              <a href="/contact" className={footerClasses.menuItem}>
                Contact Us
              </a>
            </li>
            <li>
              <a href="/contact" className={footerClasses.menuItem}>
                Accessibility
              </a>
            </li>
          </ul>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 mb-6 md:mb-0 lg:mb-0 lg:pb-6 sm:ml-2 sm:mr-2">
          <h3 className="font-semibold text-base md:text-lg mb-4">Get in Touch</h3>
          <p className={footerClasses.textMuted}>Questions or feedback? We'd love to hear from you.</p>
          <form className="flex mt-4">
            <input type="email" placeholder="Email Address" className={footerClasses.input} />
            <button type="submit" className={footerClasses.submitButton}>
              <img src={carbonSend} alt="Send" style={{ width: '24px', height: '24px' }} />
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
