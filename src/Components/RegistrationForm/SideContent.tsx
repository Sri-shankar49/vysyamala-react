import trust from "../../assets/icons/trust.png";
import customers from "../../assets/icons/customers.png";
import marriage from "../../assets/icons/marriage.png";
import livechat from "../../assets/icons/livechat.png";
import compatibility from "../../assets/icons/compatibility.png";
import matching from "../../assets/icons/matching.png";

const SideContent = () => {
  return (
    <div className="w-48">
      <div className="relative">
        <h1 className="text-center">Why Register</h1>
        <span className="absolute left-10 top-7 w-20 h-0.5 bg-ashSecondary rounded"></span>
      </div>

      <div className="mx-auto mt-8 space-y-8">
        <div>
          <img src={trust} alt="trust" className="mx-auto" />
          <p className="text-sm text-center mt-1">
            Most trusted Arya Vysya Matrimonial Since 2008
          </p>
        </div>
        <div>
          <img src={customers} alt="customers" className="mx-auto" />
          <p className="text-sm text-center mt-1">
            32,000+ happy
            <br /> customers
          </p>
        </div>
        <div>
          <img src={marriage} alt="marriage" className="mx-auto" />
          <p className="text-sm text-center mt-1">
            7500+ marriages<br></br> enabled
          </p>
        </div>
        <div>
          <img src={livechat} alt="livechat" className="mx-auto" />
          <p className="text-sm text-center mt-1">Live Chat</p>
        </div>
        <div>
          <img src={compatibility} alt="compatibility" className="mx-auto" />
          <p className="text-sm text-center mt-1">
            10 Porutham Compatibility Report
          </p>
        </div>
        <div>
          <img src={matching} alt="matching" className="mx-auto" />
          <p className="text-sm text-center mt-1">
            Automated Matching Algorithm
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideContent;
