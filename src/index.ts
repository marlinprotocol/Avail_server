import { app } from './server'

app.listen(process.env.PORT, () => {
  console.log(
    `kalypso-server delegated server running on port : ${process.env.PORT}`
  )
})
