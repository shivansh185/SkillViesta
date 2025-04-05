'use client';
import React from 'react';


export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Contact Section */}
        <div>
          <h2 className="text-white text-2xl font-bold">Get in Touch</h2>
          <p className="mt-3">hello@yourdomain.com</p>
          <p>123 Tech Street, San Francisco, CA</p>
          <p>+1 123 456 7890</p>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white font-semibold">Services</h3>
          <ul className="mt-2 space-y-2">
            <li>Web Development</li>
            <li>UI/UX Design</li>
            <li>Branding</li>
            <li>Consulting</li>
          </ul>
        </div>

        {/* Blog */}
        <div>
          <h3 className="text-white font-semibold">Blog</h3>
          <ul className="mt-2 space-y-2">
            <li>Latest Trends</li>
            <li>Case Studies</li>
            <li>Success Stories</li>
            <li>Tech Updates</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li>About</li>
            <li>Careers</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center">
        <p className="mt-4">&copy; {new Date().getFullYear()} Your Company. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
