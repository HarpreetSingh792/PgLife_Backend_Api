import jwt from "jsonwebtoken";

export const jwtToken = (user, res, statusCode = 200, message) => {
  const token = jwt.sign({ _id: user}, process.env.JWT_SECRET);
  res
    .status(statusCode)
    .cookie("token", token, {
      maxAge: (15 * 60 * 100000),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    })
    .json({ success: true, message });
};
