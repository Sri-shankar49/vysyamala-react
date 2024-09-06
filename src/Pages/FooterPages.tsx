// import { FooterContent } from '../Components/FooterPages/FooterContent'
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


    return (
        <div>
            <ul>
                {/* <FooterContent
                    key={index}
                    title=""  // Pass the question as the title prop
                    description={faqData}  // Pass the answer as the description prop
                /> */}
                {/* {faqData} */}
                {parsedContent}
            </ul>
            <p>No FAQ data available.</p>
        </div>
    )
}
