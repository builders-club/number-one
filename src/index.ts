import dotenv from 'dotenv'
dotenv.config()

import axios, { AxiosResponse } from 'axios'
import http from 'http'
import express from 'express'
import qs from 'querystring'

import { Config, TwitchTokenResponse } from './models'
import { ChatMonitor } from './chat'
import { webhookRouter } from './webhooks'
import { overlayRouter, videoRouter } from './web'
import { userRouter } from './users'
import { log, LogLevel } from './common'
import { Fauna, Twitch, Vonage, vonageRouter } from './integrations'
import { IO } from './hub'

// Identify the Twitch credentials first
const TWITCH_API = 'https://id.twitch.tv/oauth2/token'
const TwitchClientId = process.env.TWITCH_CLIENT_ID
const TwitchClientSecret = process.env.TWITCH_CLIENT_SECRET

const authParams = qs.stringify({
  client_id: TwitchClientId,
  client_secret: TwitchClientSecret,
  grant_type: 'client_credentials',
  scope: 'channel:moderate chat:edit chat:read'
})

axios.post(`${TWITCH_API}?${authParams}`)
  .then(init)
  .catch((reason: any) => log(LogLevel.Error, reason))

async function init(response: AxiosResponse<TwitchTokenResponse>) {

  const twitchAuth = response.data
  const port = process.env.PORT

  const config: Config = new Config(
    TwitchClientId,
    process.env.TWITCH_CHANNEL,
    twitchAuth.access_token,
    process.env.TWITCH_BOT_USERNAME,
    process.env.TWITCH_BOT_AUTH_TOKEN,
    process.env.TWITCH_CHANNEL_ID
  )

  const app = express()
  const server = http.createServer(app)

  const vonage = new Vonage()

  Twitch.init(config)
  Fauna.init()

  const io = new IO(server)

  app.use(express.json())

  app.use('/webhooks', webhookRouter)

  app.use('/overlays', overlayRouter)

  app.use('/vonage', vonageRouter)

  app.use('/video', videoRouter)

  app.use('/users', userRouter)

  server.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
  })

  const chatMonitor: ChatMonitor = new ChatMonitor(config)

  chatMonitor.init()
}

