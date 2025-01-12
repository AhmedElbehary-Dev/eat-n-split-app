import Friend from "./Friend";

export default function FriendList({
  friends,
  onSelection,
  selectedFriend,
  onClose,
}) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          onSelection={onSelection}
          onClose={onClose}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}
