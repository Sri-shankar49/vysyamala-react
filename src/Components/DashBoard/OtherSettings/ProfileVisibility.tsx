export const ProfileVisibility = () => {
  return (
    <div>
      <div>
        <h2 className="text-[30px] text-vysyamalaBlack font-bold mb-5">Profile Visibility</h2>

        <div>
          <div className="">

            <div className="flex justify-between items-center mb-5">
              {/* Age */}
              <div className="flex justify-center items-center space-x-5">
                <div>
                  <label htmlFor="fromAge" className="text-[20px] text-primary font-semibold">Age</label> <br />
                  <input type="text"
                    name="fromAge"
                    id="fromAge"
                    placeholder="From"
                    className="outline-none w-fit px-4 py-1.5 border border-ashSecondary rounded" />
                </div>

                <div>
                  <label htmlFor="toAge" className="text-[20px] text-primary font-semibold invisible">Age</label> <br />
                  <input type="text"
                    name="toAge"
                    id="toAge"
                    placeholder="To"
                    className="outline-none w-fit px-4 py-1.5 border border-ashSecondary rounded" />
                </div>
              </div>

              {/* Height */}
              <div className="flex justify-center items-center space-x-5">
                <div>
                  <label htmlFor="fromHeight" className="text-[20px] text-primary font-semibold ">Height</label> <br />
                  <input type="text"
                    name="fromHeight"
                    id="fromHeight"
                    placeholder="From"
                    className="outline-none w-fit px-4 py-1.5 border border-ashSecondary rounded" />
                </div>

                <div>
                  <label htmlFor="toHeight" className="text-[20px] text-primary font-semibold invisible">Height</label> <br />
                  <input type="text"
                    name="toHeight"
                    id="toHeight"
                    placeholder="To"
                    className="outline-none w-fit px-4 py-1.5 border border-ashSecondary rounded" />
                </div>
              </div>

            </div>

            <div>
              {/* Education */}
              <div className="mb-5">
                <h4 className="text-[20px] text-primary font-semibold mb-2">Education</h4>

                <div className="w-8/12 flex justify-between items-start">
                  <div>
                    <div className="mb-2">
                      <input type="checkbox" name="bachelors" id="bachelors" className="mr-2" />
                      <label htmlFor="bachelors" className="text-[20px] text-ash">Bachelors - Arts/Science/Commerce/B.Phil</label>
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

              {/* Profession */}
              <div className="mb-5">
                <h4 className="text-[20px] text-primary font-semibold mb-2">Profession</h4>

                <div className="w-8/12 flex justify-between items-start">
                  <div>
                    <div className="mb-2">
                      <input type="checkbox" name="pmpa" id="pmpa" className="mr-2" />
                      <label htmlFor="pmpa" className="text-[20px] text-ash">Matching Profile Alert</label>
                    </div>

                    <div className="mb-2">
                      <input type="checkbox" name="prup" id="prup" className="mr-2" />
                      <label htmlFor="prup" className="text-[20px] text-ash">Recently Updated Profiles</label>
                    </div>

                    <div className="mb-2">
                      <input type="checkbox" name="poe" id="poe" className="mr-2" />
                      <label htmlFor="poe" className="text-[20px] text-ash">Offers and Events</label>
                    </div>
                  </div>

                  <div>
                    <div className="mb-2">
                      <input type="checkbox" name="ppva" id="ppva" className="mr-2" />
                      <label htmlFor="ppva" className="text-[20px] text-ash">Profile Visitor Alert</label>
                    </div>

                    <div className="mb-2">
                      <input type="checkbox" name="peia" id="peia" className="mr-2" />
                      <label htmlFor="peia" className="text-[20px] text-ash">Express Interest Alert</label>
                    </div>
                  </div>
                </div>

              </div>

              {/* Annual Income */}
              <div className="mb-5">
                <h4 className="text-[20px] text-primary font-semibold mb-2">Annual Income</h4>

                <div className="w-8/12 flex justify-between items-start">
                  <div>
                    <div className="mb-2">
                      <input type="checkbox" name="ani" id="ani" className="mr-2" />
                      <label htmlFor="ani" className="text-[20px] text-ash">No Income</label>
                    </div>

                    <div className="mb-2">
                      <input type="checkbox" name="a50k" id="a50k" className="mr-2" />
                      <label htmlFor="a50k" className="text-[20px] text-ash">Rs.50,000 - 1,00,000</label>
                    </div>

                    <div className="mb-2">
                      <input type="checkbox" name="a3l" id="a3l" className="mr-2" />
                      <label htmlFor="a3l" className="text-[20px] text-ash">Rs.3,00,000 - 4,00,000</label>
                    </div>
                  </div>

                  <div>
                    <div className="mb-2">
                      <input type="checkbox" name="au50k" id="au50k" className="mr-2" />
                      <label htmlFor="au50k" className="text-[20px] text-ash">Under Rs.50,000</label>
                    </div>

                    <div className="mb-2">
                      <input type="checkbox" name="a1l" id="a1l" className="mr-2" />
                      <label htmlFor="a1l" className="text-[20px] text-ash">Rs.1,00,001 - 2,00,000</label>
                    </div>
                  </div>
                </div>

              </div>

              {/* Rahu/Ketu Dhosam */}
              <div>
                <h4 className="text-[20px] text-primary font-semibold mb-2">Rahu/Ketu Dhosam</h4>

                <div className="w-1/6 flex justify-between items-center mb-5">
                  <div>
                    <input type="radio" name="radio" id="ryes" className="mr-2" />
                    <label htmlFor="ryes" className="text-[20px] text-ash">Yes</label>
                  </div>

                  <div>
                    <input type="radio" name="radio" id="rno" className="mr-2" />
                    <label htmlFor="rno" className="text-[20px] text-ash">No</label>
                  </div>
                </div>
              </div>

              {/* Chevvai Dhosam */}
              <div>
                <h4 className="text-[20px] text-primary font-semibold mb-2">Chevvai Dhosam</h4>

                <div className="w-1/6 flex justify-between items-center mb-5">
                  <div>
                    <input type="radio" name="cradio" id="cyes" className="mr-2" />
                    <label htmlFor="cyes" className="text-[20px] text-ash">Yes</label>
                  </div>

                  <div>
                    <input type="radio" name="cradio" id="cno" className="mr-2" />
                    <label htmlFor="cno" className="text-[20px] text-ash">No</label>
                  </div>
                </div>
              </div>

              {/* Foreign Interest */}
              <div>
                <h4 className="text-[20px] text-primary font-semibold mb-2">Foreign Interest</h4>

                <div className="w-2/6 flex justify-between items-center mb-5">
                  <div>
                    <input type="radio" name="fradio" id="fyes" className="mr-2" />
                    <label htmlFor="fyes" className="text-[20px] text-ash">Yes</label>
                  </div>

                  <div>
                    <input type="radio" name="fradio" id="fno" className="mr-2" />
                    <label htmlFor="fno" className="text-[20px] text-ash">No</label>
                  </div>

                  <div>
                    <input type="radio" name="fradio" id="fboth" className="mr-2" />
                    <label htmlFor="fboth" className="text-[20px] text-ash">Both</label>
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
