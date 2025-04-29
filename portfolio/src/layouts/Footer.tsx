import React from 'react';
// import SocialLinks from './SocialLinks';
import { PERSONAL_INFO } from '../mydata/data';
import { Github } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 dark:text-gray-400">
              &copy; {currentYear} {PERSONAL_INFO.name}
            </p>
            <a 
              href="https://github.com/anton-fuji"
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center'>
                <Github size={20} className='mr-2'/>
                <span>View on GitHub</span>
            </a>
          </div>
          
          {/* <SocialLinks /> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;