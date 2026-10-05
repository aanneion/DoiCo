export default function Divider() {
  return (
    <div className="flex items-center justify-center py-2 px-4">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-clay-200 to-transparent" />
      <span className="mx-4 text-clay-300 text-lg">✦</span>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-clay-200 to-transparent" />
    </div>
  );
}
