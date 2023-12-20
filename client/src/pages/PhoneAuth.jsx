
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../assets/redux/userSlice/userSlice";

const PhoneAuth = () => {
  const [otp, setOtp] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const [countryCode, setCountryCode] = useState("+91");
  const navigate =useNavigate()
  const dispatch=useDispatch()


  function onCaptchaVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
        }
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchaVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = countryCode + phoneNumber;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  const  onOTPVerify=async()=> {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res)
        localStorage.setItem('access_token', res.user.accessToken);
        try
        {
     
            const  result= await fetch('/api/auth/phone', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                }, 
                body: JSON.stringify({
                    name:'User',
                    phone:res?.user?.phoneNumber, 
                    photo: import.meta.env.VITE_PROFILE_IMAGE      
            })
        })
        const data=await result.json()
        console.log("data for new user mode----->", data)
        setUser(res.user); 
        setLoading(false);
        toast.success(`Login in successfully`); 
        dispatch(signInSuccess(data))
        navigate('/')
        }
        catch(err){
            console.log("Couldn't sign in", err)
        }
        
    
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <section>
      <div className="">
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
          <h2 className="text-center  font-medium text-2xl">👍Login Success</h2>
        ) : (
          <div className="w-full flex flex-col gap-2 rounded-lg ">
            {showOTP ? (
              <>
                <label
                  htmlFor="otp"
                  className="font-bold text-xl  text-center text-gray-600"
                >
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container p-1  flex items-center justify-center"
                  inputClassName="bg-white border border-slate-400 rounded"
                ></OtpInput>
                <button
                  onClick={onOTPVerify}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <div >
                <div className=" w-full flex  gap-1 h-12 mb-4">
                  <input
                    type="text"
                    id="countryCode"
                    name="countryCode"
                    value={countryCode}
                    onChange={(e)=>setCountryCode(e.target.value)}
                    className="border w-[20%] px-3 bg-slate-200  rounded-md focus:outline-none "
                  />
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={(e)=>setPhoneNumber(e.target.value)}
                    className="border w-full px-3 py-2 rounded-md focus:outline-none "
                    placeholder="Enter 10 digit phone number"
                  />
                </div>{" "}
                <button
                  onClick={onSignup}
                  className="w-full text-white bg-cyan-900 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                >
                 
                  <span className="text-center flex items-center justify-center">
                  {loading ? (
                    <CgSpinner size={20} className=" animate-spin" />
                  ):
                    'Continue'
                    }</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default PhoneAuth;
