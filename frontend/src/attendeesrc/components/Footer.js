import React from 'react';
import EventIcon from '@mui/icons-material/Event';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import '../styles/Footer.css'
const Footer = () => (
  <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 border-top" id='footerTag'>
    <div className="col-md-4 d-flex align-items-center">
      <a href="/attendee" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
        <EventIcon/>
      </a>
      <span className="mb-3 mb-md-0 text-body-secondary">© 2023 EMS</span>
    </div>

    <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
      <li className="ms-3">
        <a className="text-body-secondary" href="https://twitter.com/?lang=en">
          <TwitterIcon/>
        </a>
      </li>
      <li className="ms-3">
        <a className="text-body-secondary" href="https://www.instagram.com/">
        <InstagramIcon/>
        </a>
      </li>
      <li className="ms-3">
        <a className="text-body-secondary" href="https://en-gb.facebook.com/">
          <FacebookIcon/>
        </a>
      </li>
    </ul>
  </footer>
);

export default Footer;
