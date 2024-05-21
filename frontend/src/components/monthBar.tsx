import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";

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

const monthBar = () => {
  const [month, setMonth] = useState<number>(new Date().getMonth()); // Initialize with the current month
  const [monthOne, setMonthOne] = useState<string>("");
  const [monthTwo, setMonthTwo] = useState<string>("");
  const date: Date = new Date();

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
