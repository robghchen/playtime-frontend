import React, { Component } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return(
        <div className="footer">
        <Link to={"/users/3"}>
            <p>Do you have any feedback for us?</p>
        </Link>
            <p>Made with ❤️ in NYC</p>
            <p>© 2019 PlayTime</p>

        </div>
        
    )
}
export default Footer;