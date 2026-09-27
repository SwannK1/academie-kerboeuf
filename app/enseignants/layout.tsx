import { TrackTool } from "@/components/workspace/TrackTool";

export default function EnseignantsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TrackTool />
      {children}
    </>
  );
}
