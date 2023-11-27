import * as Yup from 'yup'
import User from '../Models/User';


class SessionController {
 async store(request,response ){
 

   const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
   })

   const userEmailOrPasswordIncorrect = () =>{
    return response
    .status(480)
    .json({error:'Make sure password or email are correct'})
   }

   if(!(await schema.isValid(request.body))){
    userEmailOrPasswordIncorrect()
   }
   const {email, password} = request.body

   const user = await User.findOne({
    where: { email},
   })
    if(!user){
        userEmailOrPasswordIncorrect()

    }
    if(!(await user.checkPassword(password))){
        userEmailOrPasswordIncorrect()
    }
    
    return response.json({
        id: user.id, 
        email, 
        name: user.name, })
  }
 
}

export default new SessionController()