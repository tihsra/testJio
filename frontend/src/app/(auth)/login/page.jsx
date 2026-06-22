"use client"

import { toast } from "sonner";
import { useState } from "react";
import { useRouter} from "next/navigation";
import { ENDPOINTS, API } from '@/lib/api'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import {updateLoggedIn} from "@/components/redux/slice/userSlice";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const userData = useSelector((store)=>store.user);
  

  const handleLoginRequest = async function() {

    if(userData.isLoggedIn){
      toast.warning("You are already Logged in");
      return router.push('/')
    }
    
    if(!email||!password){
          toast.warning("Provide both email and password");
          return;
    }

    try{
      const response = await API.post(ENDPOINTS.login,{
        email:email,
        password:password
      });

      if(response.data.status==="success"){
        dispatch(updateLoggedIn(response.data.user));
        toast.success("Successfully logged in");
        return router.push('/')
      }
      else{
        toast.warning("Invalid Credentials");
        return;
      }

    }catch(err){
      toast.warning("Invalid Credentials");
      return;

    }

  }
  

  return (<div className="flex items-center justify-center min-h-[calc(100vh-75px)]">
        <Card className="h-99 w-full shadow-sm max-w-sm bg-[rgb(28,25,23)] rounded-lg border border-[rgb(39,39,42)]">
          <CardHeader>
            <CardTitle className="text-2xl font-medium">Login</CardTitle>
            <CardDescription className="text-zinc-400 my-2.5">
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    className="rounded-[5px] border-gray-900 bg-[rgb(12,10,9)] h-10"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input id="password" 
                    type="password"
                    required
                    className="rounded-[5px] border-gray-900 bg-[rgb(12,10,9)] h-10"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>
              </div>
            </form>
          </CardContent>

          <CardFooter className="felx flex-col gap-2">

            <div className="w-full">
                <Button type="submit"
                  variant="outline"
                  onClick={handleLoginRequest}
                  className="w-full border-0 bg-[rgb(225,29,75)] hover:bg-[rgb(255,0,60)] h-10">
                Login
                </Button>
            </div>
            
            <div className="w-full flex justify-between items-center mt-5">
                <a
                    href="/resetPassword"
                    className="hover:underline">
                    Forgot your password?
                </a>
                
                <div className="flex justify-center gap-1">
                    <p>Need an account?</p>
                    <a
                        href="/signup"
                        className="underline hover:font-bold">
                        Sign Up
                    </a>
                </div>

            </div>


          </CardFooter>

        </Card>
    </div>
)}

export default Login