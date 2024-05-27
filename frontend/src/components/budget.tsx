import { useLocation } from "react-router-dom";
interface budgetProp {
  left: number;
}
const budget = (props:budgetProp) => {
  const location = useLocation();
  const pathName:string = location.pathname.split('/')[1];

  return (
    <header className="headerBudget">

      <span>{props.left}$ Left</span>
      <nav className="budgetNav">
        <a href="/budget" style={pathName === 'budget' ? { backgroundColor: '#e9e9e94b' } : {}}>Budget</a>
        <a style={pathName === 'transaction' ? { backgroundColor: '#e9e9e94b' } : {}} href="/transaction">Transactions</a>
        <a style={pathName === 'insight' ? { backgroundColor: '#e9e9e94b' } : {}} href="/insight">Insights</a>
      </nav>
    </header>
  );
};

export default budget;
