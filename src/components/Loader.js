import { Ring } from "@uiball/loaders";

function Loader() {
  return (
    <div className="loader">
      {/* <DotWave size={65} color="#661F20" /> */}

      <Ring size={60} lineWeight={5} speed={2} color="black" />
    </div>
  );
}

export default Loader;
