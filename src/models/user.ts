import { Document, Schema, model } from 'mongoose';
import { Preferences } from '../enums/preferencesInterface.js';



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
    enum: Object.values(Preferences),
    required: true,
  },
  // trainingStatistics: {
  //   type: Object,
  //   validate: {
  //     validator: function(val: TrainingStatisticsInterface) {
  //       const isWeekValid = val.week && typeof val.week.km === "number" && typeof val.week.elevationGain === "number";
  //       const isMonthValid = val.month && typeof val.month.km === "number" && typeof val.month.elevationGain === "number";
  //       const isYearValid = val.year && typeof val.year.km === "number" && typeof val.year.elevationGain === "number";
  //       return isWeekValid && isMonthValid && isYearValid;
  //     },
  //     message: props => `Invalid training statistics: ${JSON.stringify(props.value)}`
  //   },
  //   required: true,
  // },  
});

export const User = model<UserDocumentInterface>('User', userSchema);