import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function PriceChart({ hotels }) {
  if (!hotels || hotels.length === 0) return null;

  const currency = hotels[0]?.currency || "USD";

  const data = {
    labels: hotels.map((h) =>
      h.name.length > 20 ? h.name.slice(0, 20) + "…" : h.name
    ),
    datasets: [
      {
        label: `Price (${currency})`,
        data: hotels.map((h) => Number(h.price)),
        yAxisID: "y",
        backgroundColor: "rgba(37, 99, 235, 0.6)",
      },
      {
        label: "Rating",
        data: hotels.map((h) => Number(h.rating || 0)),
        yAxisID: "y1",
        backgroundColor: "rgba(16, 185, 129, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
    scales: {
      y: { beginAtZero: true, position: "left" },
      y1: {
        beginAtZero: true,
        position: "right",
        grid: { drawOnChartArea: false },
      },
    },
  };

  return (
    <div
      className="mt-4"
      role="img"
      aria-label={`Bar chart comparing price and rating for ${hotels.length} hotels`}
    >
      <Bar data={data} options={options} />
    </div>
  );
}
