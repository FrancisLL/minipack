import { NAME } from './config.js'
import { greeting  } from "./greeting.js";

const log = greeting(`minipack ${NAME}`)
document.write(log)