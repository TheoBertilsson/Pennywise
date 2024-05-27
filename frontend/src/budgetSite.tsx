import { useState, useEffect } from "react";
import Budget from "./components/budget";
import Footer from "./components/footer";
import AddItemBudget from "./components/addItemBudget";
import MonthBar from "./components/monthBar";
import { useParams } from "react-router-dom";
import { authenticate } from "./util/authenticate";
import { getTotalFunc } from "./util/getTotalFunc";

const BudgetSite = () => {
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
  const [left, setLeft] = useState<number>(0);
  const month = new Date().getMonth();
  const date: Date = new Date();
  const day = date.getDate();
  const [startMonth, setStartMonth] = useState<number>(month);
  const [endMonth, setEndMonth] = useState<number>(month+1);
  const handleID = async () => {
    if (token !== undefined) {
      const authenticatedId = await authenticate(token);
      setId(authenticatedId);
    }
  };

  const getTotal = async () => {
    console.log(month + " " + startMonth + " " + day);
    if (id === 0) return;
    const totalResult = await getTotalFunc(id, startMonth, day);
    const totalCost = totalResult
      .filter((item: any) => item.category !== "income")
      .reduce((sum: number, item: any) => sum + item.cost, 0);
    setTotal(totalCost);
    getCategories(totalResult, totalCost);
  };

  const getCategories = (totalResult: any, totalCost: number) => {
    const totalCostPerCategory = totalResult.reduce((acc: any, item: any) => {
      if (!acc[item.category]) {
        acc[item.category] = 0;
      }
      acc[item.category] += item.cost;
      return acc;
    }, {});

    if (totalCostPerCategory.housing > 0) {
      setHousing(totalCostPerCategory.housing);
    }
    if (totalCostPerCategory.food > 0) {
      setFood(totalCostPerCategory.food);
    }
    if (totalCostPerCategory.vehicle > 0) {
      setVehicle(totalCostPerCategory.vehicle);
    }
    if (totalCostPerCategory.hobby > 0) {
      setHobby(totalCostPerCategory.hobby);
    }
    if (totalCostPerCategory.sub > 0) {
      setSubs(totalCostPerCategory.sub);
    }
    if (totalCostPerCategory.savings > 0) {
      setSavings(totalCostPerCategory.savings);
    }
    if (totalCostPerCategory.other > 0) {
      setOther(totalCostPerCategory.other);
    }
    if (totalCostPerCategory.income > 0) {
      setIncome(totalCostPerCategory.income);
      setLeft(totalCostPerCategory.income - totalCost);
    }
  };

  useEffect(() => {
    handleID();
  }, [token]);

  useEffect(() => {
    if (id !== 0) {
      getTotal();
    }
  }, [id]);

  return (
    <>
      <Budget left={left} />
      <main className="budgetBox">
        <MonthBar getTotal={getTotal} setStartMonth={setStartMonth} setEndMonth={setEndMonth}/>
        <AddItemBudget id={id} getTotal={getTotal} />
        <div className="budgetOutcome">
          <div className="chartBox">
            <span>Chart</span>
            <span>{total}$ Total</span>
          </div>
          <div className="categorieBox">
            <div className="categorieBudget">
              <span>Housing ..%</span>
              <span>Food ..%</span>
              <span>Vehicle ..%</span>
              <span>Hobby ..%</span>
              <span>Subscriptions ..%</span>
              <span>Savings ..%</span>
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

export default BudgetSite;
