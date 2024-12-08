export const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pt-10 h-full">
      <div className="mx-auto max-w-2xl">{children}</div>
    </div>
  );
};
