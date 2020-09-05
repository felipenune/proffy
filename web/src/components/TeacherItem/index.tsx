import React from "react";

import whatsIcon from "../../assets/images/icons/whatsapp.svg";

import "./styles.css";

const TeacherItem: React.FC = () => {
  return (
    <article className="teacher-item">
      <header>
        <img
          src="https://avatars0.githubusercontent.com/u/41213964?s=460&u=e8dc2025d7778a90ac0acc078a27a9527e50d2c7&v=4"
          alt="Felipe Nunes"
        />
        <div>
          <strong>Felipe Nunes</strong>
          <span>Química</span>
        </div>
      </header>

      <p>
        Lorem Ipsum is simply dummy text of the
        <br />
        <br />
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>

      <footer>
        <p>
          Preço/Hora:
          <strong>R$ 20,00</strong>
        </p>
        <button type="button">
          <img src={whatsIcon} alt="whatsapp" />
          Entrar em contato
        </button>
      </footer>
    </article>
  );
};

export default TeacherItem;
