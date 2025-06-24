
export const StatisticsSection = () => {
  return (
    <div className="text-center bg-gradient-to-r from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-3xl p-12 border border-gray-700/30">
      <h3 className="text-3xl md:text-4xl font-bold text-white mb-12">
        Trusted by Professionals
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        <div className="space-y-4 group cursor-default">
          <div className="text-5xl md:text-6xl lg:text-7xl font-black text-blue-400 group-hover:scale-110 transition-transform duration-300">
            10K+
          </div>
          <div className="text-gray-300 text-lg md:text-xl font-semibold">Videos Trimmed</div>
          <div className="h-1 w-16 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="space-y-4 group cursor-default">
          <div className="text-5xl md:text-6xl lg:text-7xl font-black text-green-400 group-hover:scale-110 transition-transform duration-300">
            99.9%
          </div>
          <div className="text-gray-300 text-lg md:text-xl font-semibold">Uptime</div>
          <div className="h-1 w-16 bg-gradient-to-r from-green-400 to-green-600 mx-auto rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="space-y-4 group cursor-default">
          <div className="text-5xl md:text-6xl lg:text-7xl font-black text-purple-400 group-hover:scale-110 transition-transform duration-300">
            &lt; 5s
          </div>
          <div className="text-gray-300 text-lg md:text-xl font-semibold">Avg. Process Time</div>
          <div className="h-1 w-16 bg-gradient-to-r from-purple-400 to-purple-600 mx-auto rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="space-y-4 group cursor-default">
          <div className="text-5xl md:text-6xl lg:text-7xl font-black text-pink-400 group-hover:scale-110 transition-transform duration-300">
            100%
          </div>
          <div className="text-gray-300 text-lg md:text-xl font-semibold">Free Forever</div>
          <div className="h-1 w-16 bg-gradient-to-r from-pink-400 to-pink-600 mx-auto rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>
    </div>
  );
};
