import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { DoorOpenFill } from "react-bootstrap-icons";
import { logoutFunc } from "../util/logoutFunc";
interface budgetProp {
  left: number;
  currency: string;
  setCurrency: any;
  token: string | undefined;
}
const budget = (props: budgetProp) => {
  const location = useLocation();
  const pathName: string = location.pathname.split("/")[1];
  const navigate = useNavigate();
  useEffect(() => {
    const savedCurrency = localStorage.getItem("currency");
    if (savedCurrency) {
      props.setCurrency(savedCurrency);
    }
  }, []);
  const logout = async () => {
    if (props.token !== undefined) {
      const loggingOut = await logoutFunc(props.token);
      if (loggingOut) {
        navigate(`/`);
      }
    }
  };
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCurrency = e.target.value;
    props.setCurrency(newCurrency);
    localStorage.setItem("currency", newCurrency);
  };
  return (
    <header className="headerBudget">
      <DoorOpenFill className="loguoutBtn" onClick={logout} />
      <span>
        Left: &nbsp;
        {props.left}
        {props.currency}
      </span>
      <nav className="budgetNav">
        <a
          href={`#/budget/${props.token}`}
          style={pathName === "budget" ? { backgroundColor: "#e9e9e94b" } : {}}
        >
          Budget
        </a>
        <a
          style={
            pathName === "transaction" ? { backgroundColor: "#e9e9e94b" } : {}
          }
          href={`#/transaction/${props.token}`}
        >
          Transactions
        </a>
        <a
          style={pathName === "insight" ? { backgroundColor: "#e9e9e94b" } : {}}
          href={`#/insight/${props.token}`}
        >
          Insights
        </a>
      </nav>
      <select
        name="currency"
        id="currencyChoice"
        value={props.currency}
        onChange={handleCurrencyChange}
      >
        <option value="" disabled>
          -
        </option>
        <option value="kr">kr</option>
        <option value="$">$</option>
        <option value="€">€</option>
        <option value="£">£</option>
      </select>
    </header>
  );
};

export default budget;
