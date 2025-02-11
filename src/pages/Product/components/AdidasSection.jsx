import React from "react";
import "./AdidasSection.scss";
import logo from '../../../assets/logo/Adidas_Logo.svg'

const AdidasSection = () => {
  return (
    <div className="adidas-section">
      <h2>STORIES, STYLES AND SPORTSWEAR AT ADIDAS, SINCE 1949</h2>
      <p>
        Sport keeps us fit. Keeps you mindful. Brings us together. Through sport we have the power to
        change lives. Whether it is through stories of inspiring athletes. Helping you to get up and
        get moving. Sportswear featuring the latest technologies, to up your performance. Beat your
        PB. adidas offers a home to the runner, the basketball player, the soccer kid, the fitness
        enthusiast. The weekend hiker that loves to escape the city. The yoga teacher that spreads
        the moves. The 3-Stripes are seen in the music scene. On stage, at festivals. Our sports
        clothing keeps you focused before that whistle blows. During the race. And at the finish
        lines. We’re here to support creators. Improve their game. Their lives. And change the
        world.
      </p>
      <p>
        adidas is about more than sportswear and workout clothes. We partner with the best in the
        industry to co-create. This way we offer our fans the sports apparel and style that match
        their athletic needs, while keeping sustainability in mind. We’re here to support creators.
        Improve their game. Create change. And we think about the impact we have on our world.
      </p>
      <div className="adidas-logo">
                <img
                    src={logo}
                    alt='logo'
                    style={{
                        width:'60px',
                        height:'50px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease-in-out',
                        filter: "invert(100%)"
                    }}
                />
      </div>
    </div>
  );
};

export default AdidasSection;

