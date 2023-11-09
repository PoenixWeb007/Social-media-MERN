import User from "../models/user.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).lean();
    delete user.password;
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFriendsUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({
        _id,
        firstName,
        lastName,
        picturePath,
        location,
        viewedProfile,
        impressions,
      }) => {
        return {
          _id,
          firstName,
          lastName,
          picturePath,
          location,
          viewedProfile,
          impressions,
        };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addRemoveFriend = async function (req, res) {
  const { id, friendId } = req.params;
  const user = await User.findById(id);
  const friend = await User.findById(friendId);
  let message;
  if (user.friends.includes(friendId)) {
    user.friends = user.friends.filter((id) => id !== friendId);
    friend.friends = friend.friends.filter((ID) => ID !== id);
    message = `${friend.firstName} ${friend.lastName} est supprimé depuis la liste de vos amis`;
  } else {
    user.friends.push(friendId);
    friend.friends.push(id);
    message = `${friend.firstName} ${friend.lastName} est ajouté á la liste de vos amis`;
  }
  await friend.save();
  await user.save();
  res.status(200).json({ message: message });
};
