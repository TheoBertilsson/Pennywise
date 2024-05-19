import Budgetheader from "./components/budget";
import Footer from "./components/footer";

const remainingBudget = () => {
  return (
    <>
      <Budgetheader />

      <main className="budgetBox">
        <div className="monthBox"><span>&lt;-</span>
          <span className="month">May 25th - June 24th</span> <span>-&gt;</span>
        </div>

        <div className="budgetOutcome">
          <div className="chartBox">

            <span>Chart</span>
            <span>----$ left in budget</span>
          </div>
          <div className="categorieBox">
            <div className="categorieBudget">
              <span>Housing ..%</span>
              <span>Food ..%</span>
              <span>Savings ..%</span>
              <span>Lifestyle ..%</span>
              <span>Hobby ..%</span>
              <span>Subscriptions ..%</span>
            </div>
            <div className="categorieTotal">
              <span>500$</span>
              <span>400$</span>
              <span>300$</span>
              <span>50$</span>
              <span>60$</span>
              <span>300$</span>
            </div>
          </div>
        </div>
        <div className="budgetOutcome">
          <div className="chartBox">
            <span>INCOME</span>
            <span>----$</span>
          </div>
          <div className="categorieBox">
            <div className="categorieBudget">
              <span>Work ..%</span>
              <span>Stocks ..%</span>
              <span>Side hustle ..%</span>
            </div>
            <div className="categorieTotal">
              <span>500$</span>
              <span>400$</span>
              <span>300$</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default remainingBudget;
