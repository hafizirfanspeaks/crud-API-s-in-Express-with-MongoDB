import mongoose, { Document } from "mongoose";

// ✅ TypeScript interface
export interface IUser extends Document {
  name: string;
  email: string;
  address: string;
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  }
});

export default mongoose.model<IUser>("User", userSchema);
