"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema } from "./components/schema";
import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectGroup,
  SelectLabel,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const OnboardingForm = ({ industries }) => {
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(onboardingSchema),
  });

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    router.push("/dashboard");
  };

  return (
    <div className="h-screen w-screen relative bg-gradient-to-b from-black to-gray-800">
      <Canvas className="absolute inset-0">
        <Suspense fallback={null}>
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={2} />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
        </Suspense>
      </Canvas>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-2xl px-8">
        <Card className="w-full bg-gray-800 border border-gray-700 shadow-2xl rounded-3xl p-6 backdrop-blur-lg bg-opacity-70 transition-transform duration-300 hover:scale-105 hover:shadow-purple-500/50"> {/* Adjusted padding */}
          <CardHeader>
            <CardTitle className="text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Let us Know More about You
            </CardTitle>
            <CardDescription className="text-gray-300">
              Select your industry to receive personalized career insights and recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <SelectGroup>
                  <SelectLabel className="text-white text-lg font-semibold">Industry</SelectLabel>
                  <Select onValueChange={(value) => setValue("industry", value)}>
                    <SelectTrigger className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg shadow-md focus:ring-2 focus:ring-purple-500">
                      <SelectValue placeholder="Select Industry" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 text-white border border-gray-700">
                      <SelectItem value="tech">Technology</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </SelectGroup>
                {errors.industry && (
                  <p className="text-sm text-red-400">{errors.industry.message}</p>
                )}
              </div>
              
              <div className="space-y-6">
                <SelectGroup>
                  <SelectLabel className="text-white text-lg font-semibold">Sub Industry</SelectLabel>
                  <Select onValueChange={(value) => setValue("subIndustry", value)}>
                    <SelectTrigger className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg shadow-md focus:ring-2 focus:ring-purple-500">
                      <SelectValue placeholder="Select Sub Industry" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 text-white border border-gray-700">
                      <SelectItem value="software">Software</SelectItem>
                      <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                      <SelectItem value="fintech">Fintech</SelectItem>
                      <SelectItem value="biotech">Biotech</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </SelectGroup>
                {errors.subIndustry && (
                  <p className="text-sm text-red-400">{errors.subIndustry.message}</p>
                )}
              </div>

              {/* Experience Input Field */}
              <div className="space-y-6">
                <label className="text-white text-lg font-semibold">Experience (0-60 months)</label>
                <input
                  type="number"
                  min="0"
                  max="60"
                  {...register("experience", { required: "Experience is required", min: { value: 0, message: "Minimum value is 0" }, max: { value: 60, message: "Maximum value is 60" } })}
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg shadow-md px-4 py-2 focus:ring-2 focus:ring-purple-500"
                />
                {errors.experience && (
                  <p className="text-sm text-red-400">{errors.experience.message}</p>
                )}
              </div>

              {/* Skills Input Field */}
              <div className="space-y-6">
                <label className="text-white text-lg font-semibold">Skills (separated by commas)</label>
                <input
                  type="text"
                  {...register("skills", { required: "Skills are required" })}
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg shadow-md px-4 py-2 focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g. JavaScript, React, Node.js"
                />
                {errors.skills && (
                  <p className="text-sm text-red-400">{errors.skills.message}</p>
                )}
              </div>

              {/* Professional Bio Input Field */}
              <div className="space-y-6">
                <label className="text-white text-lg font-semibold">Professional Bio</label>
                <textarea
                  {...register("bio", { required: "Bio is required" })}
                  className="w-full h-28 bg-gray-700 border border-gray-600 text-white rounded-lg shadow-md px-4 py-2 focus:ring-2 focus:ring-purple-500" // Adjusted height
                  placeholder="Write your professional bio here..."
                />
                {errors.bio && (
                  <p className="text-sm text-red-400">{errors.bio.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300">
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingForm;