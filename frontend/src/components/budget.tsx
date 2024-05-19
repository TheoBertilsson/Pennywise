import { useLocation } from "react-router-dom";
const budget = () => {
  const location = useLocation();
  const pathName:string = location.pathname.split('/')[1];
  console.log(pathName);

  return (
    <header className="headerBudget">
      <div className="budgetDiv">
        <p>Budget |</p>
        <select name="budgets" id="selectBudget">
          <option value="My household">My household</option>
        </select>
      </div>

      <span>200$ Left</span>
      <nav className="budgetNav">
        <a style={pathName === 'remaining' ? { backgroundColor: '#e9e9e94b' } : {}} href="/remaining">Remaining</a>
        <a href="/budget" style={pathName === 'budget' ? { backgroundColor: '#e9e9e94b' } : {}}>Budget</a>
        <a style={pathName === 'insight' ? { backgroundColor: '#e9e9e94b' } : {}} href="/insights">Insights</a>
      </nav>
    </header>
  );
};

export default budget;
