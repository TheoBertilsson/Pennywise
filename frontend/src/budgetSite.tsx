import { useState, useEffect } from "react";
import Budget from "./components/budget";
import Footer from "./components/footer";
import AddItemBudget from "./components/addItemBudget";
import MonthBar from "./components/monthBar";
import { useParams } from "react-router-dom";
import { authenticate } from "./util/authenticate";
import { getTotalFunc } from "./util/getTotalFunc";
import RemoveItem from "./components/removeItem";

const BudgetSite = () => {
  const { token } = useParams<string>();
  const [id, setId] = useState<number>(0);
  const [housing, setHousing] = useState<number>(0);
  const [housingProcent, setHousingProcent] = useState<number>(0);
  const [food, setFood] = useState<number>(0);
  const [foodProcent, setFoodProcent] = useState<number>(0);
  const [vehicle, setVehicle] = useState<number>(0);
  const [vehicleProcent, setVehicleProcent] = useState<number>(0);
  const [hobby, setHobby] = useState<number>(0);
  const [hobbyProcent, setHobbyProcent] = useState<number>(0);
  const [subs, setSubs] = useState<number>(0);
  const [subsProcent, setSubsProcent] = useState<number>(0);
  const [savings, setSavings] = useState<number>(0);
  const [savingsProcent, setSavingsProcent] = useState<number>(0);
  const [other, setOther] = useState<number>(0);
  const [otherProcent, setOtherProcent] = useState<number>(0);
  const [income, setIncome] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);
  const [currency, setCurrency] = useState<string>("");
  const month = new Date().getMonth();
  const date: Date = new Date();
  const day = date.getDate();
  const [startMonth, setStartMonth] = useState<number>(month);
  const [endMonth, setEndMonth] = useState<number>(month + 1);

  const handleID = async () => {
    if (token !== undefined) {
      const authenticatedId = await authenticate(token);
      setId(authenticatedId);
    }
  };

  const getTotal = async () => {
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
      const procent: any = (totalCostPerCategory.housing / totalCost) * 100;
      setHousingProcent(procent.toFixed(1));
    } else {
      setHousing(0);
      setHousingProcent(0);
    }
    if (totalCostPerCategory.food > 0) {
      setFood(totalCostPerCategory.food);
      const procent: any = (totalCostPerCategory.food / totalCost) * 100;
      setFoodProcent(procent.toFixed(1));
    } else {
      setFood(0);
      setFoodProcent(0);
    }
    if (totalCostPerCategory.vehicle > 0) {
      setVehicle(totalCostPerCategory.vehicle);
      const procent: any = (totalCostPerCategory.vehicle / totalCost) * 100;
      setVehicleProcent(procent.toFixed(1));
    } else {
      setVehicle(0);
      setVehicleProcent(0);
    }
    if (totalCostPerCategory.hobby > 0) {
      setHobby(totalCostPerCategory.hobby);
      const procent: any = (totalCostPerCategory.hobby / totalCost) * 100;
      setHobbyProcent(procent.toFixed(1));
    } else {
      setHobby(0);
      setHobbyProcent(0);
    }
    if (totalCostPerCategory.sub > 0) {
      setSubs(totalCostPerCategory.sub);
      const procent: any = (totalCostPerCategory.sub / totalCost) * 100;
      setSubsProcent(procent.toFixed(1));
    } else {
      setSubs(0);
      setSubsProcent(0);
    }
    if (totalCostPerCategory.savings > 0) {
      setSavings(totalCostPerCategory.savings);
      const procent: any = (totalCostPerCategory.savings / totalCost) * 100;
      setSavingsProcent(procent.toFixed(1));
    } else {
      setSavings(0);
      setSavingsProcent(0);
    }
    if (totalCostPerCategory.other > 0) {
      setOther(totalCostPerCategory.other);
      const procent: any = (totalCostPerCategory.other / totalCost) * 100;
      setOtherProcent(procent.toFixed(1));
    } else {
      setOther(0);
      setOtherProcent(0);
    }
    if (totalCostPerCategory.income > 0) {
      setIncome(totalCostPerCategory.income);
      setLeft(totalCostPerCategory.income - totalCost);
    } else {
      setIncome(0);
      setLeft(0 - totalCost);
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
      <Budget
        left={left}
        currency={currency}
        setCurrency={setCurrency}
        token={token}
      />
      <main className="budgetBox">
        <MonthBar
          getTotal={getTotal}
          setStartMonth={setStartMonth}
          setEndMonth={setEndMonth}
        />
        <AddItemBudget id={id} getTotal={getTotal} endMonth={endMonth} />
        <RemoveItem id={id} getTotal={getTotal} endMonth={endMonth} />
        <div className="budgetOutcome">
          <div className="chartBox">
            <span>
              {total}
              {currency} Total
            </span>
          </div>
          <div className="categorieBox">
            <div className="categorieBudget">
              <span>Housing {housingProcent}%</span>
              <span>Food {foodProcent}%</span>
              <span>Vehicle {vehicleProcent}%</span>
              <span>Hobby {hobbyProcent}%</span>
              <span>Subscriptions {subsProcent}%</span>
              <span>Savings {savingsProcent}%</span>
              <span>Other {otherProcent}%</span>
            </div>
            <div className="categorieTotal">
              <span>
                {housing}
                {currency}
              </span>
              <span>
                {food}
                {currency}
              </span>
              <span>
                {vehicle}
                {currency}
              </span>
              <span>
                {hobby}
                {currency}
              </span>
              <span>
                {subs}
                {currency}
              </span>
              <span>
                {savings}
                {currency}
              </span>
              <span>
                {other}
                {currency}
              </span>
            </div>
          </div>
        </div>
        <div className="budgetIncome">
          <div className="chartBox">
            <span>INCOME</span>
            <span>
              {income}
              {currency}
            </span>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BudgetSite;
