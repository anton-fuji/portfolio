import projectGroups from './Projects'
import ProjectCard from './ProjectCard';
import Background from '../../components/Background';
export { Page }

function Page ()  {
    return (
        <>
        <Background />
        <div className="space-y-12 py-20 px-8">
            <h2 className='text-white text-4xl font-extrabold text-center sm:text-5xl animate-fade-in-up'>My Projects</h2>
            {projectGroups.map((group) => (
            <section key={group.name} id={group.name}>
                
                <div className="flex flex-wrap gap-2 mb-6">
                <h3 className="inline-flex items-center gap-1 rounded-full border border-gray-700 bg-[#0a0a0a] px-3 py-1 text-white">
                    {group.icon}
                    <span className="font-medium">{group.name}</span>
                </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 justify-center">
                {group.projects.map((proj) => (
                    <ProjectCard
                    key={proj.githuburl}
                    project={proj.name}
                    description={proj.description}
                    url={proj.githuburl}
                    />
                ))}
                </div>
            </section>
            ))}
        </div>
    </>  
    );
};

