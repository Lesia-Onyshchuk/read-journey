import { Link } from "react-router-dom";

export default function WelcomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-6">
      <h1 className="text-3xl font-bold mb-4">📚 Read Journey</h1>
      <p className="text-lg text-gray-600 mb-8">
        Track your reading, discover new books and reach your goals!
      </p>

      <div className="flex gap-4">
        <Link
          to="/login"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition"
        >
          Log In
        </Link>
        <Link
          to="/register"
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg shadow hover:bg-gray-300 transition"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
