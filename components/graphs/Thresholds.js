import React from "react";
import { Group } from "@vx/group";
import { curveBasis } from "@vx/curve";
import { LinePath } from "@vx/shape";
import { scaleTime, scaleLinear, scaleOrdinal } from "@vx/scale";
import { AxisLeft, AxisBottom } from "@vx/axis";
import { GridRows, GridColumns } from '@vx/grid';
import { LegendOrdinal } from "@vx/legend";
import { timeParse } from "d3-time-format";

const parseDate = timeParse("%Y%m%d");
// accessors
const date = d => parseDate(d.date);
const cn_fhl = d => d["CN_FHL"];
const via_fhl = d => d["VIA_FHL"];

export default class Thresholds extends React.Component {
  state = {
    key: "none",
    cnCurrentWidth: 0,
    viaCurrentWidth: 0,
    cnInterval: [],
    viaInterval: []
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.frame.data.key !== this.state.key) {
      if (nextProps.frame.data.key === "cnfhl") {
        this.startCnFhl();
      } else if (this.props.frame.data.key === "all") {
        this.startViaFhl();
      }  
    }
  }

  startCnFhl = () => {
    console.log("display CnFhl");
    this.setState({
      key: "cnfhl",
      cnCurrentWidth: 0,
      cnInterval: setInterval(this.displayCnFhl, 100)
    });
  };

  startViaFhl = () => {
    console.log("display ViaFhl");
    this.setState({
      key: "all",
      viaCurrentWidth: 0,
      viaInterval: setInterval(this.displayViaFhl, 100)
    });
  };

  displayCnFhl = () => {
    let xMax = this.props.width * 0.5;
    if (this.state.cnCurrentWidth < xMax){
      let cnCurrentWidth = this.state.cnCurrentWidth + 10; 
      this.setState({ cnCurrentWidth });
    } else {
      clearInterval(this.state.cnInterval);
    } 
  }

  displayViaFhl = () => {
    let xMax = this.props.width * 0.5;
    if (this.state.viaCurrentWidth < xMax){
      let viaCurrentWidth = this.state.viaCurrentWidth + 10; 
      this.setState({ viaCurrentWidth });
    } else {
      clearInterval(this.state.viaInterval);
    } 
  }

  render() {
    const { width, height, events, percentage, frame } = this.props;
    let data1 = frame.data.cn_fhl,
      data2 = frame.data.via_fhl;

    const margin = { left: width / 4, top: height / 4, bottom: 10, right: 10 };
    if (width < 10) return null;

    // bounds
    const xMax = width * 0.7 - margin.left - margin.right;
    const yMax = height * 0.7 - margin.top - margin.bottom;

    // scales
    const xScale = scaleTime({
      range: [0, xMax],
      domain: [
        Math.min(...data1.concat(...data2).map(date)),
        Math.max(...data1.concat(...data2).map(date))
      ]
    });
    const yScale = scaleLinear({
      range: [yMax, 0],
      domain: [
        Math.min(
          ...data1.map(d => cn_fhl(d)).concat(...data2.map(d => via_fhl(d)))
        ),
        Math.max(
          ...data1.map(d => cn_fhl(d)).concat(...data2.map(d => via_fhl(d)))
        )
      ],
      nice: true
    });
    
    const zScale = scaleOrdinal({
      domain: ['GroupA', 'GroupB'],
      range: ['yellow', 'green']
    });

    return (
      <div>
        <svg width={width} height={height}>
          <clipPath id="cn_fhl_mask">
            <rect x={0} y={0} width={this.state.cnCurrentWidth} height={height} /> 
          </clipPath>
          <clipPath id="via_fhl_mask">
            <rect x={0} y={0} width={this.state.viaCurrentWidth} height={height} /> 
          </clipPath>
          <rect
            x={50}
            y={50}
            width={width * 0.8}
            height={height * 0.8}
            fill="rgb(255,255,255,0.5)"
            rx={14}
          />
          <Group left={margin.left} top={margin.top}>
            <GridRows scale={yScale} width={xMax} height={yMax} stroke="rgb(255,255,255,0.5)" />
            <GridColumns scale={xScale} width={xMax} height={yMax} stroke="rgb(255,255,255,0.5)" />
            <AxisBottom
              top={yMax}
              scale={xScale}
              numTicks={width > 520 ? 10 : 5}
              label="Year"
              labelProps={{ fontFamily: 'Arial', fontSize: 15, fill: 'black', textAnchor: 'middle' }}
              tickValues={frame.data.data}
              tickLabelProps= {
                (val, i) => ({ fontSize: 12, fill: 'black', textAnchor: 'middle'})
              }
            />
            <AxisLeft 
              scale={yScale}
              label="Scale"
              labelProps={{ fontFamily: 'Arial', fontSize: 15, fill: 'black', textAnchor: 'middle' }}
            />
            <LinePath
              data={data1}
              curve={curveBasis}
              x={date}
              y={cn_fhl}
              xScale={xScale}
              yScale={yScale}
              stroke="yellow"
              strokeWidth={4}
              clipPath="url(#cn_fhl_mask)"
            />
            <LinePath
              data={data2}
              curve={curveBasis}
              x={date}
              y={via_fhl}
              xScale={xScale}
              yScale={yScale}
              stroke="green"
              strokeWidth={5}
              clipPath="url(#via_fhl_mask)"
            />
          </Group>
        </svg>        
        <div
          style={{
            position: "absolute",
            top: margin.top / 2 + 15,
            left: margin.left-50,
            width: "2000",
            display: "flex",
            justifyContent: "center",
            fontSize: "14px",
            color: "white"
          }}
        >
          <LegendOrdinal
            scale={zScale}
            direction="column"
            itemDirection="row"
            labelMargin="10px 4px 0 0"
          />
        </div>
      </div>
    );
  }
}
