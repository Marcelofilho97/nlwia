import ytdl from 'ytdl-core'
//manipulação de arquivos
import fs from 'fs'


export const download = (videoId) => new Promise ((resolve, reject) => {
  const videoURL = "https://www.youtube.com/shorts/" + videoId
  console.log("Realizando o download do vídeo: " + videoId)
  ytdl(videoURL, {quality: "lowestaudio",filter: "audioonly"})
  .on("info", (info) => {
    const seconds = info.formats[0].approxDuartionsMs / 1000 //transformar em segundos 
    if (seconds > 60) {
      //gerando um erro no app
      throw new Error("A duração desse vídeo é maior do que 60 segundos.")
    }
  }
  ).on("end", () => {
    console.log("Download do vídeo finalizado.")
    resolve()
  }
  ).on("error", (error) => {
    console.log(
      "Não foi possível fazer o download do vídeo. Detalhes do erro:", error
    )
    reject(error)
  }
  ).pipe(fs.createWriteStream("./tmp/audio.mp4"))

})