import { useState, useEffect } from "react";
import Budget from "./components/budget";
import Footer from "./components/footer";
import AddItemBudget from "./components/addItemBudget";
import MonthBar from "./components/monthBar";
import { useParams } from "react-router-dom";
import { authenticate } from "./util/authenticate";

const budgetSite = () => {
  const { token } = useParams<string>();
  const [id, setId] = useState<number>(0);
  const [housing, setHousing] = useState<number>(0);
  const [food, setFood] = useState<number>(0);
  const [vehicle, setVehicle] = useState<number>(0);
  const [hobby, setHobby] = useState<number>(0);
  const [subs, setSubs] = useState<number>(0);
  const [savings, setSavings] = useState<number>(0);
  const [other, setOther] = useState<number>(0);
  const [income, setIncome] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const handleID = async () => {
    if (token !== undefined) {
      setId(await authenticate(token));
    }
  };
  useEffect(() => {
    handleID();
  }, [token]);
  return (
    <>
      <Budget />
      <main className="budgetBox">
        <MonthBar />
        <AddItemBudget id={id} />
        <div className="budgetOutcome">
          <div className="chartBox">
            <span>Chart</span>
            <span>
              {total}$ LEFT
            </span>
          </div>
          <div className="categorieBox">
            <div className="categorieBudget">
              <span>Housing ..%</span>
              <span>Food ..%</span>
              <span>Savings ..%</span>
              <span>Vehicle ..%</span>
              <span>Hobby ..%</span>
              <span>Subscriptions ..%</span>
              <span>Other ..%</span>
            </div>
            <div className="categorieTotal">
              <span>{housing}$</span>
              <span>{food}$</span>
              <span>{vehicle}$</span>
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
