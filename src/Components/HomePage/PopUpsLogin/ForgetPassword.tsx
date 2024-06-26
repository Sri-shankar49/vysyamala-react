import { IoIosCloseCircle } from "react-icons/io";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

// ZOD Schema with updated regex validations
const schema = zod.object({
    email: zod.string()
        .email('Invalid email address')
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format'),
    userID: zod.string().min(1, 'User ID for is required'),
}).required();


interface ForgetPasswordProps {
    onBackToLogin: () => void;
    onClose: () => void;
    onSubmit: () => void;
}

interface FormInputs {
    email: string;
    userID: string;
}

export const ForgetPassword: React.FC<ForgetPasswordProps> = ({ onBackToLogin, onClose, onSubmit }) => {

    // React Hook form
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
        resolver: zodResolver(schema),
    });

    const handleFormSubmit: SubmitHandler<FormInputs> = (data) => {
        console.log(data);
        onSubmit();
    };
    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div>
                <h5 className="text-[24px] text-primary font-semibold">Forget Password</h5>
                <p className="text-[16px] text-primary mb-5">Please enter your registered email ID and Vysyamala User ID</p>
            </div>

            <div className="mb-5">
                <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 text-ash border-[1px] border-footer-text-gray rounded-[4px] focus-visible:outline-none"
                    placeholder="Email"
                    {...register("email", { required: true })}
                />
                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>

            <div className="mb-5">
                <input
                    type="text"
                    id="userID"
                    className="w-full px-3 py-2 text-ash border-[1px] border-footer-text-gray rounded-[4px] focus-visible:outline-none"
                    placeholder="User ID"
                    {...register("userID", { required: true })}
                />
                {errors.userID && <span className="text-red-500">{errors.userID.message}</span>}
            </div>

            <button
                type="submit"
                className="w-full py-[10px] px-[24px] bg-gradient text-white rounded-[6px] mt-2"
            >
                Submit
            </button>

            <p className="text-center text-[16px] text-ash mt-5">

                <button
                    type="button"
                    className="text-secondary hover:underline"
                    onClick={onBackToLogin}
                >
                    Back to Login
                </button>
            </p>

            <IoIosCloseCircle onClick={onClose} className="absolute top-[-15px] right-[-15px] text-[30px] text-black bg-white rounded-full flex items-center cursor-pointer hover:text-white hover:bg-black" />
        </form>
    )
}
