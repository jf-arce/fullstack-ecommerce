import { AreaChartComponent } from "@/components/AreaChartComponent";
import { BarChartComponent } from "@/components/BarChartComponent";
import ContainerComponents from "@/components/ContainerComponents";
import { DonutChartComponent } from "@/components/DonutChartComponent";


export default function Dashboard() {
  return (
    <main className="flex-1">
        <div className="grid grid-cols-2 mx-auto p-10 gap-20 h-full">
            <div className="col-span-1">
                <ContainerComponents>
                    <BarChartComponent/>
                </ContainerComponents>
            </div>
            <div className="col-span-1">
                <ContainerComponents>
                    <AreaChartComponent/>      
                </ContainerComponents>
            </div>
            <div className="col-span-2">
                <ContainerComponents>
                    <DonutChartComponent/>
                </ContainerComponents>
            </div>
        </div>

    </main>
  )
}
