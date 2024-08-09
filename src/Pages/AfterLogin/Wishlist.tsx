// import { ListCard } from '../../Components/LoginHome/MatchingProfiles/ProfileCard/ListCard'
import { SuggestedProfiles } from '../../Components/LoginHome/SuggestedProfiles'
import { WishlistCard } from '../../Components/Wishlist/WishlistCard'

export const Wishlist = () => {
    return (
        <div className="bg-grayBg">
            <div className="container mx-auto py-10">
                <h4 className="text-[24px] text-vysyamalaBlackSecondary font-bold mb-5">Wishlist
                    <span className="text-sm text-primary"> (05)</span>
                </h4>

                {/* WishlistCard */}
                <div>
                    <WishlistCard />
                    {/* <WishlistCard />
                    <WishlistCard /> */}
                </div>
            </div>
            {/* Suggested Profiles */}
            <SuggestedProfiles />

        </div>
    )
}
