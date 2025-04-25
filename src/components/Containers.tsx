type Props = {
    children: React.ReactNode;
    className?: string;
};

const Containers = ({ children, className = '' }: Props) => {
    return (
        <div className={`mx-auto w-full max-w-6xl px-4 ${className}`}>
            {children}
        </div>
    );
};

export default Containers;  