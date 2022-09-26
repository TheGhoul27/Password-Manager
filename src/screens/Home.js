/* import NavbarComponent from "../components/Navbar";
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import {Flash} from '../components/Flash/flash'
import hero1 from '../assets/illus8.jpg';
import hero from '../assets/illus4.png';

const Home = () => {
  return (
    <div>
      <NavbarComponent />
      <Flash />
      <Container style={{ height: "70vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <img src={hero1} alt="" className="h-25 shadow-lg mx-2" style={{ border: "none", borderRadius: "15px" }} />
        <img src={hero} alt="" className="shadow-lg" style={{ border: "none", borderRadius: "15px", maxWidth: "90%", maxHeight: "75%" }} />
        <img src={hero1} alt="" className="h-25 shadow-lg mx-2" style={{ border: "none", borderRadius: "15px" }} />
      </Container>
      <p className="navbar fixed-bottom d-block w-100 m-0 text-center" style={{ backgroundColor: "#d1e1f0e7" }} >Built with <FontAwesomeIcon icon={faHeart} className="text-danger" /> by <Link target="_blank" to={{ pathname: "https://twitter.com/PradhumnaGP" }}>Pradhumna Guruprasad</Link></p>
    </div>
  )
}

export default Home */

import NavbarComponent from "../components/Navbar";
import Container from 'react-bootstrap/Container';
// import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import {Flash} from '../components/Flash/flash'
import hero1 from '../assets/illus5.jpg';
import hero from '../assets/illus.jpg';

const Home = () => {
  return (
    <div>
      <NavbarComponent />
      <Flash />
      <Container style={{ display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <h2>Welcome to Password Manager</h2>
      </Container>
      <Container style={{ display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {/* <p>Password managers offer greater security and convenience for the use of passwords to access online services. Greater security is achieved principally through
          the capability of most password manager applications to generate unique, long, complex, easily changed passwords for all online accounts and the secure
          encrypted storage of those passwords on the local device. Greater convenience is provided using a single master password to access the password vault rather
          than attempting to memorize different passwords for all accounts.
          <br></br>
          <h5>Navigation</h5>
          <ul>
            <li>Navigate to SignIn/SignUp page to login or regiter. Each user has his/her own login ID to access the Password Vault. To make sure other user's password doesn't
                clash you need to create a usinque ID.</li>
            <li>To Add new password and access all passwords stored, navigate to the Dashboard page from Navbar. All passwords stored are encrypted.</li>
          </ul>
        </p> */}
      </Container>
      <Container style={{ height: "50vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <img src={hero1} alt="" className="h-25 shadow-lg mx-2" style={{ border: "none", borderRadius: "15px" }} />
        <img src={hero} alt="" className="shadow-lg" style={{ border: "none", borderRadius: "15px", maxWidth: "60%", maxHeight: "75%" }} />
        <img src={hero1} alt="" className="h-25 shadow-lg mx-2" style={{ border: "none", borderRadius: "15px" }} />
      </Container>
      {/* <p className="navbar fixed-bottom d-block w-100 m-0 text-center" style={{ backgroundColor: "#d1e1f0e7" }} >Built with <FontAwesomeIcon icon={faHeart} className="text-danger" /> by <Link target="_blank" to={{ pathname: "https://twitter.com/PradhumnaGP" }}>Pradhumna Guruprasad</Link></p> */}
      <p className="navbar fixed-bottom d-block w-100 m-0 text-center" style={{ backgroundColor: "#d1e1f0e7" }} >Built with <FontAwesomeIcon icon={faHeart} className="text-danger" /> by <a href={"https://twitter.com/PradhumnaGP"} rel="noreferrer" target="_blank">Pradhumna Guruprasad</a></p>
    </div>
  )
}

export default Home