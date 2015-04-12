import React from "react";

export default class Item extends React.Component {

  constructor (props) {
    super(props);
  }

  x (x) {
    const {
      width,
      styles
    } = this.props;
    const padding = styles.curvePadding;
    return padding + x * (width-2*padding);
  }

  y (y) {
    const {
      height,
      styles
    } = this.props;
    const padding = styles.curvePadding;
    return padding + (1 - y) * (height-2*padding);
  }

  render () {
    const {
      x,
      y,
      width,
      height,
      value,
      name,
      onClick,
      onMouseEnter,
      onMouseLeave,
      styles
    } = this.props;

    const {
      rectColor,
      rectBorderRadius,
      curveColor,
      curveWidth,
      curveDotSize,
      handleColor,
      handleWidth,
      handleDotSize,
      displayName,
      nameColor,
      nameSize,
      nameFamily,
      nameYPercent,
      namePadding
    } = styles;

    const sx = this.x(0);
    const sy = this.y(0);
    const ex = this.x(1);
    const ey = this.y(1);
    const cx1 = this.x(value[0]);
    const cy1 = this.y(value[1]);
    const cx2 = this.x(value[2]);
    const cy2 = this.y(value[3]);

    const curve = [
      "M"+[sx,sy],
      "C"+[cx1,cy1],
      ""+[cx2,cy2],
      ""+[ex,ey]
    ].join(" ");

    const style = {
      cursor: "pointer",
      userSelect: "none",
      WebkitUserSelect: "none"
    };

    return <g
      style={style}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      transform={"translate("+x+","+y+")"}>

      <rect
        fill={rectColor}
        x={0}
        y={0}
        width={width}
        height={height}
        rx={rectBorderRadius}
        ry={rectBorderRadius} />

      { displayName ?
      <text
        x={width/2}
        y={namePadding+Math.floor((height-2*namePadding) * nameYPercent)}
        style={{
          fontFamily: nameFamily,
          fontSize: nameSize,
          textAnchor: "middle",
          fill: nameColor
        }}
      >{name}</text>
      : undefined }

      <line
        stroke={handleColor}
        strokeWidth={handleWidth}
        x1={sx}
        x2={cx1}
        y1={sy}
        y2={cy1} />
      <line
        stroke={handleColor}
        strokeWidth={handleWidth}
        x1={ex}
        x2={cx2}
        y1={ey}
        y2={cy2} />
      <circle
        fill={handleColor}
        cx={cx1}
        cy={cy1}
        r={handleDotSize} />
      <circle
        fill={handleColor}
        cx={cx2}
        cy={cy2}
        r={handleDotSize} />

      <path
      fill="none"
      stroke={curveColor}
      strokeWidth={curveWidth}
      d={curve} />

      <circle
        fill={curveColor}
        cx={sx}
        cy={sy}
        r={curveDotSize} />
      <circle
        fill={curveColor}
        cx={ex}
        cy={ey}
        r={curveDotSize} />

    </g>;
  }
}
