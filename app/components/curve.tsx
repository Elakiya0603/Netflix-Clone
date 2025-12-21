export default function Curve() {
  return (
    <div className="relative w-full overflow-hidden bg-black">
      {/* Curve Shape */}
      <div className="relative h-[80px] md:h-[120px]">
        <svg
          viewBox="0 0 1440 120"
          className="absolute bottom-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C240,80 480,120 720,120 960,120 1200,80 1440,0 L1440,120 L0,120 Z"
            fill="black"
          />
        </svg>

        {/* Subtle Red Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/30 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
