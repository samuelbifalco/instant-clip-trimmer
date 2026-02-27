export const StatisticsSection = () => {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-800/30 p-8 text-center backdrop-blur-sm sm:p-12">
      <h2 className="mb-10 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
        Built for speed and privacy
      </h2>
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-10">
        {[
          { value: "10K+", label: "Videos trimmed", color: "text-cyan-400" },
          { value: "99.9%", label: "Uptime", color: "text-emerald-400" },
          { value: "< 5s", label: "Avg. process", color: "text-purple-400" },
          { value: "100%", label: "Free", color: "text-pink-400" },
        ].map((stat) => (
          <div key={stat.label} className="group">
            <div className={`text-4xl font-bold transition-transform group-hover:scale-105 sm:text-5xl md:text-6xl ${stat.color}`}>
              {stat.value}
            </div>
            <div className="mt-2 text-slate-400 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
