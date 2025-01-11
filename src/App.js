import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

//reusable component
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [showAddFriendForm, setShowAddFriendForm] = useState(false);

  const toggleAddFriendForm = () => {
    setShowAddFriendForm((prevState) => !prevState);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList />
        {showAddFriendForm && <FormAddFriend />}
        <Button onClick={toggleAddFriendForm}>
          {showAddFriendForm ? "close" : "Add Friend"}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendList() {
  const friends = initialFriends;
  return (
    <ul>
      {friends.map((friend) => (
        <Friend key={friend.id} friend={friend} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <div>
      <li>
        <img src={friend.image} alt={friend.name}></img>
        <h3>{friend.name}</h3>
        {friend.balance < 0 && (
          <p className="red">
            You owe {friend.name} ${Math.abs(friend.balance)}
          </p>
        )}
        {friend.balance === 0 && <p>You and {friend.name} are even</p>}
        {friend.balance > 0 && (
          <p className="green">
            {friend.name} owe you ${friend.balance}
          </p>
        )}
        <Button>Select</Button>
      </li>
    </div>
  );
}

function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label className="label">🧑🏻‍🤝‍🧑🏾 Friend Name</label>
      <input className="input" type="text" />

      <label className="label">🖼️ Image URL</label>
      <input className="input" type="text" />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>

      <label className="label">💰 Bill value</label>
      <input className="input" type="text" />

      <label className="label">🧍Your expense</label>
      <input className="input" type="text" />

      <label className="label">🧑🏻‍🤝‍🧑🏾 X's expense</label>
      <input className="input" type="text" disabled />

      <label className="label">🤑 Who is paying the bill?</label>
      <select className="select">
        <option value="user">You</option>
        <option value="X">X</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
