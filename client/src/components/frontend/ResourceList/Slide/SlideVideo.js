import React, { Component, PropTypes } from 'react';

export default class ResourceSlideFigureVideo extends Component {
  static propTypes = {
    resource: PropTypes.object
  };

  renderVideoByService(service, id) {
    let output = false;
    if (service === 'VIMEO') {
      output = (
        <iframe src={`//player.vimeo.com/video/${id}`}
          frameBorder="0"
          allowFullScreen
        >
        </iframe>
      );
    }
    if (service === 'YOUTUBE') {
      output = (
        <iframe id="ytplayer" type="text/html"
          src={`https://www.youtube.com/embed/${id}`}
          frameBorder="0"
          allowFullScreen
        >
        </iframe>
      );
    }
    return output;
  }

  render() {
    const resource = this.props.resource;

    return (
      <figure
        className="figure-video"
      >
        {this.renderVideoByService(
          resource.attributes.externalType,
          resource.attributes.externalId
        )}
      </figure>
    );
  }
}
