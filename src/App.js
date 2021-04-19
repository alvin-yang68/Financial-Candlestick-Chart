import { StockChart } from './charts/StockChart'

function App() {
  const chartSpecs = {
    totalWidth: 1200,
    totalHeight: 750,
    seperationRatio: 0.8,
    brushSpecs: {
      brushSize: 130,
      margin: { top: 20, right: 80, bottom: 40, left: 80 },
      yAxisNumTicks: 5,
      yAxisLabelOffset: 60
    },
    candlestickSpecs: {
      margin: { top: 20, right: 80, bottom: 40, left: 80 },
      yAxisLabelOffset: 60
    }
  }
  return (
    <>
      <StockChart specs={chartSpecs} />
    </>
  );
}

export default App;
