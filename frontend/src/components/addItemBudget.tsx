import { useState } from "react";
const addItemBudget = () => {
  const [item, setItem] = useState<string>("");
  const [cost, setCost] = useState<string>("");
  const [isMonthly, setIsMonthly] = useState<boolean>(false);
  const [showAddItem, setShowAddItem] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("housing");
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Add item logic
    setShowAddItem(false);
    fetch("http://localhost:3000/addBudget", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item: item,
        cost: cost,
        monthly: isMonthly,
        category: category,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Created budget item");
        } else {
          console.error("Error:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    console.log({ item, cost, isMonthly, category });
  };
  const handleClick = () => {
    if (!showAddItem) {
      setShowAddItem(true);
    }
  };
  return (
    <>
      {!showAddItem && (
        <button className="addItemBtn" onClick={handleClick}>
          Add Item
        </button>
      )}
      {showAddItem && (
        <form className="additemBox" onSubmit={handleSubmit}>
          <label htmlFor="item">
            Item:
            <input
              type="text"
              id="item"
              name="item"
              placeholder="Item"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
          </label>

          <label htmlFor="cost">
            Cost:
            <input
              type="number"
              id="cost"
              name="cost"
              placeholder="Cost"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </label>

          <label htmlFor="monthly">
            Monthly:
            <input
              type="checkbox"
              id="monthly"
              name="monthly"
              checked={isMonthly}
              onChange={(e) => setIsMonthly(e.target.checked)}
            />
          </label>

          <label htmlFor="selectCategory">
            Category:
            <select
              name="category"
              id="selectCategory"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="housing">Housing</option>
              <option value="food">Food</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="sub">Subscription</option>
              <option value="hobby">Hobby</option>
              <option value="savings">Savings</option>
              <option value="income">Income</option>
              <option value="other">Other</option>
            </select>
          </label>

          <button type="submit">Add to budget</button>
        </form>
      )}
    </>
  );
};

export default addItemBudget;
