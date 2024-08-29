import { MESSAGES } from './index';

export const AUTH_ERROR = {
  USER_NOT_EXIST: `User does not exist`,
  INVALID_CREDENTIAL: `Invalid Credential`,
  PASSWORD_MIN_LENGTH: MESSAGES.MSG_033('パスワード', 8),
  PASSWORD_MAX_LENGTH: MESSAGES.MSG_034('パスワード', 35),
  PASSWORD_INCLUDE: `Password must have uppercase, lowercase, number and special characters: !~@#$%^&*-=\`|\\(){}[]:;\"'<>,?/`,
  WRONG_CONFIRMATION_CODE: `Confirmation code doesn't match`,
  CONFIRMATION_CODE_LENGTH: `Confirmation code's length must equal 5`,
  DATE_OF_BIRTH_ERROR: `wrong date of birth`,
  CONFIRMATION_CODE_EXPIRED: `Confirmation code expired, please send another request`,
  PASSWORD_NOT_MATCH: `Password and Confirm password do not match. Please try again.`,
  VERIFY2FA_TOKEN: `The token invalid`,
};
