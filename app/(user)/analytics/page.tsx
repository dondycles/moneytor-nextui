import { BsFillPieChartFill, BsBarChartFill } from "react-icons/bs";
export default function Analytics() {
  return (
    <div className="flex-1  w-full p-4 rounded-l-xl max-h-full h-full overflow-y-auto overflow-x-hidden flex justify-center items-center flex-col text-xs gap-2">
      <header className="flex flex-col gap-2">
        <p className="w-fit flex items-center gap-2">
          The Analytics Page is still under development
        </p>
        <p>
          This would include graphical analysis about the movement of your
          money.
        </p>
      </header>
      <footer className="flex flex-row text-2xl gap-2">
        <BsBarChartFill />
        <BsFillPieChartFill />
      </footer>
    </div>
  );
}
