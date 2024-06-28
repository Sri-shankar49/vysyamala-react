import GridProfileImg from "../../../../assets/images/GridProfileImg.png"

export const GridCard = () => {
    return (
            <div className="w-11/12 shadow-md px-3 py-3">
                <div className="mb-3">
                    <img src={GridProfileImg} alt="" className="w-full" />
                </div>
                <div>
                    <h4 className="text-secondary text-[20px] font-semibold">Harini <span className="text-vysyamalaBlack text-[12px] font-bold">(VM32787)</span></h4>
                    <div className="flex justify-between items-center">
                        <p className="text-primary">28 yrs</p>
                        <p className="text-primary">5ft 10in (177 cms)</p>
                    </div>
                </div>
            </div>
    )
}
