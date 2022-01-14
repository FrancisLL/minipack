import { NAME } from './config.js'

export function greeting(name) {
  const str = `your ${NAME} name: ${name}`
  console.log(str)
  return str
}