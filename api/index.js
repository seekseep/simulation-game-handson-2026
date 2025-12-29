/**
 *
 * @param {Request} request
 * @param {Response} response
 * @returns
 */
export default async function handler(request, response) {
  response.setHeader('Content-Type', 'text/plain')
  return response.status(200).send('OK')
}
