const postLoginData= async(req,res)=>{
    console.log(req.body)
    try{
        const username= req.body.Username
        const password=req.body.Password
        if((username=='admin')&&(password=="1234")){
            return res.status(200).json({message:"login successfull"})
        }
        return res.status(401).json({message:"invalid credentials"})
    }catch (error) {
        console.error('wrong username and password', error.message);
        res.status(500).send('Internal Server Error');
      }

}

module.exports={
    postLoginData
}