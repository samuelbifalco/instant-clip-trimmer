
export const StatisticsSection = () => {
  return (
    <div className="text-center">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="space-y-3">
          <div className="text-4xl md:text-5xl font-black text-blue-400">10K+</div>
          <div className="text-gray-300 text-lg font-medium">Videos Trimmed</div>
        </div>
        <div className="space-y-3">
          <div className="text-4xl md:text-5xl font-black text-green-400">99.9%</div>
          <div className="text-gray-300 text-lg font-medium">Uptime</div>
        </div>
        <div className="space-y-3">
          <div className="text-4xl md:text-5xl font-black text-purple-400">&lt; 5s</div>
          <div className="text-gray-300 text-lg font-medium">Avg. Process Time</div>
        </div>
        <div className="space-y-3">
          <div className="text-4xl md:text-5xl font-black text-pink-400">100%</div>
          <div className="text-gray-300 text-lg font-medium">Free Forever</div>
        </div>
      </div>
    </div>
  );
};
