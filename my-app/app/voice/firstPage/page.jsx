"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function FirstName() {
  const [name, setName] = useState("");
  const [listening, setListening] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance("What is your first name?");
    synth.speak(utter);

    utter.onend = () => {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        alert("Your browser does not support Speech Recognition.");
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.start();
      setListening(true);

      recognition.onresult = (event) => {
        const spokenText = event.results[0][0].transcript;
        setName(spokenText);
        localStorage.setItem("firstName", spokenText);

        recognition.stop();
        setListening(false);

        setTimeout(() => {
          router.push("/voice/last-name");
        }, 1000);
      };

      recognition.onerror = (event) => {
        alert("Speech recognition error: " + event.error);
        setListening(false);
      };
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Voice Input: First Name</h1>
        <input
          className="w-full p-3 bg-gray-700 text-white rounded-md"
          value={name}
          placeholder={listening ? "Listening..." : "Waiting for input"}
          readOnly
        />
      </div>
    </div>
  );
}
