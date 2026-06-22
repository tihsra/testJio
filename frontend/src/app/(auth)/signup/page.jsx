"use client"

import { toast } from "sonner"; 
import { useState } from "react";
import {API, ENDPOINTS} from "@/lib/api";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { updateLoggedIn } from "@/components/redux/slice/userSlice";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function Signin() {

  const router = useRouter();
  const dispatch = useDispatch();
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const userData = useSelector((store)=>store.user);
  const [confirmPassword,setConfirmPassword] = useState("");


  const handleSignUpRequests = async ()=>{

    if(userData.isLoggedIn){
      toast.warning("You are currently logged in, Log-Out to continue");
      return router.push('/')
    }
    
    if(!email||!name||!password||!confirmPassword){
      toast.warning("All the details are necessary")
      return 
    }
    
    if(password!=confirmPassword){
      toast.warning("Password and Confirm Password should match");
      return;
    }
    
    try{
      const response = await API.post(ENDPOINTS.signup,{
        name: name,
        email: email,
        password: password,
        confirmPassword:confirmPassword
      })


      if(response.data.status==="success"){
        dispatch(updateLoggedIn(response.data.user))
        toast.success("Succesfully signed up");
        router.push("/");
      }
      else{
        toast.error("Failed to create Account retry");
      }
    }catch(err){
      console.log(err.message);
    }
  }

  return (<div className="flex items-center justify-center min-h-[calc(100vh-75px)]">
        <Card className="h-135 p-2 w-full shadow-sm max-w-sm bg-[rgb(28,25,23)] rounded-lg border border-[rgb(39,39,42)]">
          <CardHeader className="mt-4">
            <CardTitle className="text-[1.2rem] font-medium">Sign Up</CardTitle>
            <CardDescription className="text-zinc-400 mb-2">
              Enter your imformation to create an account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>

              <div className="flex flex-col gap-4">

                <div className="grid gap-2">
                  <Label htmlFor="text">Name</Label>
                  <Input
                    id="text"
                    type="text"
                    placeholder="Your Name"
                    required
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    className="rounded-[5px] border-gray-900 bg-[rgb(12,10,9)] h-10"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className="rounded-[5px] border-gray-900 bg-[rgb(12,10,9)] h-10"
                  />
                </div>
                
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input id="password"
                    type="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required className="rounded-[5px] border-gray-900 bg-[rgb(12,10,9)] h-10"
                    />
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                  </div>
                  <Input id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e)=>setConfirmPassword(e.target.value)}
                  required className="rounded-[5px] border-gray-900 bg-[rgb(12,10,9)] h-10"
                  />
                </div>

              </div>
            </form>
          </CardContent>

          <CardFooter className="felx flex-col gap-2">

            <div className="w-full">
                <Button type="submit"
                  variant="outline"
                  onClick={handleSignUpRequests}
                  className="w-full bg-[rgb(225,29,75)] border-0 hover:bg-[rgb(255,0,60)] h-10"
                  >
                    Create an account
                </Button>
            </div>
            
            <div className="w-full flex justify-center items-center mt-1">
                <div className="flex justify-center gap-1">
                    <p>Already have an account ?</p>
                    <a
                        href="/login"
                        className="underline hover:font-bold">
                        Log in
                    </a>
                </div>

            </div>


          </CardFooter>

        </Card>
    </div>
)}

export default Signin