// code to authenticate 
 const auth =("/admin",(req,res,next)=>{
  // logic to checking the  request is authorized or not
  const token = "adf";
  const isAuthenticated = token ==="xyz";
  if(!isAuthenticated){

     res.status(401).send()
  }
  else{
       next()
  }
})
const userAuth =("/user",(req,res,next)=>{
  // logic to checking the  request is authorized or not
  const token = "xyz";
  const isAuthenticated = token ==="xyz";
  if(!isAuthenticated){

     res.status(401).send()
  }
  else{
       next()
  }
})
module.exports={
    auth,
    userAuth
}