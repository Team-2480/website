import { argbFromHex, genScheme } from "m3-dreamland";

export const { light, dark } = genScheme(
    "content", // Scheme Input

    -0.5, //contrast value

  // INFO: you can ignore most of the settings here expect this one:
    // argbFromHex("#e28743"),
    argbFromHex("#0000FF"),
  );
