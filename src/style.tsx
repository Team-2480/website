import { argbFromHex, genScheme } from "m3-dreamland";

export const { light, dark } = genScheme(
    "content",
    11 / 12,

  // INFO: you can ignore most of the settings here expect this one:
    argbFromHex("#4fd63e"),
);
