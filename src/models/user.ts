import { Document, Schema, model } from 'mongoose';
import { Preferences } from '../enums/preferencesEnum.js';


export interface UserDocumentInterface extends Document {
  ID: string;
  name: string;
  mail: string;
  preferences: Preferences[];
}

const userSchema = new Schema<UserDocumentInterface>({
  ID: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  name: {
    type: String,
    required: false,
    trim: true,
  },  
  mail: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  preferences: {
    type: [String],
    validate : {
      validator : function(val: Preferences[]) {
        /// Check if the option is a valuen inside the enum
        if (!val.every((v) => Object.values(Preferences).includes(v))) {
          return false;
        }
        /// Check if the array is not empty
        return val.length > 0;
      },
      message: props => `Invalid preferences: ${JSON.stringify(props.value)}`
    },
    enum: Object.values(Preferences),
    required: true,
  },
});

export const User = model<UserDocumentInterface>('User', userSchema);