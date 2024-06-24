import Graph from "../components/Graph";

export default function Home(): React.JSX.Element {
  return (
    <>
      <div className="flex flex-col justify-between h-full gap-2 w-full">
        {/* GRAPH */}
        <Graph />
      </div>
    </>
  );
}
