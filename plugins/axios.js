export default function ({ $axios, store }) {
  $axios.onRequest(config => {
    if (!config.url) {
      console.error('Axios request invalid config', config)
      return
    }
    if (config.url.startsWith('http:') || config.url.startsWith('https:')) {
      console.log(config.headers)
      return
    }
    var bearerToken = store.state.auth.token
    if (bearerToken) {
      config.headers.common['Authorization'] = `Bearer ${bearerToken}`
    }

    // if ((process.env.NODE_ENV === 'development') && !process.server) {
    if (!process.server) {
      config.url = `/dev${config.url}`
      console.log('Making request to ' + config.url)
    }
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    const message = error.response ? error.response.data || 'Unknown Error' : 'Unknown Error'
    console.error('Axios error', code, message)
  })
}