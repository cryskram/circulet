const LoadingItem = () => {
  return (
    <div className="mx-auto grid max-w-5xl gap-10 px-6 py-10 md:grid-cols-2">
      <div className="aspect-square animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700" />

      <div className="space-y-4">
        <div className="h-6 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-20 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-10 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
      </div>
    </div>
  );
};

export default LoadingItem;
