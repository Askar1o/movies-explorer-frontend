import React from "react";
import "./AboutProject.css";
import SectionName from "../SectionName/SectionName";

function AboutProject() {
  return (
    <section className="about" id="about">
      <div className="about__container">
        <SectionName>О проекте</SectionName>
        <ul className="about__info-list">
          <li className="about__info-element">
            <h2 className="about__info-title">
              Дипломный проект включал 5 этапов
            </h2>
            <p className="about__info-text">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </li>
          <li className="about__info-element">
            <h2 className="about__info-title">
              На выполнение диплома ушло 5 недель
            </h2>
            <p className="about__info-text">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>
        <div className="about__timeline">
          <h3 className="about__timeline-title about__timeline-title_type_left">
            1 неделя
          </h3>
          <h3 className="about__timeline-title">4 недели</h3>
          <p className="about__timeline-text">Back-end</p>
          <p className="about__timeline-text">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
