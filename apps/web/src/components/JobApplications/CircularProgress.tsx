import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircularProgress = ({ value }: { value: number }) => {
  const getColor = (value: number) => {
    if (value >= 80) return "#22c55e"; // Green
    if (value >= 60) return "#3b82f6"; // Blue
    return "#f59e0b"; // Orange
  };

  return (
    <div className="h-12 w-12">
      <CircularProgressbar
        value={value}
        text={`${value.toFixed(1)}%`}
        styles={buildStyles({
          pathColor: getColor(value),
          textColor: "#111827", // Dark gray
          trailColor: "#d1d5db", // Light gray
          backgroundColor: "transparent",
        })}
      />
    </div>
  );
};

export default CircularProgress;
