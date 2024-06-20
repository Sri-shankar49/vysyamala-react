import VysyamalaLogo from "../../assets/icons/VysyamalaLogo.png";

export const VysyamalaAbout = () => {
  return (
    <div>
      <section>
        <div className="container mx-auto py-5 space-y-5">
          <div>
            <a href="">
              <img src={VysyamalaLogo} alt="" />
            </a>
          </div>

          <hr className="text-gray" />

          <div>
            <p className="text-ash">
              Home for the Arya Vysya community: Uniting souls time and again!.
              Started in 2008, Vysyamala is the first matrimonial portal
              exclusive for the Arya Vysya community. Having a women-led
              organization, we believe in empowerment and quality progress in
              the matrimonial space. Our built-in proprietary algorithm
              perfectly analyzes all the parameters and aims to provide the best
              match. One of our specialities is that we provide free service for
              people over 36 years, underprivileged, or divorced/separated. Are
              we any good? Yes, our 30,000+ happy customers are the proof that
              we keep divinity above everything and that makes our job a pure
              one.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
