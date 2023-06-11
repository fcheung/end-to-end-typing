import Api from './api'

type ApiPaths = keyof Api

const getApi = async <Path extends ApiPaths>(uri: Path) => {
  const response = await fetch(uri, { headers: { Accept: 'application/json' } })

  if (response.ok) {
    const data = (await response.json()) as Api[Path]
    return data
  } else {
    throw 'fetch failed'
  }
}

export default getApi
