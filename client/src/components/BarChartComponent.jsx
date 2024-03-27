import { BarChart } from '@tremor/react';

const chartdata = [
  {
    name: 'Hoodies',
    'ventas': 200,
  },
  {
    name: 'T-Shirts',
    'ventas': 300,
  },
  {
    name: 'Sweaters',
    'ventas': 150,
  },
  {
    name: 'Jackets',
    'ventas': 100,
  },
  {
    name: 'Pants',
    'ventas': 50, 
  }
];

const dataFormatter = (number) =>
  Intl.NumberFormat('us').format(number).toString();

export function BarChartComponent() {
  return (
    <>
      <h3 className="text-lg font-medium">
        Categorias mas vendidas

      </h3>
      <BarChart
        className="mt-6"
        data={chartdata}
        index="name"
        categories={['ventas']}
        colors={['blue']}
        valueFormatter={dataFormatter}
        yAxisWidth={48}
      />
    </>
  );
}