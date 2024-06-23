import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { promisify } from "util";
import bcrypt from "bcrypt";
import User from "@/db/models/user";
import { Op } from "sequelize";

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
      session: true,
    },
    async (req, username, password, done) => {
      try {
        const user = await User.findOne({
          where: {
            [Op.or]: [{ email: username }, { username: username }],
          },
        });
        if (!user) {
          return done(null, false, { message: "Invalid credentials." });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          return done(null, false, { message: "Invalid credentials." });
        }
        done(null, {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
        });
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user?.toJSON());
  } catch (err) {
    done(err);
  }
});

export const passportInitialize = passport.initialize();
export const passportSession = passport.session();
export const passportAuth = promisify(passport.authenticate("local"));

export default passport;
