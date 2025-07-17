import CustomBarChart from './BarChart';
import DonutChart from './DonutChart';
import CustomLineChart from './LineChart';
import StackedBarChart from './StackedBarChart';
import RadialChart from './RadialChart';
import ComboChart from './ComboChart';

const ChartRenderer = ({ type, ...props }) => {
  switch (type) {
    case "bar":
      return <CustomBarChart {...props} />;
    case "donut":
      return <DonutChart {...props} />;
    case "line":
      return <CustomLineChart {...props} />;
    case "stackedBar":
      return <StackedBarChart {...props} />;
    case "radial":
      return <RadialChart {...props} />;
    case "combo":
      return <ComboChart {...props} />;
    default:
      return <div>Type de graphique non reconnu</div>;
  }
};

export default ChartRenderer;
