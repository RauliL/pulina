export const VALID_CHANNEL_NAME_PATTERN = /^#[a-zA-Z0-9-_]{1,150}$/;
export const VALID_NICK_PATTERN = /^[a-zA-Z0-9-_]{1,15}$/;

export const isValidChannel = (input: string) =>
  VALID_CHANNEL_NAME_PATTERN.test(input);

export const isValidNick = (input: string) => VALID_NICK_PATTERN.test(input);
