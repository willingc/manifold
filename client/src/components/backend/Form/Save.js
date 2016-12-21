import React, { Component, PropTypes } from 'react';
import { Form } from 'components/backend';

export default class Save extends Component {

  static displayName = "Form.Save";

  static defaultProps = {
    text: 'Save'
  };

  static propTypes = {
    text: PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="form-input">
        <input className="button-secondary outlined" type="submit" value={this.props.text} />
      </div>
    );
  }
}
