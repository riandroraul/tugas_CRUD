// const str = "abc's TESt((*&(&%^&@##@@@#@!~$@#++)+_)><>>.,.;';][]%^%$$^%*&(++___)()(&*(&(#s";
// console.log(str.replace(/[^a-zA-Z ]/g, ""));
const User = require('./model/users')
const keyValue = (props, value) => {
  return {props: value}
}

// const user = async function(){ return await User.find({email: 'role3@gmail.com'})}
const user = User.findOne({email: 'role3@gmail.com'}).then( (err, result) => console.log(result))
console.log(user);