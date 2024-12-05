import { BorderBeam } from "./components/ui/border-beam";

export default function App() {
  return (
    <div className="relative flex h-[100vh] w-full flex-col items-center justify-center overflow-hidden bg-background md:shadow-xl">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-6xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Nexmeet Coming Soon..
      </span>
      <BorderBeam size={250} duration={12} delay={9} />
    </div>
  );
}
