import { AppError, UnprocessableEntityError } from "../shared/app-error.mjs";
import { SYSTEM_LANG_ENUM } from "../shared/enums.mjs";
import MESSAGES from "../shared/messages.mjs";

export default async function LangMiddleware(req, res, next) {
  try {
    let { lang } = req.headers;
    if (!lang) {
      lang = 'en'
    }
    if (!Object.values(SYSTEM_LANG_ENUM).includes(lang)) {
      throw new UnprocessableEntityError(MESSAGES.UNKNOWN_LANGUAGE);
    }
    req.lang = lang;
    return next();
  } catch (error) {
    return next(new AppError(error));
  }
}
