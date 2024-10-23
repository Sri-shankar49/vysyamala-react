import { FooterContent } from '../Components/FooterPages/FooterContent'
import { useLocation } from "react-router-dom";
import parseHtml from "html-react-parser"

export const FooterPages = () => {
    const location = useLocation();
    // Log location.state to see the structure of the received data
    console.log("Location State:", location.state);


    // Access the FAQ data properly using dot notation if necessary
    const faqData = location.state?.faqData?.data.content || [];  // Adjust the path based on your data structure
    console.log(faqData, "received data");


    // Parse the HTML content safely
    const parsedContent = parseHtml(faqData);


     // Access the data passed via state from VysyamalaAbout
  const section = location.state?.section || "";


    return (
        <div className='mt-28'>

{section === "about-us" && (
        <div>
          <h1>About Us</h1>
          <p>
            Detailed information about Vysyamala, our mission, our values, and the services we offer. <br />
            [Extended description about Vysyamala goes here...]
          </p>
        </div>
      )}
            <ul>
                <FooterContent
                    // key={index}
                    content={parsedContent}
                // title=""  // Pass the question as the title prop
                // description={faqData}  // Pass the answer as the description prop
                />
                {/* {faqData} */}

            </ul>
            {/* <p>No FAQ data available.</p> */}
        </div>
    )
}
