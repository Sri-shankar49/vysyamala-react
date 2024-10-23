
import noResultFound from "../../../assets/images/noResultFound.png"

export const ProfileNotFound = () => {
    return (
        <div className="container mx-auto  px-5">
            <div className="flex flex-col gap-5 items-center">
                <img src={noResultFound} alt="noResultFound-img" />
                <h5 className="text-[20px] font-bold text-black">No Results Found</h5>
                <p className="text-base text-black text-center">Sorry, there are no results for this search, Please try<br/> another filter. Click <a className="text-black border-b-2  ">advanced Search</a></p>
            </div>
        </div>
    )
}
