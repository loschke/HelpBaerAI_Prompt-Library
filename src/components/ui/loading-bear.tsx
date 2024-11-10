export function LoadingBear({ message = "Lade..." }: { message?: string }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-6">
        <div className="text-6xl animate-bounce">🐻</div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"></div>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300">{message}</p>
      </div>
    </div>
  );
} 