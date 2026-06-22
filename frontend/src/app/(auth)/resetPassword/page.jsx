"use client"

import { toast } from "sonner";
import { useState } from "react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import {API,ENDPOINTS} from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function ResetPassword() {
  
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [otp,setOtp] = useState("");
  const [step,setStep] = useState(1);

  const handleSendOTP = async ()=>{

    try{
      if(!email){
        toast.warning("Please provide Email to continue");
        return;
      } 

      const response = await API.patch(ENDPOINTS.forgotPassword,{
        email:email
      })

      if(response.data.status==="success"){
        setStep(2);
        toast.success("OTP sent to email id");

      }
    }catch(err){
      toast.error("An error occured, Please retury");
      return;
    }
  }

  const handleResetPasswordButton = async ()=>{

    try{
      if(!otp||!email||!password||!confirmPassword){
        toast.error("Please provide all the details to continue")
        return;
      }
      if(password!==confirmPassword){
        toast.warning("Password should match with confirm password")
        return;
      }
      const respose = await API.patch(ENDPOINTS.resetPassword,{
        otp: otp,
        email: email,
        password: password,
        confirmPassword:confirmPassword
      })
      if(respose.data.status==="success"){
        toast.success("Password Updated Successfully");
        return;
      }
    }catch(error){
      toast.error("An error occured, Please retury");
      return;
    }
  }

  return (<div className="flex items-center justify-center min-h-[calc(100vh-75px)]">
        <Card className={`${(step===1)?"h-65":"h-135"} w-full shadow-sm max-w-sm bg-[rgb(28,25,23)] rounded-lg border border-[rgb(39,39,42)]`}>
          <CardHeader>
            <CardTitle className="text-[20px]">Forgot Password / Reset Password</CardTitle>
            <CardDescription className="text-zinc-400 my-1">
              {(step==1)?"Enter your email below to get OTP.":"Enter the OTP to reset your Password"}
            </CardDescription>
          </CardHeader>
          <CardContent>
                
                <div className="flex flex-col gap-5">

                  {(step===2)?(<>
                  <Label htmlFor="emailInput">Email</Label>
                  <Input
                    id="emailInput"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className="rounded-[5px] border-gray-900 bg-[rgb(12,10,9)] h-10"
                  />

                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    className="rounded-[5px] border-gray-900 bg-[rgb(12,10,9)] h-10"
                  />

                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                    className="rounded-[5px] border-gray-900 bg-[rgb(12,10,9)] h-10"
                  />
                  </>
                  ):<></>}

                  <Label htmlFor="emailOTPcombinedInput">{(step==1)?"Email":"OTP"}</Label>
                  <Input
                    id="emailOTPcombinedInput"
                    type={(step===1)?"email":"text"}
                    placeholder={(step===1)?"m@example.com":"Enter 6-digit OTP"}
                    required
                    value={(step===1)?email:otp}
                    onChange={(step===1)?(e)=>setEmail(e.target.value):(e)=>setOtp(e.target.value)}
                    className="rounded-[5px] border-gray-900 bg-[rgb(12,10,9)] h-10"
                  />
              </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-2">

            <div className="w-full">
                <Button type="button" 
                  variant="outline" 
                  onClick={(step===1)?handleSendOTP:handleResetPasswordButton}
                  className="w-full bg-[rgb(225,29,75)] border-0 hover:bg-[rgb(255,0,60)] h-10"
                >
                {(step==1)?"Send OTP":"Verify"}
                </Button>
            </div>
          </CardFooter>

        </Card>
    </div>
)}

export default ResetPassword