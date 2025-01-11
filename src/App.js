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
  const [friends, setNewFriend] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const toggleAddFriendForm = () => {
    setShowAddFriendForm((prevState) => !prevState);
  };

  const handleAddFriend = (friend) => {
    setNewFriend((friends) => [...friends, friend]);
  };

  const handleSelectedFriend = (friendId) => {
    setSelectedFriend(friends.find((friend) => friend.id === friendId));
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList friends={friends} selectedFriend={handleSelectedFriend} />
        {showAddFriendForm && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={toggleAddFriendForm}>
          {showAddFriendForm ? "close" : "Add Friend"}
        </Button>
      </div>
      <FormSplitBill friend={selectedFriend} />
    </div>
  );
}

function FriendList({ friends, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          onSelectFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelectFriend }) {
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
        <Button onClick={() => onSelectFriend(friend.id)}>Select</Button>
      </li>
    </div>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleAddFriendForm(e) {
    e.preventDefault();
    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriendObj = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    onAddFriend(newFriendObj);
    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleAddFriendForm}>
      <label className="label">🧑🏻‍🤝‍🧑🏾 Friend Name</label>
      <input
        className="input"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label className="label">🖼️ Image URL</label>
      <input
        className="input"
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ friend }) {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with {friend ? friend.name : "X"}</h2>

      <label className="label">💰 Bill value</label>
      <input className="input" type="text" />

      <label className="label">🧍Your expense</label>
      <input className="input" type="text" />

      <label className="label">🧑🏻‍🤝‍🧑🏾 {friend ? friend.name : "X"}'s expense</label>
      <input className="input" type="text" disabled />

      <label className="label">🤑 Who is paying the bill?</label>
      <select className="select">
        <option value="user">You</option>
        <option value={friend ? friend.name : "X"}>
          {friend ? friend.name : "X"}
        </option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
