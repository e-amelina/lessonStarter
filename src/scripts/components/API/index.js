//test commit
let users = [];

const url = 'https://jsonplaceholder.typicode.com/posts/';

  const getPersonFromServer = async(userId) => {
  const person = await fetch(`${url}${userId}`);

  return person.json();
};

const pushToUsers = (user)=> users.push(user);

let showUsers = 10;


for(let i = 1; i<=showUsers;i++){
  getPersonFromServer(i).then(data=> pushToUsers(data));
}

export default users;