import "./Cards.scss";
import card1 from '../../assets/images/card1.jpg'

const cardData = [
    {
        title: "Профессиональная уборка для вашего комфорта",
        paragraph:
          "Мы предлагаем высококачественные услуги клининга для любых типов помещений — от квартир до офисов.",
        image: "/src/assets/images/card1.jpg",
        },
  {
    title: "Безопасность и чистота",
    paragraph:
      "Мы применяем экологически чистые моющие средства, которые безопасны для здоровья и не оставляют неприятных запахов.",
      image: "/src/assets/images/card2.jpg",
  },
];

const Cards = () => {
  return (
    <section className="cards">
      <div className="cards__container">
        <div className="cards__column">
          {cardData.map((card, index) => (
            <div key={index} className="cards__row">
            <img src={card.image} alt="" className="cards__image" />
            <div className="cards__text__block">
              <h2 className="cards__text__title">{card.title}</h2>
              <p className="cards__text__paragraph">{card.paragraph}</p>
            </div>
          </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cards;
