import { FC } from 'react';
import ProfileIcon from "../assets/fuji-icon.jpg"
import { PERSONAL_INFO } from "../mydata/data";


const profile = {
    name: PERSONAL_INFO.name,
    description: PERSONAL_INFO.description,
}

const Profile: FC = () => {
    return (
        <div className='flex flex-col items-center  min-h-screen justify-center px-8'>
            <div className='flex items-center gap-12'> 
                <div className='w-44 h-44 rounded-full overflow-hidden border-4 border-white'>
                    <img className='w-full h-full object-cover' 
                        src={ProfileIcon}
                        alt=''
                        />
                </div>

                <div className='flex flex-col gap-4 text-left'>
                    <div className='flex flex-col gap-2 text-white'>
                        <h1 className='whitespace-pre-wrap font-bold texxt-3xl sm:text-4xl'>
                            {profile.name}
                        </h1>
                        <p className='whitespace-pre-wrap text-xl text-gray-300 max-w-lg'>{profile.description}</p>
                    </div>
                </div>
                {/* <SocialLinks /> */}
            </div>
        </div>
    )
}

export default Profile;