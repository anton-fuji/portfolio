import { FC } from 'react';
import Card from '../../components/Card';
import { LuExternalLink } from "react-icons/lu";



export type ProjectCardProps = {
    project: string; 
    description: string;
    url: string;
};

const ProjectCard: FC<ProjectCardProps> = ({ project, url, description }) => {
    return (
        <Card className='relative justify-between p-6 pl-6 rounded-xl bg-[#0a0a0a]/90 background-blur-sm border-white/20 hover:shadow-lg hover:-trancelate-y-1 transition-all'>
            <a 
                className='flex item-center mb-2  text-white hover:text-gray-400 transition-colors'
                href={url}
                rel='noopener noreferrer'
                target='_blank'
            >
                <h3 className='text-xl font-semibold text-white'>{project}</h3>
                <LuExternalLink size={20} className='ml-2 group-hover:text-gray-400 transition-colors'/>
                
            </a>
            <p className='text-gray-400 md:flex-1'>{description}</p>
        </Card>
    );
};

export default ProjectCard;

