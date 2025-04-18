import { ChartAreaInteractive } from "../ChartAreaInteractive";
import { DataTable } from "../DataTable";
import { SectionCards } from "../SectionCards";
import { BarChartInteractive } from "../ui/bar-chart-interactive";
import { PieChartComponent } from "../ui/pie-chart";
import data from "./data.json";

const DashboardOverview = () => {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="grid grid-cols-1 gap-4 px-4 lg:grid-cols-12 lg:px-6">
            <div className="lg:col-span-4">
              <PieChartComponent />
            </div>
            <div className="lg:col-span-8">
              <BarChartInteractive />
            </div>
          </div>
          {/* <DataTable data={data} /> */}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
