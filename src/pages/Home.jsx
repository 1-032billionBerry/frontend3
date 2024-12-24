import React from 'react';
import Header from '../components/Header';

function Home() {
  return (
    <>
      <Header />
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="display-4">Ласкаво просимо до KPI-tter</h1>
        </div>

        <section className="about mb-5">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <h2 className="text-center">Про KPI-tter</h2>
              <p className="text-muted">
                KPI-tter — це соціальна платформа для професіоналів, де можна ділитися думками,
                ідеями та обговореннями, що стосуються вашої роботи та особистих проєктів. Це
                допомагає користувачам залишатися на зв'язку з колегами та ефективно обмінюватися
                знаннями.
              </p>
            </div>
          </div>
        </section>

        <section className="advantages mb-5">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <h2 className="text-center">Переваги</h2>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Діліться своїми професійними досягненнями</li>
                <li className="list-group-item">Залишайтеся на зв'язку з однодумцями</li>
                <li className="list-group-item">Отримуйте відгуки на свої ідеї та проєкти</li>
                <li className="list-group-item">
                  Будьте в курсі останніх тенденцій у вашій галузі
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="how-it-works">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <h2 className="text-center">Як це працює</h2>
              <p className="text-muted">
                Зареєструйтеся, створіть профіль та почніть публікувати! Ви можете ставити лайки,
                коментувати та ділитися контентом із вашою мережею. Це чудовий спосіб побудувати
                свою онлайн-презентацію та залишатися в курсі подій у своїй професійній сфері.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
