const users = [
  {
    email: "admin@emercado.com",
    password: "admin123",
  },
  {
    email: "user@emercado.com",
    password: "user123",
  },
];

const login = (email, password) => {
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    return false;
  }

  return true;
};

module.exports = {
  login,
};
