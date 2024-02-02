import { usePlayerStore } from "@/store/playerStore";
import { Play, Pause } from "./Player";

export function CardPlayButton ({id, size="small"}) {
  const {
    currentMusic,
    isPlaying,
    setIsPlaying,
    setCurrentMusic
  } = usePlayerStore(state => state)

  const isPlayingPlaylist = isPlaying && currentMusic?.playlist?.id == id;
  const handleClick = () => {
    if(currentMusic?.playlist?.id == id) {
      setIsPlaying(!isPlaying);
      return;
    }
    fetch(`/api/get-info-playlist.json?id=${id}`)
      .then(res => res.json())
      .then(data => {
        const { songs, playlist } = data;
        setIsPlaying(true);
        setCurrentMusic({
          songs,
          playlist,
          song: songs[0]
        });
      })
  }
  const iconClassName = size === "small" ? "h-4 w-4" : "h-6 w-6"
  
  return (
    <button onClick={handleClick} className="card-play-button rounded-full bg-green-500 p-4 hover:scale-105 hover:shadow-xl transition-all duration-200">
      { isPlayingPlaylist ? <Pause className={iconClassName} /> : <Play className={iconClassName} /> }
    </button>
  )
}