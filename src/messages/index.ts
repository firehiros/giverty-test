export const MESSAGES = {
  MSG_001: (fieldName: string) => `${fieldName}は必須です。`,
  MSG_002: (fieldName: string) =>
    `${fieldName}は間違ったフォーマット。 もう一度やり直してください。`,
  MSG_003: ({
    field = '',
    minValue = 0,
  }: {
    field?: string;
    minValue?: number;
  }) => `${field} は ${minValue} 桁以上で入力してください。`,
  MSG_004: ({
    field = '',
    maxValue = 0,
  }: {
    field?: string;
    maxValue?: number;
  }) => `${field} は ${maxValue} 文字以内で入力してください。`,
  MSG_006: 'Please perform man-machine certification.',
  MSG_007: 'Do you want to log out?',
  MSG_008: 'This mail address already exists',
  MSG_009: 'Please agree to Terms and Conditions.',
  MSG_010: '',
  MSG_011: ({
    fieldName = '',
    maxValue = 0,
  }: {
    fieldName?: string;
    maxValue?: number;
  }) => {
    return `${fieldName} は ${maxValue} 桁以内で入力してください。 もう一度やり直してください。`;
  },
  MSG_012:
    'Your current wallet balance is not enough to make this transaction. Please deposit more money into your wallet or change the amount you want to exchange!',
  MSG_013:
    'The transaction failed. The amount of crypto currency you want to exchange is greater than coins amount in the pool, please choose the less amount or come back later!',
  MSG_014: ({
    fieldName = '',
    minValue = 0,
  }: {
    fieldName?: string;
    minValue?: number;
  }) => {
    return `${fieldName} は ${minValue} 桁以上で入力してください。 もう一度やり直してください。`;
  },
  MSG_015: 'トランザクションの期限切れです。もう一度やり直してください。',
  MSG_016:
    'Your account has logged out for security reasons due to no operation for long time. Please log in again if you want to continue your transaction.',
  MSG_017:
    'The two selected cryptocurrencies cannot be swapped directly with each other. Please swap to USDT if you want to continue your transaction.',
  MSG_018: 'トランザクションが失敗しました。もう一度やり直してください。',
  MSG_019: 'Transaction in progress. Please wait a few minutes!',
  MSG_020: 'Cannot remit to your account.',
  MSG_022: 'Input data is not consistent.',
  MSG_023: 'User not found. Please try again!',
  MSG_024: 'The email address already exits! Please try with another one.',
  MSG_025: 'Please select your files to upload.',
  MSG_026: 'The function setting of the authentication system is completed.',
  MSG_027:
    'Having exceeded the withdrawal quota that the system can implement during the day, please come back tomorrow!',
  MSG_028:
    'Having exceeded the quota that you can implement during the day, please come back tomorrow!',
  MSG_029:
    'Having exceeded the quota that you can implement during this month, please come back later!',
  MSG_030: 'You have made too many trades in an hour. Please come back later!',
  MSG_031: 'You have made too many trades in a day. Please come back later!',
  MSG_032: `You can enjoy our account service with a total money-out limit of USD1000.00.
            If you want make a transaction with the amount greater than this limit, please do KYC.`,
  MSG_033: (fieldName = '', value = 0) => {
    return `${fieldName}は${value} 字以上で入力してください。`;
  },
  MSG_034: (fieldName = '', value = 0) => {
    return `${fieldName}は${value} 文字以内で入力してください。`;
  },
  MSG_035: 'パスワードは半角文字、大文字、数字、特殊文字を含む必要があります。',
  MSG_036: '',
  MSG_037: '',
  MSG_038: '',
  MSG_039: '',
  MSG_040: '',
  MSG_041:
    "Fast account can't make this transaction! Please do KYC to continue.",
  MSG_042: '',
  MSG_043: (fieldName: string) =>
    `${fieldName}は正しくありません。もう一度試してください。`,
  MSG_044: 'Inputted new Password same Old Password. Please try again!',
  MSG_045: '',
  MSG_046: '',
  MSG_047: '',
  MSG_048: '',
  MSG_049: (fieldName: string) => `${fieldName}の作成が完了しました.`,
  MSG_050: 'Action failed. Please refresh the page and retry',
  MSG_051: (fieldName: string) => `${fieldName}の削除が完了しました.`,
  MSG_052: (fieldName: string) => `${fieldName}の更新が完了しました.`,
  MSG_053: 'Total Value is not equal 100',
  MSG_054: 'Invalid Domain',
  MSG_055: 'Invalid Affiliate Team',
  MSG_056: (fieldName: string) => `${fieldName} not found.`,
  PASSWORD_UPDATED: `Password has been changed`,
};

export * from './user';
export * from './email';
export * from './auth';
