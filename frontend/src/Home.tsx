import clownImg from "./assets/clown.png";
import flyingBuck from "./assets/flying-money(1).png";
import piggyBank from "./assets/piggy-bank.png";
import budget from "./assets/budget.png";

function Home() {
  return (
    <>
      <header className="mainHeader">
        <img src={clownImg} alt="Picture of clown face" className="appImg" />
      </header>
      <main className="homeMain">
        <span className="welcome">Welcome to</span>
        <span className="pennywise">PENNYWISE</span>
        <section className="spending">
          <img src={flyingBuck} alt="A five dollar bill with wings" />
          <span className="track">TRACK YOUR SPENDING</span>
          <p>Add your expenses to see where your money is floating away</p>
        </section>
        <section className="budget">
          <img src={budget} alt="Circle chart of a budget" />
          <span className="track">Build a personal budget</span>
          <p>Make a personal budget and get tips for your economy</p>
        </section>
        <section className="piggy">
          <img src={piggyBank} alt="Piggy bank with a coin inserted" />
          <span className="track">Start saving</span>
          <p>Start tracking your savings and reach your goal</p>
        </section>
        <a href="#/signup" className="signupBtn">
          Get started
        </a>
        <a href="#/login" className="loginBtn">
          Already member?
        </a>
      </main>
    </>
  );
}

export default Home;
