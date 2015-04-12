import React from "react";
import Item from "./Item";
import objectAssign from "object-assign";

const PropTypes = React.PropTypes;
const BezierParameter = PropTypes.arrayOf(PropTypes.number);
const ItemStyles = PropTypes.shape({
  rectColor: PropTypes.string,
  rectBorderRadius: PropTypes.number,
  curveColor: PropTypes.string,
  curveWidth: PropTypes.number,
  curveDotSize: PropTypes.number,
  curvePadding: PropTypes.number,
  handleColor: PropTypes.string,
  handleWidth: PropTypes.number,
  handleDotSize: PropTypes.number,
  displayName: PropTypes.bool,
  nameColor: PropTypes.string,
  nameSize: PropTypes.string,
  nameFamily: PropTypes.string,
  nameYPercent: PropTypes.number,
  namePadding: PropTypes.number
});
const propTypes = {
  value: BezierParameter,
  onChange: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.shape({
    value: BezierParameter.isRequired,
    name: PropTypes.string
  })),
  itemsPerRow: PropTypes.number,
  style: PropTypes.object,
  interMargin: PropTypes.number,
  itemStyles: ItemStyles,
  hoverItemStyles: ItemStyles,
  selectedItemStyles: ItemStyles
};

const defaultProps = {
  items: [
    { value: [0.0, 0.0, 1.0, 1.0], name: "linear" },
    { value: [0.25, 0.1, 0.25, 1.0], name: "ease" },
    { value: [0.42, 0.0, 1.0, 1.0], name: "ease-in" },
    { value: [0.42, 0.0, 0.58, 1.0], name: "ease-in-out" },
    { value: [0.0, 0.0, 0.58, 1.0], name: "ease-out" }
  ],
  width: 300,
  height: 60,
  itemsPerRow: 5,
  style: {},
  interMargin: 4,
  itemStyles: {
    rectColor: "#eee",
    rectBorderRadius: 4,
    curveColor: "#0af",
    curveWidth: 2,
    curveDotSize: 4,
    curvePadding: 6,
    handleColor: "#ddd",
    handleWidth: 1,
    handleDotSize: 2,
    displayName: true,
    nameColor: "#bbb",
    nameSize: "10px",
    nameFamily: "sans-serif",
    nameYPercent: 1,
    namePadding: 4
  },
  hoverItemStyles: {
    rectColor: "#ddd",
    handleColor: "#ccc",
    curveColor: "#09e",
    nameColor: "#09e"
  },
  selectedItemStyles: {
    rectColor: "#4CF",
    handleColor: "rgba(255,255,255,0.3)",
    curveColor: "#fff",
    nameColor: "#fff"
  }
};

function sameValue (a, b) {
  if (!a || !b) {
    return a===b;
  }
  return a[0]===b[0] && a[1]===b[1] && a[2]===b[2] && a[3]===b[3];
}

export default class BezierEasingPicker extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      hover: null
    };
  }

  onItemHoverEnter (hover) {
    this.setState({ hover });
  }

  onItemHoverLeave () {
    this.setState({ hover: null });
  }

  onItemClick (value, e) {
    e.preventDefault();
    this.props.onChange(value);
  }

  render () {
    const {
      value,
      items,
      width,
      height,
      itemsPerRow,
      style,
      interMargin,
      itemStyles,
      hoverItemStyles,
      selectedItemStyles
    } = this.props;

    const {
      hover
    } = this.state;

    const len = items.length;

    if (len === 0) {
      return <svg style={style} width={width} height={height}></svg>;
    }

    const nbRows = Math.ceil(len / itemsPerRow);
    const w = Math.floor((width - (itemsPerRow-1)*interMargin) / itemsPerRow);
    const h = Math.floor((height - (nbRows-1)*interMargin) / nbRows);

    const nodes = items.map(function (item, i) {
      const x = (w + interMargin) * (i % itemsPerRow);
      const y = (h + interMargin) * Math.floor(i / itemsPerRow);
      const selected = sameValue(item.value, value);
      const hovered = hover && sameValue(item.value, hover);
      const defaultOverrides = [defaultProps.itemStyles];
      const userOverrides = [itemStyles];
      if (hovered) {
        defaultOverrides.push(defaultProps.hoverItemStyles);
        userOverrides.push(hoverItemStyles);
      }
      if (selected) {
        defaultOverrides.push(defaultProps.selectedItemStyles);
        userOverrides.push(selectedItemStyles);
      }
      const styles = objectAssign.apply(null, [{}].concat(defaultOverrides).concat(userOverrides));
      return <Item
        key={i}
        x={x}
        y={y}
        width={w}
        height={h}
        padding={4}
        value={item.value}
        name={item.name}
        styles={styles}
        onClick={this.onItemClick.bind(this, item.value)}
        onMouseEnter={this.onItemHoverEnter.bind(this, item.value)}
        onMouseLeave={this.onItemHoverLeave.bind(this)}
      />;
    }, this);

    return <svg style={style} width={width} height={height}>
      {nodes}
    </svg>;
  }
}

BezierEasingPicker.propTypes = propTypes;
BezierEasingPicker.defaultProps = defaultProps;
