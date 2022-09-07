const PATH = {
  INDEX: "/",
  NOTIFICATION: "/notification",
  LIBRARY: "/library",
  USERAPPLICATION: "/user-application",
  SETTINGS: "/settings",
  APPROVEDAPPLICATION: "/administration/approvedapp",
  UNAPPROVEDAPPLICATION: "/administration/unapprovedapp",
  KEY: "/key",
  SALES: "/sales",
  MEMBEREDIT: "/administration/memberedit",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  FORGOT_PASSWORD: "/forgot-password",
  AUTHENTICATION: "/authentication",
  TEST: "/test",
} as const;

export const getPath = (pathKey: keyof typeof PATH, ...args: string[]) => {
  const val = PATH[pathKey];

  if (!args) {
    return val;
  }

  const dirs = val.slice(1).split("/");

  const newPath = dirs.map((dir) => {
    if (dir.startsWith("[")) {
      const replaceDir = args[0];
      args.shift();
      return replaceDir;
    }
    return dir;
  });

  return "/" + newPath.join("/");
};
