// models/Program.ts
import { Schema, model, models } from "mongoose";

const ProgramSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: String,
    description: String,
    image: {
      url: { type: String, required: true },
      alt: String,
      position: Number,
    },
    features: [String],
    type: {
      type: String,
      enum: ["main", "additional"],
      default: "main",
    },
    icon: String,
    color: String,
  },
  {
    timestamps: true,
  }
);

// Hot-reload safe export for Next.js
const Program = models.Program || model("Program", ProgramSchema);

export default Program;
