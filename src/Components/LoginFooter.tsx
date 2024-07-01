import React from "react";

export const LoginFooter = () => {
  return (
    <div>
      <footer className="bg-vysyamalaBlackSecondary text-white text-card-foreground py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="">
            <div className="flex items-center mb-4">
              <img
                src="https://placehold.co/40x40?text=❤️"
                alt="heart logo"
                className="mr-2"
              />
              <h2 className="text-2xl font-bold">Vysyamala</h2>
            </div>
            <p className="text-footer-text-gray">
              Vysyamala.com is an online matrimonial service exclusively for
              Arya Vysya Community. Vysyamala aims to serve as a one-stop
              platform for prospective Arya Vysya Brides and Grooms to meet and
              communicate with each other. The site is built with careful
              attention to the needs and sensibilities of people of Arya Vysyas.
            </p>
          </div>
          <div>
            <h3 className="text-vysyamalaSandal font-bold mb-2">
              Arya Vysya Community
            </h3>
            <ul className="text-footer-text-gray space-y-1">
              <li>
                <a href="" className="hover:underline">
                  Arya Vysya Events
                </a>
              </li>
              <li>
                <a href="" className="hover:underline">
                  Arya Vysya Grooms
                </a>
              </li>
              <li>
                <a href="" className="hover:underline">
                  Arya Vysya Brides
                </a>
              </li>
              <li>
                <a href="" className="hover:underline">
                  History of Arya Vysya
                </a>
              </li>
              <li>
                <a href="" className="hover:underline">
                  Arya Vysya Gothras
                </a>
              </li>
              <li>
                <a href="" className="hover:underline">
                  Penugonda
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-vysyamalaSandal font-bold mb-2">
              Vinayagar Decoration
            </h3>
            <ul className="text-footer-text-gray space-y-1">
              <li>
                <a href="" className="hover:underline">
                  2013 | 2014 | 2015
                </a>
              </li>
              <li>
                <a href="" className="hover:underline">
                  2016 | 2017 | 2018
                </a>
              </li>
              <li>
                <a href="" className="hover:underline">
                  2019 | 2020 | 2021
                </a>
              </li>
            </ul>
            <h3 className="text-vysyamalaSandal font-bold mt-4">VysyaBazaar</h3>
          </div>
          <div>
            <h3 className="text-vysyamalaSandal font-bold mb-2">Help</h3>
            <ul className="text-footer-text-gray space-y-1">
              <li>
                <a href="" className="hover:underline">
                  FAQs
                </a>
              </li>
              <li>
                <a href="" className="hover:underline">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="" className="hover:underline">
                  Feedback
                </a>
              </li>
              <li>
                <a href="" className="hover:underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};
