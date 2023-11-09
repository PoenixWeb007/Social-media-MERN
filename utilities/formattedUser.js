export const formatUser = function (user) {
  const {
    _id,
    firstName,
    lastName,
    picturePath,
    occupation,
    location,
    viewedProfile,
    impressions,
  } = user;

  const formattedUser = {
    _id,
    firstName,
    lastName,
    picturePath,
    occupation,
    location,
    viewedProfile,
    impressions,
  };
  return formattedUser;
};
