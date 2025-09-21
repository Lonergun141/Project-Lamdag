const LoadingGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="bg-white overflow-hidden">
                <div className="h-64 bg-gray-200 animate-pulse" />
                <div className="p-6 space-y-4">
                    <div className="h-6 bg-gray-200 animate-pulse" />
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-200 animate-pulse" />
                        <div className="h-4 bg-gray-200 animate-pulse w-3/4" />
                    </div>
                    <div className="h-8 bg-gray-200 animate-pulse" />
                </div>
            </div>
        ))}
    </div>
);

export default LoadingGrid;