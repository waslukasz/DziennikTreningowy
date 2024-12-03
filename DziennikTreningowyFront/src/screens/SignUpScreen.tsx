import AuthContent from "../components/auth/authContent";
import { CreateUser } from "../services/auth";

export default function SignUpScreen(){
    const SingUpHandler= async(emial:string,password:string,dateOfBirth?:Date)=>{
        if(dateOfBirth){
            const response=await CreateUser(emial,password,dateOfBirth)
        }else{

        }
    }
    return(<AuthContent isLogin={false} onAuthenticate={SingUpHandler}></AuthContent>);
}