const jwt = require("jsonwebtoken");
const { RefreshToken } = require("../models/refreshToken");
const { User } = require('../models/user');

async function verify(req, res, next) {
  const token = req.header("Authorization").split(" ")[1];

  if (!token) {
    return res.status(401).send({ code: 'user/not_signed', message: 'Please Sign In' })
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, user) => {
    if (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).send({ code: 'user/jwt_expired', message: 'Access Token Expired' })
      } else {
        return res.status(401).send({ code: 'user/unauthorized', message: 'Access Token Expired' })
      }
    }
    req.user = user;
    next();
  });
}

async function verifyAdmin(req, res, next) {
  const userID = req.user._id;

  try {
    let user = await User.findById(userID);
    if(!user) {
      return res.status(404).send({ code: 'user/not_found', message: "User not Found" })
    }

    if (user.roleType === 0) {
      next();
    } else {
      return res.status(401).send({ code: 'user/not_admin', message: "You don't have Admin Privileges" })
    }
  } catch (err) {
    return res.send({ code: 'user/could_not_validate', message: 'Something Went Wrong While Checking Status' });
  }

}

// async function refreshTheTokens(refreshToken, req, res, next) {
//   let existingRT = await RefreshToken.findOne({ refreshToken: refreshToken });
//   if (!existingRT) return res.status(401).send({ message: 'Unauthorized' });

//   jwt.verify(
//     refreshToken,
//     process.env.REFRESH_TOKEN_SECRET,
//     async (err, user) => {
//       if (err) return console.log(err);

//       let existingUser = await User.findOne({ _id: user._id });

//       let tokens = await generateNewTokens(existingUser);
//       res.header('access_token', `Bearer ${tokens.newAccessToken}`);
//       res.header('uid', existingUser._id);
//       res.cookie('refresh_token', tokens.newRefreshToken, {
//         httpOnly: true,
//         secure: false
//       });
//       req.user = existingUser;
//       next();
//     }
//   );
// };

// async function generateNewTokens(existingUser) {
//   let generatedAccessToken = generateAccessToken(existingUser);
//   let generatedRefreshToken = generateRefreshToken(existingUser);

//   try {
//     RefreshToken.findOneAndDelete(
//       {
//         userID: existingUser._id,
//       },
//       function (err, docs) {
//         if (err) {
//           console.log(err, "[DELETE ERROR]");
//         }
//       }
//     );
//   } catch (err) {
//     return console.log(err, "[REFRESH TOKEN ERROR]");
//   }
//   let refreshToken = new RefreshToken();
//   refreshToken.userID = existingUser._id;
//   refreshToken.refreshToken = generatedRefreshToken;

//   await refreshToken.save().catch((err) => {
//     return console.log("[SOMETHING WITH SAVING RT]", err);
//   });

//   return {
//     newRefreshToken: refreshToken.refreshToken,
//     newAccessToken: generatedAccessToken
//   }
// }

function generateAccessToken(user) {
  return jwt.sign(
    { _id: user._id, username: user.username },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );
}

function generateRefreshToken(user) {
  return jwt.sign(
    { _id: user._id, },
    process.env.REFRESH_TOKEN_SECRET
  );
}

module.exports.verify = verify;
module.exports.verifyAdmin = verifyAdmin;
module.exports.generateAccessToken = generateAccessToken;
module.exports.generateRefreshToken = generateRefreshToken;