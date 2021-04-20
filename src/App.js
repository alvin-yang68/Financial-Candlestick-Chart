import { StockChart } from './charts/StockChart'

function App() {
  const chartSpecs = {
    totalWidth: 1200,
    totalHeight: 750,
    seperationRatio: 0.8,
    mainChartSpecs: {
      margin: { top: 20, right: 80, bottom: 40, left: 80 }
    },
    brushSpecs: {
      brushSize: 130,
      margin: { top: 20, right: 80, bottom: 40, left: 80 },
      yAxisNumTicks: 5
    }
  }
  return (
    <>
      <StockChart specs={chartSpecs} />
    </>
  );
}

export default App;
