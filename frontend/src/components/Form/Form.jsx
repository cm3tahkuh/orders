import "./Form.scss";
import InputMask from "react-input-mask";
import { useEffect, useState } from "react";

const Form = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const getRequest = await fetch("http://localhost:5295/Form");
      const getResponse = await getRequest.json();
      console.log(getResponse);
      setData(getResponse);
    };

    fetchData();
  }, []);

  return (
    <section className="form">
      <div className="form__container">
        <div>
          {data && data.length > 0 ? (
            data.map((form) => {
              return (
                <div key={form.id}>
                  {" "}
                  {/* Добавляем ключ для каждого элемента */}
                  <div className="form__title">{form.id}</div>
                  <div className="form__title">{form.name}</div>
                  <div className="form__title">{form.phone}</div>
                  <div className="form__title">{form.description}</div>
                </div>
              );
            })
          ) : (
            <p>Нет данных для отображения</p>
          )}
        </div>
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
          <InputMask mask="+7 (999) 999-99-99">
            {() => (
              <input
                className="form__input"
                type="tel"
                name="number"
                placeholder="Номер телефона"
              />
            )}
          </InputMask>

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
