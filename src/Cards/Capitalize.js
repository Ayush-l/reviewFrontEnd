
const Capitalize = (str) => {
  const list=str.split(' ')
  let s=""
  for(let i of list){
    s+=i.charAt(0).toUpperCase()+i.slice(1)+' ';
  }
  s.trim();
  return s;
}

export default Capitalize
