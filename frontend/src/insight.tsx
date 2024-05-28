import Footer from "./components/footer";

const insight = () => {
  return (
    <>
      <main className="budgetBox">
        <div className="monthBox">
          <span>&lt;-</span>
          <span className="month">May 25th - June 24th</span> <span>-&gt;</span>
        </div>

        <div className="budgetOutcome">
          <div className="chartBox">
            <span>Money floating away</span>
            <span>36543$</span>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default insight;
