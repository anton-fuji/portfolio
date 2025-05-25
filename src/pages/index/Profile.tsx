import { FC } from 'react';
import ProfileIcon from '../../assets/fuji-icon.jpg';
import { PERSONAL_INFO } from '../../mydata/data';
import Socials from './Socials';


const profile = {
    name: PERSONAL_INFO.name,
    description: PERSONAL_INFO.description,
}

const Profile: FC = () => {
    return (
        <div className='flex flex-col items-center justify-center px-8 py-24'>
            <div className='flex items-center gap-12'> 
                <div className='w-44 h-44 rounded-full overflow-hidden border-4 border-gray-400'>
                    <img className='w-full h-full object-cover' 
                        src={ProfileIcon}
                        alt=''
                        />
                </div>

                <div className='flex flex-col gap-4 text-left'>
                    <div className='flex flex-col gap-4 text-white'>
                        <h1 className='whitespace-pre-wrap font-bold texxt-3xl sm:text-4xl'>
                            {profile.name}
                        </h1>
                        <p className='whitespace-pre-line leading-relaxed text-xl text-gray-200 max-w-lg'>
                            {profile.description}
                        </p>
                        <Socials />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;