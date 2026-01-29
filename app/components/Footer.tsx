'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>RealTrust</h3>
            <p className="text-sm text-neutral-500">Your trusted partner in premium real estate solutions. Transforming dreams into reality.</p>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/" className="footer-link">Home</a></li>
              <li><a href="#projects" className="footer-link">Projects</a></li>
              <li><a href="#clients" className="footer-link">Our Clients</a></li>
              <li><a href="#contact" className="footer-link">Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Company</h3>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">About Us</a></li>
              <li><a href="#" className="footer-link">Blog</a></li>
              <li><a href="#" className="footer-link">Careers</a></li>
              <li><a href="#" className="footer-link">Privacy</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Connect</h3>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">LinkedIn</a></li>
              <li><a href="#" className="footer-link">Twitter</a></li>
              <li><a href="#" className="footer-link">Instagram</a></li>
              <li><a href="#" className="footer-link">Facebook</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} RealTrust. All rights reserved. | <a href="#" className="footer-link">Terms</a> | <a href="#" className="footer-link">Privacy</a></p>
        </div>
      </div>
    </footer>
  );
}
