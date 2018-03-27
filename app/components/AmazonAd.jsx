import React, { Component } from 'react'
import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'

class AmazonAd extends Component {
  constructor(props) {
    super(props);

    this.loadJS = this.loadJS.bind(this);
    this.amazoneScript = this.amazoneScript.bind(this);
  }

  loadJS() {
    let script = document.createElement("script");
    script.src = "//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US";

    let div = document.getElementById('loadAmazonAd');

    let varScript = document.createElement("script");
    varScript.type  = "text/javascript";
    varScript.text = `
      amzn_assoc_placement = "adunit0";
      amzn_assoc_search_bar = "false";
      amzn_assoc_tracking_id = "";
      amzn_assoc_ad_mode = "search";
      amzn_assoc_ad_type = "smart";
      amzn_assoc_marketplace = "amazon";
      amzn_assoc_region = "US";
      amzn_assoc_title = "Shop Related Products";
      amzn_assoc_default_search_phrase = "Berserk Manga";
      amzn_assoc_default_category = "Books";
      amzn_assoc_linkid = "";
      amzn_assoc_default_browse_node = "283155";
      amzn_assoc_rows = "1";
    `;

    let test = document.createElement("script");
    test.type  = "text/javascript";
    test.text = `
      console.log('tesstttt');
    `;

    // div.appendChild(test);
    // div.appendChild(varScript);
    // div.appendChild(script);
    document.body.appendChild(varScript);
    document.body.appendChild(script);
  }

  // componentDidMount() {
  //   this.loadJS();
  // }

  componentDidUpdate() {
    this.loadJS();
  }

  amazoneScript() {
    return(`
    <div>
    <script type="text/javascript">
      amzn_assoc_placement = "adunit0";
      amzn_assoc_tracking_id = "";
      amzn_assoc_ad_mode = "search";
      amzn_assoc_ad_type = "smart";
      amzn_assoc_marketplace = "amazon";
      amzn_assoc_region = "US";
      amzn_assoc_title = "Shop Related Products";
      amzn_assoc_default_search_phrase = "Berserk Manga";
      amzn_assoc_default_category = "All";
      amzn_assoc_linkid = "";
      amzn_assoc_rows = "4";
      amzn_assoc_design = "text_links";
    </script>
    </div>
    `);
  }

  render() {
    return (
      <div id="loadAmazonAd">
        <div className="col-md-12">
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {};
}

// this works as well
function mapDispatchToProps(dispatch) {
  return {}
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
) (AmazonAd)
