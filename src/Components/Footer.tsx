import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchFooterContent } from "../commonapicall";


export const Footer = () => {

  const [showFooterContent, setShowFooterContent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleFooterContent = async (pageId?: string) => {
    try {
      setLoading(true); // Start loading
      const data = await fetchFooterContent(pageId); // Call the API to fetch FAQ data

      setShowFooterContent(!showFooterContent);

      console.log(data);

      navigate("/FooterPages", { state: { faqData: data } }); // Navigate to the FAQ page and pass the fetched data

    } catch (error: any) {
      setError(error.message || "Failed to fetch footer content");
    } finally {
      setLoading(false); // End loading
    }
  };

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }



  return (
    <div>
      <footer className="bg-footer-gray text-zinc-400 py-[70px]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">
                Arya Vysya Community
              </h3>
              <ul className="text-footer-text-gray">
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Arya Vysya Events
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Arya Vysya Grooms
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Arya Vysya Brides
                  </a>
                </li>
                <li className="mb-2">
                  <p onClick={() => { handleFooterContent("4") }} className="hover:underline cursor-pointer">
                    History of Arya Vysya
                  </p>
                </li>
                <li className="mb-2">
                  <p onClick={() => { handleFooterContent("6") }} className="hover:underline cursor-pointer">
                    Arya Vysya Gothras
                  </p>
                </li>
                <li className="mb-2">
                  <p onClick={() => { handleFooterContent("1") }} className="hover:underline cursor-pointer">
                    Penugonda
                  </p>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">VysyaBazaar</h3>
              <ul className="text-footer-text-gray">
                <li className="mb-2">
                  <p onClick={() => { handleFooterContent("11") }} className="hover:underline cursor-pointer">
                    About
                  </p>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Blog
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Jobs
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Press
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Partners
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">
                Vinayagar Decoration
              </h3>
              <ul className="text-footer-text-gray">
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    2013 | 2014 | 2015
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    2016 | 2017 | 2018
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    2019 | 2020 | 2021
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Help</h3>
              <ul className="text-footer-text-gray">
                <li className="mb-2">
                  {/* {/ Trigger API call and navigation when clicked /} */}
                  <p onClick={() => { handleFooterContent("1") }} className="hover:underline cursor-pointer">
                    FAQs
                  </p>
                </li>
                <li className="mb-2">
                  <p onClick={() => { handleFooterContent("2") }} className="hover:underline cursor-pointer">
                    Terms & Conditions
                  </p>
                </li>
                <li className="mb-2">
                  <p onClick={() => { handleFooterContent("3") }} className="hover:underline cursor-pointer">
                    Privacy Policy
                  </p>
                </li>
                <li className="mb-2">
                  <p className="hover:underline cursor-pointer">
                    Feedback
                  </p>
                </li>
                <li className="mb-2">
                  <p className="hover:underline cursor-pointer">
                    Contact Us
                  </p>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="text-footer-text-gray">
                <li className="mb-2 flex items-center">
                  <span className="mr-2">📞</span> someone@gmail.com
                </li>
                <li className="mb-2 flex items-center">
                  <span className="mr-2">📧</span> someone@gmail.com
                </li>
                <li className="mb-2 flex items-center">
                  <span className="mr-2">📧</span> someone@gmail.com
                </li>
              </ul>
              <h3 className="text-white mb-4">Downloads</h3>
              <div className="flex space-x-4">
                <img src="https://placehold.co/100x40" alt="App Store" />
                <img src="https://placehold.co/100x40" alt="Google Play" />
              </div>
            </div>
          </div>

          <div className="text-footer-text-gray mt-8 text-center border-t border-footer-line pt-4">
            <p>Copyright &copy; Vysyamala.com 2024. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};