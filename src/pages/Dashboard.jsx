import './Dashboard.css';
import logo1 from '../assets/animations/code.png';
import logo2 from '../assets/animations/github.png';
import logo3 from '../assets/animations/linkedin.png';
import logo4 from '../assets/animations/medium.png';

function Home() {
  return (
    <div className="homepage">

      <div className="header">
        <div className="header-logo">Trail</div>
        <div className="header-links">
          <div className="dropdown">
            <a href="#docs" onClick={e => e.preventDefault()}>
              Dashboard
            </a>
          </div>
        </div>
      </div>

      <div className="homepage-description">
        <p>
          Welcome to Trail, Connect Trail with Your Favourite Learning, Practicing and Socializing Platform
        </p>
      </div>

      {/* Logos container */}
      <div className="logo-container">
        <div className="logo-item">
          <img src={logo1} alt="Code" />
          <p></p>
        </div>
        <div className="logo-item">
          <img src={logo2} alt="GitHub" />
          <p></p>
        </div>
        <div className="logo-item">
          <img src={logo3} alt="LinkedIn" />
          <p></p>
        </div>
        <div className="logo-item">
          <img src={logo4} alt="Medium" />
          <p></p>
        </div>
      </div>

    </div>
  );
}

export default Home;
