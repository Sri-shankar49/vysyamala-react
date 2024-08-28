import { useState } from "react";
import { IoClose } from "react-icons/io5";
import {
    EmailShareButton,
    FacebookShareButton,
    GabShareButton,
    HatenaShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton,
    WorkplaceShareButton,
    WeiboShareButton,
} from "react-share";

import {
    EmailIcon,
    FacebookIcon,
    GabIcon,
    HatenaIcon,
    InstapaperIcon,
    LineIcon,
    LinkedinIcon,
    LivejournalIcon,
    MailruIcon,
    OKIcon,
    PocketIcon,
    RedditIcon,
    TelegramIcon,
    TumblrIcon,
    TwitterIcon,
    ViberIcon,
    VKIcon,
    WeiboIcon,
    WhatsappIcon,
    WorkplaceIcon,
} from "react-share";

interface ShareProps {
    closePopup: () => void;
}

export const Share: React.FC<ShareProps> = ({ closePopup }) => {

    const shareUrl = window.location.href;
    const title = "Check out this profile!";

    const [buttonText, setButtonText] = useState("Copy Link");

    const copyLinkToClipboard = () => {
        navigator.clipboard
            .writeText(shareUrl)
            .then(() => {
                console.log("Link copied to clipboard!");
                setButtonText("Copied");
                setTimeout(() => setButtonText("Copy Link"), 2000); // Reset the button text after 2 seconds
            })
            .catch((err) => {
                console.error("Failed to copy the link: ", err);
            });
    };

    return (
        <div>
            {/* Icons */}
            <div
                // onClick={closeModal}
                className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"

            >
                <div className="relative w-6/12 bg-white rounded-lg px-2 pt-10 pb-5">

                    <div className="flex justify-end">
                        <div className="w-fit">
                            <IoClose
                                onClick={closePopup}
                                className="absolute top-3 right-3 text-[22px] text-vysyamalaBlack cursor-pointer" />
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                        <FacebookShareButton
                            url={shareUrl}
                            title="Check out this profile!"
                        >
                            <FacebookIcon size={48} round />
                        </FacebookShareButton>

                        <TwitterShareButton
                            url={shareUrl}
                            title="Check out this profile!"
                        >
                            <TwitterIcon size={48} round />
                        </TwitterShareButton>

                        <WhatsappShareButton
                            url={shareUrl}
                            title="Check out this profile!"
                        >
                            <WhatsappIcon size={48} round />
                        </WhatsappShareButton>

                        <EmailShareButton
                            url={shareUrl}
                            title="Check out this profile!"
                        >
                            <EmailIcon size={48} round />
                        </EmailShareButton>

                        <GabShareButton url={shareUrl} title={title}>
                            <GabIcon size={48} round />
                        </GabShareButton>

                        <HatenaShareButton url={shareUrl} title={title}>
                            <HatenaIcon size={48} round />
                        </HatenaShareButton>

                        <InstapaperShareButton url={shareUrl} title={title}>
                            <InstapaperIcon size={48} round />
                        </InstapaperShareButton>

                        <LineShareButton url={shareUrl} title={title}>
                            <LineIcon size={48} round />
                        </LineShareButton>

                        <LinkedinShareButton url={shareUrl} title={title}>
                            <LinkedinIcon size={48} round />
                        </LinkedinShareButton>

                        <LivejournalShareButton
                            url={shareUrl}
                            title={title}
                        >
                            <LivejournalIcon size={48} round />
                        </LivejournalShareButton>

                        <MailruShareButton url={shareUrl} title={title}>
                            <MailruIcon size={48} round />
                        </MailruShareButton>

                        <OKShareButton url={shareUrl} title={title}>
                            <OKIcon size={48} round />
                        </OKShareButton>

                        {/* <PinterestShareButton url={shareUrl} title={title}>
                                    < PinterestIcon size={32} round />
                                </ PinterestShareButton> */}

                        <PocketShareButton url={shareUrl} title={title}>
                            <PocketIcon size={48} round />
                        </PocketShareButton>

                        <RedditShareButton url={shareUrl} title={title}>
                            <RedditIcon size={48} round />
                        </RedditShareButton>

                        <TelegramShareButton url={shareUrl} title={title}>
                            <TelegramIcon size={48} round />
                        </TelegramShareButton>

                        <TumblrShareButton url={shareUrl} title={title}>
                            <TumblrIcon size={48} round />
                        </TumblrShareButton>

                        <ViberShareButton url={shareUrl} title={title}>
                            <ViberIcon size={48} round />
                        </ViberShareButton>

                        <VKShareButton url={shareUrl} title={title}>
                            <VKIcon size={48} round />
                        </VKShareButton>

                        <WorkplaceShareButton url={shareUrl} title={title}>
                            <WorkplaceIcon size={48} round />
                        </WorkplaceShareButton>

                        {/* <FacebookMessengerShareButton url={shareUrl} title={title}>
                                    <FacebookMessengerIcon size={32} round />
                                </FacebookMessengerShareButton> */}

                        <WeiboShareButton url={shareUrl} title={title}>
                            <WeiboIcon size={48} round />
                        </WeiboShareButton>

                        {/* <  XShareButton url={shareUrl} title={title}>
                                    < XIcon size={32} round />
                                </ XShareButton> */}

                        <div className="w-full flex flex-col items-center">
                            <p className="text-lg text-vysyamalaBlack mb-2">
                                {window.location.href}
                            </p>
                            <button
                                className={`px-4 py-2 text-white rounded ${buttonText === "Copied" ? "bg-[#53c840]" : "bg-secondary"}`}
                                onClick={copyLinkToClipboard} >
                                {buttonText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
