import { useState, useEffect } from "react";
import Budget from "./components/budget";
import Footer from "./components/footer";
import AddItemBudget from "./components/addItemBudget";
import MonthBar from "./components/monthBar";
import { useParams } from "react-router-dom";

const budgetSite = () => {
  const { token } = useParams<string>();
  const [id, setId] = useState<number>();
  const [housing, setHousing] = useState<number>(0);
  const [food, setFood] = useState<number>(0);
  const [lifestyle, setLifestyle] = useState<number>(0);
  const [hobby, setHobby] = useState<number>(0);
  const [subs, setSubs] = useState<number>(0);
  const [savings, setSavings] = useState<number>(0);
  const [other, setOther] = useState<number>(0);
  const [income, setIncome] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  return (
    <>
      <Budget />
      <main className="budgetBox">
        <MonthBar />
        <AddItemBudget />
        <div className="budgetOutcome">
          <div className="chartBox">
            <span>Chart</span>
            <span>{total}$ LEFT</span>
          </div>
          <div className="categorieBox">
            <div className="categorieBudget">
              <span>Housing ..%</span>
              <span>Food ..%</span>
              <span>Savings ..%</span>
              <span>Lifestyle ..%</span>
              <span>Hobby ..%</span>
              <span>Subscriptions ..%</span>
              <span>Other ..%</span>
            </div>
            <div className="categorieTotal">
              <span>{housing}$</span>
              <span>{food}$</span>
              <span>{lifestyle}$</span>
              <span>{hobby}$</span>
              <span>{subs}$</span>
              <span>{savings}$</span>
              <span>{other}$</span>
            </div>
          </div>
        </div>
        <div className="budgetIncome">
          <div className="chartBox">
            <span>INCOME</span>
            <span>{income}$</span>
          </div>
        </div>
        <div className="budgetIncome">
          <div className="chartBox">
            <span>SAVINGS</span>
            <span>{savings}$</span>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default budgetSite;
