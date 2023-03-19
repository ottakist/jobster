import main from '../assets/images/main.svg';
import Logo from '../components/logo';
import Wrapper from '../assets/wrappers/LandingPage';
import {Link} from'react-router-dom'
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        {/* info */}
        <div className='info'>
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, quasi
            cumque iure quod blanditiis assumenda ipsam quaerat ad architecto
            perspiciatis!
          </p>
          <Link to='/register' className='btn btn-hero'>
            Login/Register
          </Link>
        </div>
        <img src={main} alt='job hunt' className='img main-img' />
      </div>
    </Wrapper>
  );
};

export default Landing;
