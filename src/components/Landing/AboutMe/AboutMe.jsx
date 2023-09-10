import React from "react";
import "./AboutMe.css";
import SectionName from "../SectionName/SectionName";
import { Link } from "react-router-dom";
import photo from "../../../images/student.png";
import Portfolio from "../Portfolio/Portfolio";

function AboutMe() {
  return (
    <section className="student" id="student">
      <SectionName>Студент</SectionName>
      <div className="student__container">
        <div className="student__info">
          <h3 className="student__name">Виталий</h3>
          <p className="student__job">Фронтенд-разработчик, 30 лет</p>
          <p className="student__about">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб&#8209;разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <Link className="student__link" to="https://github.com/Askar1o">
            Github
          </Link>
        </div>
        <img src={photo} alt="Фото студента" className="student__photo" />
      </div>
      <Portfolio />
    </section>
  );
}

export default AboutMe;
