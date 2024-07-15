import React from 'react'

export const AlertSettings = () => {
    return (
        <div>
            <div>
                <h2 className="text-[30px] text-vysyamalaBlack font-bold mb-5">Alert Settings</h2>

                <div>
                    <div className="">

                        <div>
                            <div className="mb-5">
                                <h4 className="text-[20px] text-primary font-semibold mb-3">Email Alert</h4>

                                <div className="w-6/12 flex justify-between items-start">
                                    <div>
                                        <div className="mb-2">
                                            <input type="checkbox" name="mpa" id="mpa" className="mr-2" />
                                            <label htmlFor="mpa" className="text-[20px] text-ash">Matching Profile Alert</label>
                                        </div>

                                        <div className="mb-2">
                                            <input type="checkbox" name="rup" id="rup" className="mr-2" />
                                            <label htmlFor="rup" className="text-[20px] text-ash">Recently Updated Profiles</label>
                                        </div>

                                        <div className="mb-2">
                                            <input type="checkbox" name="oe" id="oe" className="mr-2" />
                                            <label htmlFor="oe" className="text-[20px] text-ash">Offers and Events</label>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="mb-2">
                                            <input type="checkbox" name="pva" id="pva" className="mr-2" />
                                            <label htmlFor="pva" className="text-[20px] text-ash">Profile Visitor Alert</label>
                                        </div>

                                        <div className="mb-2">
                                            <input type="checkbox" name="eia" id="eia" className="mr-2" />
                                            <label htmlFor="eia" className="text-[20px] text-ash">Express Interest Alert</label>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* SMS Alert */}
                            <div>
                                <h4 className="text-[20px] text-primary font-semibold mb-2">SMS Alert</h4>

                                <div className="w-6/12 flex justify-between items-center mb-5">
                                    <div>
                                        <input type="checkbox" name="smpa" id="smpa" className="mr-2" />
                                        <label htmlFor="smpa" className="text-[20px] text-ash">Matching Profile Alert</label>
                                    </div>

                                    <div>
                                        <input type="checkbox" name="soe" id="soe" className="mr-2" />
                                        <label htmlFor="soe" className="text-[20px] text-ash">Offers and Events</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end items-center space-x-5">
                            <button className="text-main flex items-center rounded-lg font-semibold px-5 py-2.5 cursor-pointer">
                                Cancel
                            </button>
                            <button className="bg-white text-main flex items-center rounded-lg font-semibold border-2 px-5 py-2.5 cursor-pointer">
                                Update Changes </button>

                        </div>





                    </div>
                </div>
            </div>
        </div>
    )
}
