// import React from "react";
// import { IoIosCloseCircle } from "react-icons/io";
// import { FaArrowRightLong } from "react-icons/fa6";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as zod from "zod";

// // ZOD Schema with updated regex validations
// const schema = zod.object({
//     mobile: zod.string().min(10, 'Mobile number must be exactly 10 characters').max(10, 'Mobile number must be exactly 10 characters'),
// }).required();

// interface LoginPopUpProps {
//     onNext: () => void;
//     onClose: () => void;
//     onProfileIdLogin:()=>void;
// }


// interface FormInputs {
//     mobile: string;
// }

// export const PhoneLoginPopup: React.FC<LoginPopUpProps> = ({ onNext, onClose, onProfileIdLogin}) => {

//     // React Hook form
//     const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
//         resolver: zodResolver(schema),
//     });

//     const onSubmit: SubmitHandler<FormInputs> = (data) => {
//         console.log(data);
//         onNext();
//     };
//     return (
//         <form onSubmit={handleSubmit(onSubmit)}>
//             <div>
//                 <p className="text-[16px] text-primary">Welcome Back</p>
//                 <h5 className="text-[24px] text-primary font-semibold mb-5">Login to your account</h5>
//             </div>

//             <div className="mb-5">
//                 <input
//                     type="text"
//                     id="profileID"
//                     className="w-full px-3 py-2 text-ash border-[1px] border-footer-text-gray rounded-[4px] focus-visible:outline-none"
//                     placeholder="Enter your Mobile Number"
//                     {...register("mobile", { required: true })}
//                 />
//                 {errors.mobile && <span className="text-red-500">{errors.mobile.message}</span>}
//             </div>


//             {/* <button
//                 type="submit"
//                 className="w-full py-[10px] px-[24px] bg-gradient text-white rounded-[6px] mt-2"
//             >
//                 Login
//             </button> */}

//             <button type="submit" className="w-full bg-gradient flex justify-center items-center py-[10px] px-[24px]  rounded-[6px] space-x-2 cursor-pointer">
//                 <div className="text-[16px] text-white font-semibold">Send OTP</div>
//                 <FaArrowRightLong className="text-white text-[22px]" />
//             </button>


//             <p className="text-ash font-semibold text-center my-5">or</p>

//             <button onClick={onProfileIdLogin} className="w-full py-[10px] px-[24px] bg-white text-main font-semibold border-2 rounded-[6px] mt-2" >
//                 Login with Profile ID
//             </button>

//             <p className="text-center text-[16px] text-ash mt-5">
//                 Dont have an account?{' '}
//                 <button
//                     type="button"
//                     onClick={onClose}
//                     className="text-secondary hover:underline"
//                 >
//                     Register Now
//                 </button>
//             </p>

//             <IoIosCloseCircle onClick={onClose} className="absolute top-[-15px] right-[-15px] text-[30px] text-black bg-white rounded-full flex items-center cursor-pointer hover:text-white hover:bg-black" />
//         </form>
//     )
// }


import React from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import axios from "axios";
import config from '../../../API'; // Import the configuration file


// ZOD Schema with updated regex validations
const schema = zod.object({
    mobile: zod.string().min(10, 'Mobile number must be exactly 10 characters').max(10, 'Mobile number must be exactly 10 characters'),
}).required();

interface LoginPopUpProps {
    onNext: () => void;
    onClose: () => void;
    onProfileIdLogin:()=>void;
}


interface FormInputs {
    mobile: string;
}




interface SendOtpResponse {
    status: number;
    response_data: {
        message: string;
    };
    message: string;
}
// BackEnd Response
// {
//     "status": 1,
//     "response_data": {
//         "message": "OTP sent successfully."
//     },
//     "message": "OTP sent successfully."
// }
export const PhoneLoginPopup: React.FC<LoginPopUpProps> = ({ onNext, onClose, onProfileIdLogin}) => {

    // React Hook form
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
        resolver: zodResolver(schema),
    });

    // const onSubmit: SubmitHandler<FormInputs> = (data) => {
    //     console.log(data);
    //     onNext();
    // };
    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
            const response = await axios.post<SendOtpResponse>(`${config.apiUrl}/auth/Login_with_mobileno/`, {
                Mobile_no: data.mobile,
            });

            if (response.data.status === 1) {
                console.log(response.data.response_data.message);
                onNext();
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <p className="text-[16px] text-primary">Welcome Back</p>
                <h5 className="text-[24px] text-primary font-semibold mb-5">Login to your account</h5>
            </div>

            <div className="mb-5">
                <input
                    type="text"
                    id="profileID"
                    className="w-full px-3 py-2 text-ash border-[1px] border-footer-text-gray rounded-[4px] focus-visible:outline-none"
                    placeholder="Enter your Mobile Number"
                    {...register("mobile", { required: true })}
                />
                {errors.mobile && <span className="text-red-500">{errors.mobile.message}</span>}
            </div>


            {/* <button
                type="submit"
                className="w-full py-[10px] px-[24px] bg-gradient text-white rounded-[6px] mt-2"
            >
                Login
            </button> */}

            <button type="submit" className="w-full bg-gradient flex justify-center items-center py-[10px] px-[24px]  rounded-[6px] space-x-2 cursor-pointer">
                <div className="text-[16px] text-white font-semibold">Send OTP</div>
                <FaArrowRightLong className="text-white text-[22px]" />
            </button>


            <p className="text-ash font-semibold text-center my-5">or</p>

            <button onClick={onProfileIdLogin} className="w-full py-[10px] px-[24px] bg-white text-main font-semibold border-2 rounded-[6px] mt-2" >
                Login with Profile ID
            </button>

            <p className="text-center text-[16px] text-ash mt-5">
                Dont have an account?{' '}
                <button
                    type="button"
                    onClick={onClose}
                    className="text-secondary hover:underline"
                >
                    Register Now
                </button>
            </p>

            <IoIosCloseCircle onClick={onClose} className="absolute top-[-15px] right-[-15px] text-[30px] text-black bg-white rounded-full flex items-center cursor-pointer hover:text-white hover:bg-black" />
        </form>
    )
}
