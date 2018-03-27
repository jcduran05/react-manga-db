import { Component } from "React";
import { connect } from "react-redux";

function Decorate(ComponentToDecorate) {
  class ComponentDecorated extends Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      // fetch data and stuff
    }

    render() {
      return <ComponentToDecorate {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      // your shared props
    };
  }

  const mapDispatchToProps = {
    // your shared action call
  };

  return connect(mapStateToProps, mapDispatchToProps)(ComponentDecorated);
}

export default Decorate;
