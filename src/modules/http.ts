
import * as http from 'http'

let server: http.Server | null = null
export const getServer = (fn?: http.RequestListener): http.Server => {
  if (!server) {
    server = http.createServer(fn);
  }
  return server as http.Server
};

export const closeServer = (fn?: (err?: Error) => void): void => {
  getServer().unref().close((err) => {
    server = null;
    if (fn) fn(err)
  })
}