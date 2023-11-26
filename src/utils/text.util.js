import { warningLog } from "./log-utils";

export const AUTO_ADVANCE_DELAY_DEFAULT = 1000;
export const AUTO_ADVANCE_DELAY_PER_CHAR = 50;
export const WARNING_TXT_MESSAGE_MISSING = 'WARNING: message is missing or empty'

/** -------------------------------------------------------------------------------------------
 * GET AUTO ADVANCE DELAY
 * --------------------------------------------------------------------------------------------
 * Takes a message, and determines how long the delay should be before moving on
 * @param {string}  message Text that is being displayed
 * @param {number}  delay   Additional delay : default = 1000ms (1 second)
 * @returns Total amount of delay
 * ------------------------------------------------------------------------------------------*/
export const getAutoAdvanceDelay = (message, delay = AUTO_ADVANCE_DELAY_DEFAULT) => {
  if(!message || message?.length === 0){
    warningLog(WARNING_TXT_MESSAGE_MISSING);
    return delay;
  }
  return (message.length * AUTO_ADVANCE_DELAY_PER_CHAR) + delay;
}
