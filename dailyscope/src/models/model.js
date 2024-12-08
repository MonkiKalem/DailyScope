// model.js
const users = [
    // Pre-existing users (optional)
    {
      username: 'MonkiKalem',
      password: 'pass123',
    },
  ];
  
  // Function to get all users (or check if user exists)
  const getUsers = () => {
    return users;
  };
  
  // Function to add a new user
  const addUser = (username, password) => {
    users.push({ username, password });
  };
  
  // Function to check if a user exists
  const findUserByUsername = (username) => {
    return users.find(user => user.username === username);
  };
  
  // Function to update user (optional)
  const updateUser = (username, newPassword) => {
    const user = findUserByUsername(username);
    if (user) {
      user.password = newPassword;
    }
  };
  
  export { getUsers, addUser, findUserByUsername, updateUser };
  