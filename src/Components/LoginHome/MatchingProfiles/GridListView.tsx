import { GridListCard } from "./ProfileCard/GridListCard";

export const GridListView = () => {
  return (
    <div>
      <div className="grid grid-rows-1 grid-cols-3 gap-5 my-5">
        {/* <div className="grid grid-rows-4 grid-cols-4 my-5">
                <div className="w-fit shadow-lg px-3 py-3">
                    <div className="mb-3">
                        <img src={GridProfileImg} alt="" />
                    </div>
                    <div>
                        <h4 className="text-secondary text-[20px] font-semibold">Harini <span className="text-vysyamalaBlack text-[12px] font-bold">(VM32787)</span></h4>
                        <div className="flex justify-between items-center">
                            <p className="text-primary">28 yrs</p>
                            <p className="text-primary">5ft 10in (177 cms)</p>
                        </div>
                    </div>
                </div>
            </div> */}
        <GridListCard />
        <GridListCard />
        <GridListCard />
        <GridListCard />
        <GridListCard />
        <GridListCard />
        <GridListCard />
      </div>
    </div>
  );
};
