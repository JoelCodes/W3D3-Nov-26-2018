const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

function rando(){
  let output = "";
  for(let i = 0; i < 6; i++){
    output += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return output;
}
module.exports = {
  rando
};