import { MdModeEdit } from "react-icons/md";


export const Personal = () => {
    return (
        <div>
            <h2 className="flex items-center text-[30px] text-vysyamalaBlack font-bold mb-5">Personal Detailss
                <MdModeEdit className="text-2xl text-main ml-2 cursor-pointer" />
            </h2>

            <div>
                <div className="grid grid-rows-1 grid-cols-2">

                    <div>
                        <h5 className="text-[20px] text-ash font-semibold mb-2">Name  :
                            <span className="font-normal"> K. Harikrishnan</span></h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Gender :
                            <span className="font-normal"> Male</span></h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Age  :
                            <span className="font-normal"> 28 yrs</span></h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">DOB :
                            <span className="font-normal"> 03 Dec 1993</span></h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Place of Birth :
                            <span className="font-normal"> Pollachi</span></h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Time of Birth :
                            <span className="font-normal"> 10:52 AM</span></h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Weight :
                            <span className="font-normal"> NA</span></h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Height :
                            <span className="font-normal"> 170 cm</span></h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Marital Status :
                            <span className="font-normal"> UnMarried</span></h5>
                    </div>

                    <div>
                        <h5 className="text-[20px] text-ash font-semibold mb-2">Blood Group :
                            <span className="font-normal"> O +</span></h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Body Type :
                            <span className="font-normal"> -</span></h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">About Myself :
                            <span className="font-normal"> -</span></h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Complexion :
                            <span className="font-normal"> Wheatish</span></h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Hobbies  :
                            <span className="font-normal"> Normal</span></h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Physical Status :
                            <span className="font-normal"> Normal</span></h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Eye Wear :
                            <span className="font-normal"> Unknown</span></h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Profile Created By :
                            <span className="font-normal"> Admin</span></h5>

                    </div>
                </div>
            </div>
        </div>
    )
}
