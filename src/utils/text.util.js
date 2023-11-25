import { warningLog } from "./log-utils";

export const WARNING_TXT_MESSAGE_MISSING = 'WARNING: message is missing or empty'

/** -------------------------------------------------------------------------------------------
 * GET AUTO ADVANCE DELAY
 * --------------------------------------------------------------------------------------------
 * Takes a message, and determines how long the delay should be before moving on
 * @param {string}  message Text that is being displayed
 * @param {number}  delay   Additional delay : default = 1000ms (1 second)
 * @returns Total amount of delay
 * ------------------------------------------------------------------------------------------*/
export const getAutoAdvanceDelay = (message, delay = 1000) => {
  if(!message || message?.length === 0){
    warningLog(WARNING_TXT_MESSAGE_MISSING);
    return delay;
  }
  return (message * 50) + delay;
}
