export const queries = {
  ping: () => "pong",
  say: (_: any, { name }: { name?: string }) =>
    `Hey ${name || "Guest"}, how are you dude`,
};
