
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { auth } from "../firebase";
import { FaRegCheckCircle } from "react-icons/fa";

const PhoneAuth = ({phone, setPhone, countryCode, setCountryCode, user, setUser}) => {
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
 




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

    const formatPh = countryCode + phone;

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
        console.log("res after verify",res)
        setUser(res.user)
        setPhone(res.user.phone)
        toast.success("Verified")
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error("Not Verified")
      });
  }

  return (
    <section>
      <div className="">
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
           <div className="flex">
           <div className=" w-5/6 flex gap-1   h-11 ">
             <input
               type="text"
               id="countryCode"
               name="countryCode"
               value={countryCode}
               onChange={(e)=>setCountryCode(e.target.value)}
               className="border w-2/6 text-sm px-3 bg-slate-200  rounded-md focus:outline-none "
               placeholder="Code"
             />
             <input
               type="text"
               id="phone"
               name="phone"
               value={user.phoneNumber.substr(3)}
               onChange={(e)=>setPhone(e.target.value)}
               className="border w-full px-3 text-green-600 py-2 rounded-md focus:outline-none "
               placeholder="Enter 10 digit phone number"
             />
           </div>{" "}
           <button
             onClick={onSignup}
             className="w-1/6 h-11 ml-1 text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
           >
            
             {!user ?
             (<span className="text-center flex items-center justify-center">
             {loading ? (
               <CgSpinner size={20} className=" animate-spin" />
             ):
               'Verify'
               }</span>):
               (<span className="text-center text-white-600 flex items-center justify-center">
                 <FaRegCheckCircle size={20}/>
              </span>)
            }
           </button>
         </div>
        ) : (
          <div className="w-full flex flex-col gap-2 rounded-lg ">
            { showOTP ? (
              <div className="flex items-center justify-center">
                
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
                  className="bg-emerald-600 w-full flex gap-1 h-11 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span className="text-sm">Verify OTP</span>
                </button>
              </div>
            ) : (
              <div className="flex">
                <div className=" w-5/6 flex gap-1   h-11 ">
                  <input
                    type="text"
                    id="countryCode"
                    name="countryCode"
                    value={countryCode}
                    onChange={(e)=>setCountryCode(e.target.value)}
                    className="border w-2/6 text-sm px-3 bg-slate-200  rounded-md focus:outline-none "
                  />
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={(e)=>setPhone(e.target.value)}
                    className="border w-full px-3 py-2 rounded-md focus:outline-none "
                    maxLength='10'
                    placeholder="Enter 10 digit phone number"
                  />
                </div>{" "}
                <button
                  onClick={onSignup}
                  className="w-1/6 h-11 ml-1 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                >
                 
                  {!user ?
                  (<span className="text-center flex items-center justify-center">
                  {loading ? (
                    <CgSpinner size={20} className=" animate-spin" />
                  ):
                    'Verify'
                    }</span>):
                    (<span className="text-center text-white-600 flex items-center justify-center">
                      <FaRegCheckCircle size={20}/>
                   </span>)
                 }
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
