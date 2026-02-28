import { z } from "zod";

export const RegisterSchema = z.object({
  email: z.email({error: "Geçersiz e-posta"}),
  username: z.string({error: (issue) => {
    if(issue.code === "too_small") {
      return "Kullanıcı adı en az 3 karakter olmalıdır";
    }
    return "Geçersiz kullanıcı adı";
  }}).min(3),
  password: z.string({error: (issue) => {
    if(issue.code === "too_small") {
      return "Şifre en az 6 karakter olmalıdır";
    }
    return "Geçersiz şifre";
  }}).min(6),
});

export const LoginSchema = z.object({
  email: z.email({error: "Geçersiz e-posta"}),
  password: z.string({error: (issue) => {
    if(issue.code === "too_small") {
      return "Şifre en az 6 karakter olmalıdır";
    }
    return "Geçersiz şifre";
  }}).min(6),
});
