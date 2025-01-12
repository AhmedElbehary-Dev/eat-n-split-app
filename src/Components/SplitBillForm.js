import { useState } from "react";
import Button from "./Button";

export default function FormSplitBill({ friend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paiedByUser, setPayedByUser] = useState("");
  const paiedByFriend = bill - paiedByUser;
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !paiedByUser) return;

    onSplitBill(whoIsPaying === "user" ? paiedByFriend : -paiedByUser);
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {friend ? friend.name : "X"}</h2>

      <label className="label">💰 Bill value</label>
      <input
        className="input"
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label className="label">🧍Your expense</label>
      <input
        className="input"
        type="text"
        value={paiedByUser}
        onChange={(e) =>
          setPayedByUser(
            Number(e.target.value) > bill ? "" : Number(e.target.value)
          )
        }
      />

      <label className="label">🧑🏻‍🤝‍🧑🏾 {friend ? friend.name : "X"}'s expense</label>
      <input className="input" type="text" value={paiedByFriend} disabled />

      <label className="label">🤑 Who is paying the bill?</label>
      <select
        className="select"
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value={friend ? friend.name : "X"}>
          {friend ? friend.name : "X"}
        </option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
