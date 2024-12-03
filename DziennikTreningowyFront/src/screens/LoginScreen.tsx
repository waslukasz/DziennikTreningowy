import AuthContent from "../components/auth/authContent";
import { Login } from "../services/auth";

export default function LoginScreen(){
    const loginHandler=async(email:string,password:string)=>{
       const response=await Login(email,password);
       console.log(response.data.accessToken)
    }
    return(<AuthContent isLogin onAuthenticate={loginHandler}></AuthContent>);
}