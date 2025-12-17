export default function FeaturesSection() {
  const features = [
    {
      title: "Enjoy on your TV",
      desc: "Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.",
      icon: "📺",
    },
    {
      title: "Download to watch offline",
      desc: "Save your favourites easily and always have something to watch.",
      icon: "⬇️",
    },
    {
      title: "Watch everywhere",
      desc: "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.",
      icon: "🌍",
    },
    {
      title: "Create profiles for kids",
      desc: "Send kids on adventures with their favourite characters — free with your membership.",
      icon: "🧒",
    },
  ];

  return (
    <section className="bg-black py-16 px-6 md:px-20 overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
        More reasons to join
      </h2>

      {/* Horizontal scroll row */}
      <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
        {features.map((item, index) => (
          <div
            key={index}
            className="
    relative min-w-[280px] max-w-[280px] rounded-2xl p-6
    bg-black/80
    flex flex-col justify-between
    overflow-hidden
  "
          >
            {/* Gradient glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-400 opacity-40 blur-2xl"></div>

            <div className="relative z-10">
              <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
            </div>

            <div className="text-5xl self-end mt-6 relative z-10">{item.icon}</div>
          </div>

        ))}
      </div>
    </section>
  );
}
