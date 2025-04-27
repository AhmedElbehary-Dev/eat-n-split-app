import { useState } from "react";
import initialFriends from "./Data";
import Button from "./Components/Button";
import FriendList from "./Components/FriendList";
import FormAddFriend from "./Components/AddFriendForm";
import FormSplitBill from "./Components/SplitBillForm";

export default function App() {
  const [showAddFriendForm, setShowAddFriendForm] = useState(false);
  const [friends, setNewFriend] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const hasSelectedFriend = selectedFriend !== null;

  const toggleAddFriendForm = () => {
    setShowAddFriendForm((prevState) => !prevState);
  };

  const handleAddFriend = (friend) => {
    setNewFriend((friends) => [...friends, friend]);
  };

  function handleSelectedFriend(friend) {
    setSelectedFriend(friend);
  }

  function handleOnClose() {
    setSelectedFriend(null);
  }

  function handleSplitBill(value) {
    setNewFriend(
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    handleOnClose();
    setShowAddFriendForm(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          onSelection={handleSelectedFriend}
          onClose={handleOnClose}
          selectedFriend={selectedFriend}
        />

        {!hasSelectedFriend && (
          <>
            {showAddFriendForm && (
              <FormAddFriend onAddFriend={handleAddFriend} />
            )}
            <Button onClick={toggleAddFriendForm}>
              {showAddFriendForm ? "Close" : "Add Friend"}
            </Button>
          </>
        )}
      </div>

      {selectedFriend && (
        <FormSplitBill
          friend={selectedFriend}
          onSplitBill={handleSplitBill}
          key={selectedFriend.id}
        />
      )}
    </div>
  );
}
