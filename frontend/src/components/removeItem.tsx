import { useState } from "react";
import { X } from "react-bootstrap-icons";

interface removeItemProp {
  id: number;
  getTotal: any;
  endMonth: number;
}

const removeItem = (props: removeItemProp) => {
  const day = 25;
  const [items, setItems] = useState<Array<any>>([]);
  const [itemID, setItemID] = useState<string>("");
  const [showRemoveItem, setShowRemoveItem] = useState<boolean>(false);
  const handleSubmit = async () => {
    try {
      const response = await fetch("/removeItem", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: props.id,
          item_id: itemID,
        }),
      });

      if (response.ok) {
        console.log("Removed");
        props.getTotal();
        setShowRemoveItem(false);
      } else {
        const errorText = await response.text();
        console.error(
          "Error1:",
          response.status,
          response.statusText,
          errorText
        );
        setShowRemoveItem(false);
      }
    } catch (error) {
      console.error("Error2:", error);
      setShowRemoveItem(false);
    }
  };
  const getItems = async () => {
    try {
      const thisMonth = props.endMonth;
      const response = await fetch(
        `/getTotal?id=${props.id}&month=${thisMonth}&day=${day}`
      );
      if (response.ok) {
        const result = await response.json();

        setItems(result);
        setShowRemoveItem(true);
      } else {
        const text = await response.text();
        throw new Error(text || response.statusText);
      }
    } catch (error) {
      console.log("Fetch error: " + error);
      return false;
    }
  };
  return (
    <>
      {!showRemoveItem && (
        <span className="removeBtn" onClick={getItems}>
          Remove Item
        </span>
      )}

      {showRemoveItem && (
        <div className="removeitemBox">
          <X
            className="closeBtn"
            onClick={() => {
              setShowRemoveItem(false);
            }}
          />
          <label htmlFor="removeCategory">
            Choose an item:
            <select
              name="category"
              id="removeCategory"
              value={itemID}
              onChange={(e) => setItemID(e.target.value)}
            >
              <option value="" disabled>
                Select an item
              </option>
              {items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.cost}kr {item.item}
                </option>
              ))}
            </select>
          </label>

          <button onClick={handleSubmit} disabled={!itemID}>
            Remove item
          </button>
        </div>
      )}
    </>
  );
};

export default removeItem;
