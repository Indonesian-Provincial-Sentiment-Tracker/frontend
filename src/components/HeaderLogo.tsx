import Icon from '../assets/icon.svg';

export default function HeaderLogo() {
  return (
    <div className="absolute top-5 left-5 px-4 py-2.5 bg-white/95 rounded-lg z-800 shadow-sm backdrop-blur-[10px] max-md:top-2 max-md:left-2 max-md:px-3 max-md:py-2 max-sm:px-2 max-sm:py-1.5">
      <a href="/" className="flex items-center gap-2.5 max-sm:gap-1.5">
        <img src={Icon} alt="icon" className="w-7 h-7 max-sm:w-5 max-sm:h-5" />
        <h1 className="text-base m-0 font-semibold max-md:text-sm max-sm:text-xs">
          Indonesia Sentiment Map
        </h1>
      </a>
    </div>
  );
}
