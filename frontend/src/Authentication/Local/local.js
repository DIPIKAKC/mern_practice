//LOCAL STORAGE

//USER
export const setUserToLocal = (user) => { //user=>object
  localStorage.setItem('user', JSON.stringify(user)); //direct object support nagareko bhayera 'stingify' garera halna parcha
}

export const getUserFromLocal = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null //object form ma return garne 'parse' gareko
}
export const removeUserFromLocal = () => {
  localStorage.removeItem("user");
}

//ADD TO CART
export const setCartsToLocal = (carts) => {
  localStorage.setItem('carts', JSON.stringify(carts)); //array direct save garna namilne bhayera teslai strung bhitra save garnu parcha
}

export const getCartsFromLocal = () => {
  const carts = localStorage.getItem('carts'); // string hatauna 'parse'
  return carts ? JSON.parse(carts) : [] //if no  card then it shows empty array
}
