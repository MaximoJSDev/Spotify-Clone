import TimeIcon from "@/icons/Time.jsx";
import { usePlayerStore } from "@/store/playerStore";

export function MusicsTable ({songs,playlist}) {
  const { setIsPlaying, setCurrentMusic } = usePlayerStore((state) => state);
  
  const handleClick = (song) => {
    setIsPlaying(true);
    setCurrentMusic({
      songs,
      playlist,
      song
    })
  }

  return (
    <table className="table-auto text-left min-w-full divide-y divide-gray-800/70">
      <thead className="text-gray-400 text-xs">
        <tr>
          <th className="px-3 py-2 pl-6 text-base">#</th>
          <th className="px-3 py-2">Título</th>
          <th className="px-3 py-2">Álbum</th>
          <th className="px-3 py-2"><TimeIcon /></th>
        </tr>
      </thead>
      <tbody>
        <tr className="h-[16px]"></tr>
        { songs.map((song, index) => (
            <tr key={index} onClick={() => handleClick(song)} className="text-sm text-gray-400 hover:bg-white/10 transition duration-300 px-2">
              <td className="px-3 py-2 pl-6 w-3 rounded-tl-lg rounded-bl-lg text-base">
                <span>
                  {index + 1}
                </span>
              </td>
              <td className="px-3 py-2 flex">
                <picture>
                  <img
                    src={song.image}
                    alt={song.title}
                    className="w-auto h-10 rounded-sm mr-3"
                  />
                </picture>
                <div>
                  <h3 className="text-base text-white font-normal">{song.title}</h3>
                  <span className="text-sm">{song.artists.join(", ")}</span>
                </div>
              </td>
              <td className="px-3 py-2">{song.album}</td>
              <td className="px-3 py-2 rounded-tr-lg rounded-br-lg">{song.duration}</td>
            </tr>
          ))} 
      </tbody>
    </table>
  )
}

