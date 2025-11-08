import Icon from '../assets/icon.svg';

export default function HeaderLogo() {
  return (
    <div className="absolute top-5 left-5 px-4 py-2.5 bg-white/95 rounded-lg z-800 shadow-sm backdrop-blur-[10px]">
      <a href="/" className="flex items-center gap-2.5">
        <img src={Icon} alt="icon" className="w-7 h-7" />
        <h1 className="text-base m-0 font-semibold">Indonesia Sentiment Map</h1>
      </a>
    </div>
  );
}
