export const isBlank = (input: string) => /^\s*$/.test(input);

export const isValidChannelName = (input: string) => (
  /^#[a-zA-Z0-9-_]{1,150}$/.test(input)
);

export const isValidNick = (input: string) => (
  /^[a-zA-Z0-9-_]{1,15}$/.test(input)
);
