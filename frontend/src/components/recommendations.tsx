import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Recommendations: React.FC = () => {
  const { exercises, note, error, loading } = useSelector(
    (state: RootState) => state.recommendation
  );

  if (loading) {
    return <p className="mt-4 text-gray-600">Loading...</p>;
  }

  if (error) {
    return <p className="mt-4 text-red-500">{error}</p>;
  }

  if (!exercises.length) {
    return null;
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold">Recommended Exercises</h2>
      <p className="text-gray-600">{note}</p>
      <ul className="mt-2 space-y-4">
        {exercises.map((exercise, index) => (
          <li
            key={index}
            className="border p-4 rounded-md flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <div className="w-full sm:w-32 h-32 bg-gray-200 rounded-md flex items-center justify-center">
              <img
                src={exercise.image_url}
                alt={exercise.name}
                className="w-full h-full object-cover rounded-md"
                loading="lazy"
                width={300}
                height={300}
              />
            </div>
            <div>
              <h3 className="font-medium">{exercise.name}</h3>
              <p>{exercise.description}</p>
              <p className="text-sm text-gray-500">Reps: {exercise.reps}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;
