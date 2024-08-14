import React from "react";
import './Styles/Footer.css';
const Plantmain = () => {
    return (
        <div>           
            <footer id='footer'>
                <section>
                    <h2>SUPPORT CENTER</h2>
                    <p>Contact Us</p>
                    <p>Request Return/Exchange</p>
                    <p>Call: 08069630390</p>
                    <p>Email: info@urbanplant.in</p>
                    <p>Click to WhatsApp</p>
                </section>
                <section>
                    <h2>IMPORTANT LINKS</h2>
                    <p>About Us</p>
                    <p>Track your Order</p>
                    <p>Career</p>
                    <p>Download eBook</p>
                    <p>Affiliate Program</p>
                    <p>Blog</p>
                    <p>Become Brand Ambassador</p>
                    <p>Invest with us</p>
                </section>
                <section>
                    <h2>OUR POLICIES</h2>
                    <p>Shipping Policy</p>
                    <p>Privacy Policy</p>
                    <p>Terms & Conditions</p>
                    <p>Refund Policy</p>
                </section>
                <section>
                    <h2>COMPANY INFO</h2>
                    <p>Brand Owned by Grandeur IT Innovations Private Limited</p>
                    <p>Add: 208, 2nd Floor SS Plaza, (Opp. Hilton Hotel, Sector 47, Gurugram, Haryana 122002</p>
                    <p>Add: Plot No. 12, Sector 9, Vikas Nagar, Lucknow 226022</p>
                    <p>CIN: U72200UP2020PTC127885</p>
                </section>
            </footer>
            <div className="copyrights">
                <p>&copy; {new Date().getFullYear()} Your Company Name. All Rights Reserved.</p>
            </div>
        </div>
    );
};
export default Plantmain;