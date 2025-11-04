import { IoClose } from 'react-icons/io5';
import type { ClickInfo } from '../types/sentiment';

interface SidebarProps {
  clicked: ClickInfo | null;
  onClose: () => void;
}

export default function Sidebar({ clicked, onClose }: SidebarProps) {
  if (!clicked) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 z-900 animate-[fadeIn_0.2s_ease-in-out]"
        onClick={onClose}
      />
      <div className="fixed top-0 right-0 w-[400px] h-screen bg-white shadow-[-2px_0_8px_rgba(0,0,0,0.15)] z-950 flex flex-col animate-[slideIn_0.3s_ease-out] max-md:w-full max-md:max-w-[400px]">
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200">
          <h2 className="m-0 text-xl font-semibold text-gray-800">Detail Provinsi</h2>
          <button
            className="bg-transparent border-none text-2xl leading-none text-gray-500 cursor-pointer p-1 w-8 h-8 flex items-center justify-center rounded transition-colors hover:bg-gray-100 hover:text-gray-800"
            onClick={onClose}
          >
            <IoClose />
          </button>
        </div>
        <div className="flex-1 p-6 overflow-y-auto">
          <h1>Hello World</h1>
          <p>State ID: {clicked.stateId}</p>
        </div>
      </div>
    </>
  );
}
