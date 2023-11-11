import Container from "../../components/Container";
import classes from "./FooterArea.module.css";
import { Link } from "react-router-dom";
/////////////////
import { FiAtSign, FiPhone } from "react-icons/fi";
import { contactsData } from "./contactsData";
///////////////////
const FooterArea = () => {
  return (
    <div className={classes.container}>
      <Container>
        <div className={classes.content}>
          <div className={classes.mission}>
            <h2>Our Mission</h2>
            <p>to reach maximum customers at the right time to increase sales and profitability of the business.</p>
          </div>
          <div className={classes.quickLink}>
            <h3>Quick Links</h3>
            <ul>
              <Link to="/">Home</Link>
              <Link to="/shop">Shop</Link>
              <Link to="/">Contact</Link>
            </ul>
          </div>
          <div className={classes.contact}>
            <h3>Contact Us</h3>
            <div className={classes.wrapContact}>
              <div className={classes.card}>
                <div className={classes.icon}>
                  <i className="fas fa-location-arrow"></i>
                </div>
                <div className={classes["card-content"]}>
                  <h4>Head Office</h4>
                  <p>Addiss Ababa , Ethiopia </p>
                </div>
              </div>
              <div className={classes.card}>
                <div className={classes.icon}>
                  <i className="fas fa-phone"></i>
                </div>
                <div className={classes["card-content"]}>
                  <h4>Phone Number</h4>
                  <p>+251954104637</p>
                </div>
              </div>
              <div className={classes.card}>
                <div className={classes.icon}>
                  <i className="fas fa-envelope"></i>
                </div>
                <div className={classes["card-content"]}>
                  <h4>Email</h4>
                  <p>gedeonagmas2580@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FooterArea;
