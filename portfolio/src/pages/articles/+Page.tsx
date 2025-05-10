import ZennIcon  from "../../assets/icons/socials/zenn.svg?react";
import QiitaIcon from "../../assets/icons/socials/qiita.svg?react";
import Card from '../../components/Card';
import { PLATFORM } from './Platform';
import Background from "../../components/Background";
export { Page }

function Page() {
    const zenn = PLATFORM.filter((p) => p.Zenn);
    const qiita = PLATFORM.filter((p)=> p.Qiita);

    return (
        <>
        <Background />
        <div className='space-y-16 py-20'>
            <section>
                <div className='flex items-center gap-2 mb-6 ml-4'>
                    <ZennIcon className='w-6 h-6 text-white'/>
                    <h2 className='text-3xl font-bold text-white'>Zenn Articles</h2>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center-safe'>
                    {zenn.map((plat) => (
                        <Card key={plat.url} className='relative justify-between p-6 pl-6 rounded-xl bg-[#0a0a0a]/90 background-blur-sm border-white/20 hover:shadow-lg hover:-trancelate-y-1 '>
                            <a href={plat.url} target='_blank' rel='noopener noreferrer' className='text-white hover:text-gray-400 transition-colors'>
                                <h3 className='text-xl font-medium'>{plat.Zenn}</h3>
                            </a>
                        </Card>
                    ))} 
                </div>                    
            </section>

            <section>
                <div className='flex items-center gap-2 mb-6 ml-4'>
                    <QiitaIcon className='w-6 h-6 text-white'/>
                    <h2 className='text-3xl font-bold text-white'>Qiita Articles</h2>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center-safe'>
                    {qiita.map((plat) => (
                        <Card key={plat.url} className='relative justify-between p-6 pl-6 rounded-xl bg-[#0a0a0a]/90 background-blur-sm border-white/20 hover:shadow-lg hover:-trancelate-y-1 transition-all'>
                            <a href={plat.url} target='_blank' rel='noopener noreferrer' className='text-white hover:text-gray-400 transition-colors'>
                                <h3 className='text-xl font-medium'>{plat.Qiita}</h3>
                            </a>
                        </Card>
                    ))} 
                </div>                    
            </section>
        </div>
        </>
    )
}



