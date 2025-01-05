import "./Form.scss";

const Form = () => {
  return (
    <section className="form">
      <div className="form__container">
        <h2 className="form__title">Оставьте заявку на уборку прямо сейчас!</h2>
        <form className="form__block">
          <label className="form__label" htmlFor="name">
            Имя
          </label>
          <input
            className="form__input"
            type="text"
            name="name"
            placeholder="Ваше имя"
          />
          <label className="form__label" htmlFor="number">
            Номер телефона
          </label>
          <input
            className="form__input"
            type="tel"
            name="number"
            placeholder="Номер телефона"
          />
          <label className="form__label" htmlFor="comment">
            Комментарий
          </label>
          <input
            className="form__input"
            type="text"
            name="comment"
            placeholder="Описание вашей проблемы"
          />
          <button className="form__button">Отправить</button>
        </form>
      </div>
    </section>
  );
};

export default Form;
