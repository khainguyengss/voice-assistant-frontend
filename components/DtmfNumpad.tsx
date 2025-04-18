import { RoomContext } from "@livekit/components-react";
import { useContext } from "react";

interface DtmfNumpadProps {
  className?: string;
}

export function DtmfNumpad({ className = "" }: DtmfNumpadProps) {
  const room = useContext(RoomContext);

  const getDtmfCode = (char: string): number => {
    switch (char) {
      case "*":
        return 10;
      case "#":
        return 11;
      default:
        return parseInt(char);
    }
  };

  const handleNumberClick = async (char: string) => {
    if (!room) return;
    const code = getDtmfCode(char);
    await room.localParticipant.publishDtmf(code, char);
  };

  const numbers = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["*", "0", "#"],
  ];

  return (
    <div className={`w-fit flex flex-col gap-2 p-4 rounded-lg text-black ${className}`}>
      {numbers.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-3 gap-2">
          {row.map((number) => (
            <button
              key={number}
              onClick={() => handleNumberClick(number)}
              className="w-12 h-12 flex items-center justify-center bg-white rounded-lg shadow-sm hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              {number}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
} 