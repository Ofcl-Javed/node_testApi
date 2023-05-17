import jwt from "jsonwebtoken";

export const sendCookie = (user, res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECERET);

  console.log(
    eval(process.env.COOKIE_AGE),
    process.env.NODE_ENV,
    process.env.NODE_ENV === "Developement"
  );

  res
    .status(statusCode)
    .cookie("token", token, {
      // httpOnly: true,
      maxAge: eval(process.env.COOKIE_AGE),
      // sameSite: process.env.NODE_ENV === "Developement" ? "lax" : "none",
      sameSite: "none",
      secure: process.env.NODE_ENV === "Developement" ? false : true,
      secure: false,
    })
    .json({
      success: true,
      message,
    });
};

export class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const catchAsyncError = (passedFunc) => {
  return (req, res, next) => {
    Promise.resolve(passedFunc(req, res, next)).catch(next);
  };
};
