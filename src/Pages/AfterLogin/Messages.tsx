import { ProfileContacts } from '../../Components/Messages/ProfileContacts';
import { ProfileChatArea } from '../../Components/Messages/ProfileChatArea';

export const Messages = () => {
  return (
    <div>
      <div className="bg-grayBg">
        <div className="container mx-auto py-10">

          <h4 className="text-[24px] text-vysyamalaBlackSecondary font-bold mb-5"> Messages
            {/* <span className="text-sm text-primary"> (05)</span> */}
          </h4>


          {/* Chat Area */}
          <div className="bg-white rounded-xl shadow">
            <div className="w-full flex items-start justify-start">
              <ProfileContacts />
              <ProfileChatArea />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
