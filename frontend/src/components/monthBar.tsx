import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";

interface monthProp {
  getTotal(): Promise<void>;
  setStartMonth(month: number): void;
  setEndMonth(month: number): void;
}
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

const monthBar = (props: monthProp) => {
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [monthOne, setMonthOne] = useState<string>("");
  const [monthTwo, setMonthTwo] = useState<string>("");
  const date: Date = new Date();

  useEffect(() => {
    const day = date.getDate();
    if (day < 25) {
      setMonthOne(monthNames[(month - 1 + 12) % 12]);
      setMonthTwo(monthNames[month]);

      props.setStartMonth((month - 1 + 12) % 12);
      props.setEndMonth(month);
      props.getTotal();
    } else {
      setMonthOne(monthNames[month]);
      setMonthTwo(monthNames[(month + 1) % 12]);
      props.setStartMonth(month);
      props.setEndMonth((month + 1) % 12);
      props.getTotal();
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
      <div className="monthBox">
        <ArrowLeft onClick={lastMonth} />
        <span className="month">
          {monthOne} 25th - {monthTwo} 24th
        </span>{" "}
        <ArrowRight onClick={nextMonth} />
      </div>
    </>
  );
};

export default monthBar;
