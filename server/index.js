import cors from 'cors'
import express from 'express'

import { convert } from './convert.js'
import { download } from './download.js'
import { transcribe } from './transcribe.js'
import { summarize } from './summarize.js'
//ordem importante
const app = express()

app.use(express.json())
app.use(cors())
//criar rotas
// como parâmetro recebe as requisições e respostas (request, responses)
// ":" entende o que vem após é um parâmetro
app.get('/summary/:id', async (request, response) => {
  try {
    await download(request.params.id)
    const audioConverted = await convert()

    const result =  await transcribe(audioConverted)
    return response.json({result})
  } catch (error) {
    console.log(error)
    return response.json({error})
  }
})

app.post('/summary', async (request, response) => {
  try {
    const result =  await summarize(request.body.text)
    return response.json({result})
  } catch (error) {
    console.log(error)
    return response.json({error})
  }
})

//nosso app escuta [requisições] (listen) na porta 3333.
app.listen(3333, () => console.log("server is running in port 3333"))
// node --watch  server/index.js -> flag --watch para atualização automática do servidor
