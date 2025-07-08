import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setError,
  setLoading,
  setRecommendations,
} from "../store/recommendation-slice";

const InputForm: React.FC = () => {
  const [inputType, setInputType] = useState<"dropdown" | "text">("dropdown");
  const [painArea, setPainArea] = useState<string>("");
  const [intensity, setIntensity] = useState<number>(5);
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setLoading());

    try {
      const response = await axios.post("http://localhost:5000/api/recommend", {
        pain_area: painArea.trim(),
        intensity,
      });
      dispatch(setRecommendations(response.data));
    } catch (error: any) {
      dispatch(
        setError(
          error.response?.data?.error || "Failed to connect to the server."
        )
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Pain Area Input Method
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="dropdown"
              checked={inputType === "dropdown"}
              onChange={() => {
                setInputType("dropdown");
                setPainArea("");
              }}
              className="mr-2"
            />
            Select from Dropdown
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="text"
              checked={inputType === "text"}
              onChange={() => {
                setInputType("text");
                setPainArea("");
              }}
              className="mr-2"
            />
            Enter Custom
          </label>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Pain Area
        </label>
        {inputType === "dropdown" ? (
          <select
            value={painArea}
            onChange={(e) => setPainArea(e.target.value)}
            className="mt-1 block w-full p-2 border rounded-md"
            required
          >
            <option value="">Select Pain Area</option>
            <option value="neck_pain">Neck Pain</option>
            <option value="back_pain">Back Pain</option>
            <option value="shoulder_pain">Shoulder Pain</option>
          </select>
        ) : (
          <input
            type="text"
            value={painArea}
            onChange={(e) => setPainArea(e.target.value)}
            placeholder="Enter pain area (e.g., lower back pain)"
            className="mt-1 block w-full p-2 border rounded-md"
            required
          />
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Pain Intensity (1-10)
        </label>
        <input
          type="number"
          min="1"
          max="10"
          value={intensity}
          onChange={(e) => setIntensity(Number(e.target.value))}
          className="mt-1 block w-full p-2 border rounded-md"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        Get Recommendations
      </button>
    </form>
  );
};

export default InputForm;
