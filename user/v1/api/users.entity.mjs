import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new Schema(
  {
    userName: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
    // Only run this function if password was actually modified
    if (!this.isNew) return next();
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  
    next();
  });

userSchema.pre("findOneAndUpdate", async function (next) {
  if (!this._update.password) return next();

  const salt = await bcrypt.genSalt(10);
  this._update.password = await bcrypt.hash(this._update.password, salt);

  next();
});

userSchema.index({ email: 1 }, { unique: true });

const UserEntity = mongoose.model("User", userSchema);
UserEntity.ensureIndexes();

export default UserEntity;