import {FC,  useEffect, useState} from 'react';
import { twMerge } from 'tailwind-merge';

interface SkillBarProps {
    name: string;
    level: number;
    color?: string;
    delay?: number;    
}

const SkillBar: FC<SkillBarProps> = ({
    name,
    level,
    color = "bg-blue-500",
    delay = 0,
}) => {
    const [width, setWidth] = useState(0)

    useEffect(() => {
        const timer = setTimeout(() => {
            setWidth(level)
        }, delay);
        return () => clearTimeout(timer)
    }, [level, delay]);

    return (
        <div className="mb-6">
            <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-300">{name}</span>
                <span className="text-sm font-medium text-gray-300">{width}%</span>
            </div>
            <div className="h-2.5 bg-gray-700 rounded-full overflow-hidden">
                <div className={twMerge(
                    "h-full rounded-full transition-all duration-1000 ease-out", color
                )}
                    style={{ width: `${width}%`}}
                />
            </div>
        </div>
    )
}

export default SkillBar;