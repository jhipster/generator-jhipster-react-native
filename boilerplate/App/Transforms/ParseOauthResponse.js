export const parseOauthResponse = (oauthResponse) => {
  const urlParameters = oauthResponse.url.split('&')

  let oauthState = urlParameters
    .filter(segment => segment.indexOf('state') > -1)
    .map(segment => segment.split('=')[1])[0]

  let accessToken = urlParameters
    .filter(segment => segment.indexOf('access_token') > -1)
    .map(segment => segment.split('=')[1])[0]

  return { oauthState, accessToken }
}
