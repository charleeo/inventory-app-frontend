import JWTDecode  from 'jwt-decode';

const tokenKey = 'token'
const userKey = 'user'
function logout() {
localStorage.removeItem(tokenKey);
localStorage.removeItem(userKey);
}
function getCurrentUser(){
    try {
        const jwt = getToken()
        const decodedToken = JWTDecode(jwt)
        const date = new Date();
        const now = date.getTime()
        const timeStamp=(Math.ceil(now/1000));
        if(timeStamp > decodedToken.exp)return null;
        else  return decodedToken
    }catch(error) {
    return null
    }
 }
 const setToken= (token)=>{
  localStorage.setItem(tokenKey,token);
 }
 const setUser= (user)=>{
  localStorage.setItem(userKey,user);
 }
 const getToken=()=>{
   return localStorage.getItem(tokenKey)
 }
 const getUser=()=>{
   return localStorage.getItem(userKey)
 }
 const auth = {getCurrentUser,logout,setToken,getToken,setUser,getUser}
 export default auth

