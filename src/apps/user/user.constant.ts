import { MESSAGES } from '@messages/index';

export const EXPIRED_TIME = 10;
export const MS_OF_DAY = 86400000;
export const PASSWORD_REG =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
export const REQUEST_CHANGE_EMAIL_SUCCESS = `Change Email
A notification has been sent to your new email address.
Please click the verification URL to completely change your email address.
※Please note that the URL is valid for one hour. If it expires, please redo the process in order to get a new verification URL.`;
export const USER_UPDATEDUSER_ERROR_SUCCESSFULLY = `Your profile has been updated.`;
export const USER_CREATED_SUCCESSFULLY = `Account has been created.`;
export const PASSWORD_UPDATED = `Password has been changed`;
