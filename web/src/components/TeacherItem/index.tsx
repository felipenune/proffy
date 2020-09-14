import React from "react";

import whatsIcon from "../../assets/images/icons/whatsapp.svg";
import api from "../../services/api";

import "./styles.css";

export interface Teacher {
  id: number,
  avatar: string,
  bio: string,
  cost: number,
  name: string,
  subject: string,
  whats: string
}

interface TeacherItemProps {
  teacher: Teacher
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  function createConnection() {
    console.log(teacher)
    api.post('connections', {
      user_id: teacher.id
    })
  }

  return (
    <article className="teacher-item">
      <header>
        <img
          src={teacher.avatar}
          alt={teacher.name}
        />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>
        {teacher.bio}
      </p>

      <footer>
        <p>
          Preço/Hora:
          <strong>R$ {teacher.cost}</strong>
        </p>
        <a 
          target="_blank" 
          rel="noopener noreferrer" 
          onClick={createConnection} 
          href={`https://wa.me/${teacher.whats}`}
        >
          <img src={whatsIcon} alt="whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
