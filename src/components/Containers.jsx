const Containers = ({ children, className = ''}) => {
    return (
        <div className={`max-w-5xl mx-auto px-6 ${className}`}>
            {children}
        </div>
    )
}

export default Containers;