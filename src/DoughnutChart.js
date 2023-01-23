

import React from 'react';
import { ChartDonutUtilization } from '@patternfly/react-charts';

export default function DoughnutCharts(props) {
 let value = props.value;
 let rem = 100-value;
 let title = String(value) + "%";
return(
  <div>
    <ChartDonutUtilization
    constrainToVisibleArea={true}
    data={{ x: 'percentage', y: value }}
    labels={({ datum }) => datum.x ? `${datum.x}: ${datum.y}%` : null}
    title={title}
    padAngle="0"
  />
  </div>
)
}