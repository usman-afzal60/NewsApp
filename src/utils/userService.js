export const loadUsers = () => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  };
  
  export const saveUser = (user) => {
    const users = loadUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  };
  
  export const authenticateUser = (username, password) => {
    console.log("username : ",username)
    console.log("password : ",password)
    const users = loadUsers();
    console.log("users in service: ",users)
    return users.find(user => user.userName == username && user.password == password);
  };