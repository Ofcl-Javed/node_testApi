import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import {
  ErrorHandler,
  catchAsyncError,
  sendCookie,
} from "../utils/features.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    return next(new ErrorHandler("user already exist", 400));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const createdUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  sendCookie(createdUser, res, "User registered Successfully", 201);
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }

  sendCookie(user, res, `Welcome back ${user.name}`);
});

export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Developement" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Developement" ? false : true,
    })
    .json({
      success: true,
      message: "user logout successfully",
    });
};
