import { useEffect } from "react"


function App() {

  const [videos, setVideos] = useState([]); 

  useEffect(() => {
    const buscaVideos = async () => {
      try {
        const response = await fetch("https//localhost:3000/videos");
        if (!response.ok) {
          throw new Error("Erro ao buscar vídeos");
        }
        const data = await response.json();
        setVideos(data); // Atualiza o estado com os vídeos
      } catch (error) {
        console.log(error)
      } 
    };

    buscaVideos(); // Chama a função de busca

  }, [])

  return (
    <div>
      <h1>Vídeos</h1>
      <ul>
        {videos.map(video => (
          <li key={video.id}>
            {video.title} - {video.duration}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
