import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { UserRole } from "src/utils/enums";

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: "users", timestamps: true })
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({ enum: UserRole, default: UserRole.KAZAKHTANI })
  role: UserRole;

  @Prop(raw({
    grammarPoints: { type: Number, default: 0 },
    readingPoints: { type: Number, default: 0 },
    speakingPoints: { type: Number, default: 0 }
  }))
  mainPoints: Record<string, any>;

  @Prop(raw({
    culturalPoints: { type: Number, default: 0 },
    socialPoints: { type: Number, default: 0 }
  }))
  otherPoints: Record<string, any>;

  
}

export const UserSchema = SchemaFactory.createForClass(User);