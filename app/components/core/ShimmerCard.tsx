export default function ShimmerCard() {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm animate-pulse">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-8 w-8 rounded-full bg-gray-300" />
        <div className="h-4 w-24 bg-gray-300 rounded" />
      </div>
      <div className="h-5 w-3/4 bg-gray-300 rounded mb-2" />
      <div className="h-5 w-2/4 bg-gray-300 rounded mb-4" />
      <div className="h-4 w-full bg-gray-300 rounded mb-1" />
      <div className="h-4 w-5/6 bg-gray-300 rounded mb-1" />
      <div className="h-4 w-3/5 bg-gray-300 rounded" />
    </div>
  );
}
