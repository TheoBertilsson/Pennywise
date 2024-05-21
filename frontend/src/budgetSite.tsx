import { useState, useEffect } from "react";
import Budget from "./components/budget";
import Footer from "./components/footer";
import { ArrowLeft } from "react-bootstrap-icons";
import { ArrowRight } from "react-bootstrap-icons";
const monthNames: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const budgetSite = () => {
  const [month, setMonth] = useState<number>(new Date().getMonth()); // Initialize with the current month
  const [monthOne, setMonthOne] = useState<string>("");
  const [monthTwo, setMonthTwo] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    const day = date.getDate();
    if (day < 25) {
      setMonthOne(monthNames[(month - 1 + 12) % 12]);
      setMonthTwo(monthNames[month]);
    } else {
      setMonthOne(monthNames[month]);
      setMonthTwo(monthNames[(month + 1) % 12]);
    }
  }, [month, date]);

  const lastMonth = () => {
    setMonth((prevMonth) => (prevMonth > 0 ? prevMonth - 1 : 11));
  };

  const nextMonth = () => {
    setMonth((prevMonth) => (prevMonth + 1) % 12);
  };
  return (
    <>
      <Budget />
      <main className="budgetBox">
        <div className="monthBox">
          <ArrowLeft onClick={lastMonth} />
          <span className="month">
            {monthOne} 25th - {monthTwo} 24th
          </span>{" "}
          <ArrowRight onClick={nextMonth} />
        </div>

        <div className="budgetOutcome">
          <div className="chartBox">
            <span>Chart</span>
            <span>----$ budget</span>
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

export default budgetSite;
