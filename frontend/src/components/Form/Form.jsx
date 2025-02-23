import "./Form.scss";
import InputMask from "react-input-mask";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { motion } from "framer-motion";
const Form = () => {
  const { register, handleSubmit } = useForm();
  const [sendResponse, setSendResponse] = useState({
    success: false,
    message: "",
  });

  const sendForm = async (data) => {
    try {
      const response = await axios.post("http://localhost:5295/Form", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setSendResponse({ success: true, message: `${response.data}` });

      setTimeout(() => setSendResponse({ success: false, message: "" }), 5000);
    } catch (error) {
      setSendResponse({
        success: false,
        message: `Ошибка при отправке формы. ${error.message}`,
      });
      console.error("Ошибка отправки формы:", error);

      setTimeout(() => setSendResponse({ success: false, message: "" }), 5000);
    }
  };

  return (
    <section className="form">
      <div className="form__container">
        <h2 className="form__title">Оставьте заявку на уборку прямо сейчас!</h2>
        <form className="form__block" onSubmit={handleSubmit(sendForm)}>
          <label className="form__label" htmlFor="name">
            Имя
          </label>
          <input
            className="form__input"
            type="text"
            name="name"
            placeholder="Ваше имя"
            {...register("name")}
            required
          />

          <label className="form__label" htmlFor="phone">
            Номер телефона
          </label>
          <InputMask mask="+7 (999) 999-99-99" {...register("phone")} required>
            {(inputProps) => (
              <input
                {...inputProps}
                className="form__input"
                type="tel"
                name="phone"
                placeholder="Номер телефона"
              />
            )}
          </InputMask>

          <label className="form__label" htmlFor="description">
            Комментарий
          </label>
          <input
            className="form__input"
            type="text"
            name="description"
            placeholder="Описание вашей проблемы"
            {...register("description")}
            required
          />

          <button className="form__button" type="submit">
            Отправить
          </button>
        </form>

      </div>
      {sendResponse.message && (
          <div style={{display: 'flex',alignItems:'center',justifyContent: 'center',width:'100%'}}>
            <motion.div
              initial={{ opacity: 0, transition: { duration: 0.4 } }}
              whileInView={{ opacity: 1 }}
              className={`form__status ${
                sendResponse.success ? "success" : "error"
              }`}
            >
              {sendResponse.message}
            </motion.div>
          </div>
        )}
    </section>
  );
};

export default Form;
