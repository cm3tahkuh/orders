import hero from "../../assets/images/hero.jpg";

import './Hero.scss';

const Hero = () => {
  return (
    <section className="hero">
        <div className="container">
            <div className="hero__column">
      <h1 className="hero__title">Клининговая служба</h1>
      <img className="hero__image" src={hero} alt="Клининг" />
      <p className="hero__paragraph">
        Профессиональная уборка для дома и офиса с гарантией качества. Быстро,
        безопасно и эффективно — наш опыт и подход обеспечат идеальный порядок,
        чтобы вы могли наслаждаться чистотой без лишних усилий.
      </p>
      </div>
      </div>
    </section>
  );
};

export default Hero;
