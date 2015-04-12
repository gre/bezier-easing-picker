import React from "react/addons";
import BezierEasingPicker from "..";
import libPackage from "../package.json";

window.Perf = React.addons.Perf;

const linkStyle = {
  color: "#0af",
  textDecoration: "none"
};


class Example extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: [0,0,1,1]
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange (value) {
    this.setState({ value });
  }

  render() {
    const {
      value
    } = this.state;
    const style = {
      display: "block",
      marginBottom: "10px"
    };
    return <div>
      <h1><a href={libPackage.homepage} style={linkStyle}>{libPackage.name}</a></h1>
      <h2 style={{ color: "#aaa", fontWeight: "normal" }}>{libPackage.description}</h2>
      <blockquote>
      <strong>value</strong>{" = "}<code>{JSON.stringify(value)}</code>
      </blockquote>

      <BezierEasingPicker
        style={style}
        value={value}
        onChange={this.onChange}
      />

      <BezierEasingPicker
        width={500}
        height={100}
        style={style}
        value={value}
        onChange={this.onChange}
      />

      <BezierEasingPicker
        width={200}
        height={40}
        style={style}
        value={value}
        onChange={this.onChange}
        itemStyles={{
          displayName: false
        }}
      />


      <BezierEasingPicker
        width={40}
        height={200}
        itemsPerRow={1}
        style={style}
        value={value}
        onChange={this.onChange}
        interMargin={0}
        itemStyles={{
          rectBorderRadius: 0,
          curvePadding: 4,
          curveDotSize: 2,
          handleDotSize: 1,
          displayName: false
        }}
      />

      <p>
        <a style={linkStyle} target="_blank" href={libPackage.homepage+"/blob/master/example/index.js"}>Source code of these examples.</a>
      </p>
    </div>;
  }
}

document.body.style.padding = "0px 20px";
document.body.style.color = "#333";
document.body.style.background = "#fff";
document.body.style.fontFamily = "sans-serif";
React.render(<Example />, document.body);
