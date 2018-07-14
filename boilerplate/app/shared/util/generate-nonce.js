export const generateNonce = () => {
  let nonce = ''
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 40; i++) {
    nonce += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return nonce
}
