import Footer from "./components/footer";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MonthBar from "./components/monthBar";
import { authenticate } from "./util/authenticate";
import { getTotalFunc } from "./util/getTotalFunc";
import Budget from "./components/budget";
import AddItemBudget from "./components/addItemBudget";
import RemoveItem from "./components/removeItem";

const transactions = () => {
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
  const [left, setLeft] = useState<number>(0);
  const [currency, setCurrency] = useState<string>("");
  const month = new Date().getMonth();
  const date: Date = new Date();
  const day = date.getDate();
  const [startMonth, setStartMonth] = useState<number>(month);
  const [endMonth, setEndMonth] = useState<number>(month + 1);
  const [items, setItems] = useState<Array<any>>([]);

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
    getCategories(totalResult, totalCost);
    getItems();
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
    } else {
      setHousing(0);
    }
    if (totalCostPerCategory.food > 0) {
      setFood(totalCostPerCategory.food);
    } else {
      setFood(0);
    }
    if (totalCostPerCategory.vehicle > 0) {
      setVehicle(totalCostPerCategory.vehicle);
    } else {
      setVehicle(0);
    }
    if (totalCostPerCategory.hobby > 0) {
      setHobby(totalCostPerCategory.hobby);
    } else {
      setHobby(0);
    }
    if (totalCostPerCategory.sub > 0) {
      setSubs(totalCostPerCategory.sub);
    } else {
      setSubs(0);
    }
    if (totalCostPerCategory.savings > 0) {
      setSavings(totalCostPerCategory.savings);
    } else {
      setSavings(0);
    }
    if (totalCostPerCategory.other > 0) {
      setOther(totalCostPerCategory.other);
    } else {
      setOther(0);
    }
    if (totalCostPerCategory.income > 0) {
      setIncome(totalCostPerCategory.income);
      setLeft(totalCostPerCategory.income - totalCost);
    } else {
      setIncome(0);
      setLeft(0 - totalCost);
    }
  };
  const getItems = async () => {
    try {
      const thisMonth = endMonth;
      const response = await fetch(
        `/getTotal?id=${id}&month=${thisMonth}&day=${day}`
      );
      if (response.ok) {
        const result = await response.json();

        setItems(result);
      } else {
        const text = await response.text();
        throw new Error(text || response.statusText);
      }
    } catch (error) {
      console.log("Fetch error: " + error);
      return false;
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
        <div className="transactionsBox">
          <p>
            Housing:&nbsp;
            {housing}
            {currency}
          </p>
        </div>
        {items
          .filter((item) => item.category === "housing")
          .map((item) => (
            <div key={item.id} className="transactionsDiv">
              <p>{item.item}</p>
              <p className="transactionCategory">{item.category}</p>{" "}
              <p>
                {item.cost}
                {currency}
              </p>
            </div>
          ))}
        <div className="transactionsBox">
          <p>
            Food:&nbsp;
            {food}
            {currency}
          </p>
        </div>
        {items
          .filter((item) => item.category === "food")
          .map((item) => (
            <div key={item.id} className="transactionsDiv">
              <p>{item.item}</p>
              <p className="transactionCategory">{item.category}</p>{" "}
              <p>
                {item.cost}
                {currency}
              </p>
            </div>
          ))}
        <div className="transactionsBox">
          <p>
            Vehicle:&nbsp;
            {vehicle}
            {currency}
          </p>
        </div>
        {items
          .filter((item) => item.category === "vehicle")
          .map((item) => (
            <div key={item.id} className="transactionsDiv">
              <p>{item.item}</p>
              <p className="transactionCategory">{item.category}</p>{" "}
              <p>
                {item.cost}
                {currency}
              </p>
            </div>
          ))}
        <div className="transactionsBox">
          <p>
            Hobby:&nbsp;
            {hobby}
            {currency}
          </p>
        </div>
        {items
          .filter((item) => item.category === "hobby")
          .map((item) => (
            <div key={item.id} className="transactionsDiv">
              <p>{item.item}</p>
              <p className="transactionCategory">{item.category}</p>{" "}
              <p>
                {item.cost}
                {currency}
              </p>
            </div>
          ))}
        <div className="transactionsBox">
          <p>
            Subscriptions:&nbsp;
            {subs}
            {currency}
          </p>
        </div>
        {items
          .filter((item) => item.category === "sub")
          .map((item) => (
            <div key={item.id} className="transactionsDiv">
              <p>{item.item}</p>
              <p className="transactionCategory">{item.category}</p>{" "}
              <p>
                {item.cost}
                {currency}
              </p>
            </div>
          ))}{" "}
        <div className="transactionsBox">
          <p>
            Other:&nbsp;
            {other}
            {currency}
          </p>
        </div>
        {items
          .filter((item) => item.category === "other")
          .map((item) => (
            <div key={item.id} className="transactionsDiv">
              <p>{item.item}</p>
              <p className="transactionCategory">{item.category}</p>{" "}
              <p>
                {item.cost}
                {currency}
              </p>
            </div>
          ))}
        <div className="transactionsBox">
          <p>
            Savings:&nbsp;
            {savings}
            {currency}
          </p>
        </div>
        {items
          .filter((item) => item.category === "savings")
          .map((item) => (
            <div key={item.id} className="transactionsDiv">
              <p>{item.item}</p>
              <p className="transactionCategory">{item.category}</p>{" "}
              <p>
                {item.cost}
                {currency}
              </p>
            </div>
          ))}
        <div className="transactionsBox">
          <p>
            Income:&nbsp;
            {income}
            {currency}
          </p>
        </div>
        {items
          .filter((item) => item.category === "income")
          .map((item) => (
            <div key={item.id} className="transactionsDiv">
              <p>{item.item}</p>
              <p className="transactionCategory">{item.category}</p>{" "}
              <p>
                {item.cost}
                {currency}
              </p>
            </div>
          ))}
      </main>

      <Footer />
    </>
  );
};

export default transactions;
