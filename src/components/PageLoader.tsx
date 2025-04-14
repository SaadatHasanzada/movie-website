const PageLoader = () => {
  return (
    <div className="flex flex-col items-center gap-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      <p className="text-sm text-gray-500">Loading...</p>
    </div>
  );
};

export default PageLoader;
