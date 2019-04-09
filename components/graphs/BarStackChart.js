import React from 'react';
import { BarStack } from '@vx/shape';
import { Grid } from '@vx/grid';
import { AxisBottom } from '@vx/axis';
import { scaleBand, scaleLinear, scaleOrdinal } from '@vx/scale';
import { withTooltip, Tooltip } from '@vx/tooltip';
import { LegendOrdinal } from '@vx/legend';
import { max } from 'd3-array';

class BarStackChart extends React.PureComponent {
  state = {
    key: 'none',
    data: this.props.data,
    startIndex: 1,
    defaultBarColor: [
      'rgb(0,0,0,0)',
      'rgb(0,0,0,0)',
      'rgb(0,0,0,0)',
      'rgb(0,0,0,0)',
    ],
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.frame.data.key !== this.state.key) {
      this.setState({
        key: nextProps.frame.data.key,
        barColor: this.state.defaultBarColor,
        startIndex: 1,
        interval: setInterval(this.displayItems, 300),
      });
    }
  }

  displayItems = () => {
    let startIndex = this.state.startIndex;


    const endIndex = this.props.frame.data.barColor.length;


    const barColor = [...this.props.frame.data.barColor];
    for (let i = startIndex; i < barColor.length; i++) {
      barColor[i] = 'rgba(0, 0, 0, 0)';
    }
    
    this.setState({ barColor });
    if (parseInt(startIndex) == parseInt(endIndex)) {
      clearInterval(this.state.interval);
      this.setState({ startIndex, interval: [] });
    } else {
      startIndex += 1;
      this.setState({ startIndex });
    }
  };

  render() {
    const {
      width,
      height,
      events = false,
      margin = {
        top: 40,
        left: width / 4,
      },
      tooltipOpen,
      tooltipLeft,
      tooltipTop,
      tooltipData,
      hideTooltip,
      showTooltip,
    } = this.props;
    const barColor = this.state.barColor;
    
    const data = this.props.frame.data.data;
    
    const keys = Object.keys(data[0]).filter(d => d !== 'category');
    
    const formatMoney = money =>
      money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // accessors
    const x = d => d.category;
    const y = d => d.value;

    const totals = data.reduce((ret, cur) => {
      const t = keys.reduce((dailyTotal, k) => {
        dailyTotal += +cur[k];
        return dailyTotal;
      }, 0);
      ret.push(t);
      return ret;
    }, []);
    
    if (width < 10) return null;
    // bounds
    const xMax = width * 0.5;
    const yMax = height - margin.top - 100;

    // scales
    const xScale = scaleBand({
      rangeRound: [0, xMax],
      domain: data.map(x),
      padding: 0.2,
      tickFormat: () => val => val,
    });
    const yScale = scaleLinear({
      rangeRound: [yMax, 0],
      nice: true,
      domain: [0, max(totals)],
    });

    const zScale = scaleOrdinal({
      domain: keys,
      range: barColor,
    });

    let tooltipTimeout;

    return (
      <div style={{ position: 'relative' }}>
        <svg width={width} height={height}>
          <rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill="rgb(0,0,0,0)"
            rx={14}
          />
          <Grid
            top={margin.top}
            left={margin.left}
            xScale={xScale}
            yScale={yScale}
            width={xMax}
            height={yMax}
            stroke="rgb(0,0,0,0.5)"
            strokeOpacity={0}
            xOffset={xScale.bandwidth() / 2}
          />
          <BarStack
            top={margin.top}
            left={margin.left}
            data={data}
            keys={keys}
            height={yMax}
            x={x}
            xScale={xScale}
            yScale={yScale}
            zScale={zScale}
            onClick={data => (event) => {
              if (!events) return;
              alert(`clicked: ${JSON.stringify(data)}`);
            }}
            onMouseLeave={data => (event) => {
              tooltipTimeout = setTimeout(() => {
                hideTooltip();
              }, 300);
            }}
            onMouseMove={data => (event) => {
              if (tooltipTimeout) clearTimeout(tooltipTimeout);
              const top = event.clientY - margin.top - data.height;
              const left = xScale(data.x)
                + data.width
                + (data.paddingInner * data.step) / 2;
              showTooltip({
                tooltipData: data,
                tooltipTop: top,
                tooltipLeft: left,
              });
            }}
          />
          <AxisBottom
            scale={xScale}
            top={yMax + margin.top}
            left={margin.left}
            stroke="#f9f900"
            tickStroke="#f9f900"
            tickLabelProps={(value, index) => ({
              fill: '#f9f900',
              fontSize: 18,
              textAnchor: 'middle',
            })}
          />
        </svg>
        <div
          style={{
            position: 'absolute',
            top: margin.top / 2 + 15,
            left: margin.left - 50,
            width: '2000',
            display: 'flex',
            justifyContent: 'center',
            fontSize: '14px',
            color: 'white',
          }}
        >
          <LegendOrdinal
            scale={zScale}
            direction="column"
            itemDirection="row"
            labelMargin="10px 4px 0 0"
          />
        </div>
        {tooltipOpen && (
          <Tooltip
            top={tooltipTop}
            left={tooltipLeft}
            style={{
              minWidth: 60,
              backgroundColor: 'rgba(0,0,0,0.9)',
              color: 'white',
            }}
          >
            <div>
              <small>{tooltipData.xFormatted}</small>
            </div>
            <div style={{ color: zScale(tooltipData.key) }}>
              <strong>{tooltipData.key}</strong>
            </div>
            <div>{formatMoney(tooltipData.data[tooltipData.key])}</div>
          </Tooltip>
        )}
      </div>
    );
  }
}

const BarStackChartWithTip = withTooltip(BarStackChart);

export default BarStackChartWithTip;
