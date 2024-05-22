import Budget from "./components/budget"
import AddItemBudget from "./components/addItemBudget";
import MonthBar from "./components/monthBar";
import Footer from "./components/footer";

const transactions = () => {
  return (
    <>
        <Budget/>
        <MonthBar/>
        <Footer/>
    </>
  )
}

export default transactions
