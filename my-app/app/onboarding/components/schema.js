import { boolean, z } from "zod";

export const onboardingSchema = z.object({
    industry: z.string({
        required_error: " Please Select an Industry to Proceed "
    }),
    subIndustry: z.string({
        required_error: " Please Select an Industry to Proceed "
    }),
    bio: z.string().max(500).optional(),
    experience : z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(
        z
        .number()
        .min(0,"experience must be atleast 0 years")
        .max(60," experience cannot exceed more then 60 years")
    ),
    skills: z.string().transform((val) =>
    val
    ?val
    .split(",")
    .map((skill) =>skill.trim())
    .filter(Boolean)
      :undefined
    ),


});