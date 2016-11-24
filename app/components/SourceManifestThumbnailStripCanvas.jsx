var React = require('react');
var {connect} = require('react-redux');
import LazyLoad from 'react-lazy-load';

var SourceManifestThumbnailStripCanvas = React.createClass({
  getMainImage: function(canvas) {
    return canvas.getImages().length > 0 ? canvas.getThumbUri('', '100') : 'https://placeholdit.imgix.net/~text?txtsize=20&txt=Empty+Canvas&w=75&h=100';
  },
  getMainImageLabel: function(canvas) {
    return canvas !== null ? canvas.getLabel() : 'Empty canvas';
  },
  stringTruncate: function(str, maxLength) {
    return str.length > maxLength ? str.substring(0, maxLength - 1) + '…' : str;
  },
  setSelectedClass: function() {
    return this.props.isSelectedCanvas ? "selected-canvas" : "";
  },
  handleCanvasClick: function(e) {
    if(e.shiftKey) {
      // on shift click, set the end index for the range of selected canvases in the sequence viewer
      this.props.onCanvasShiftClick(this.props.canvasIndex);
    } else {
      // on normal click, set the start index for the range of selected canvases in the sequence viewer
      this.props.onCanvasNormalClick(this.props.canvasIndex);
    }
  },
  render: function() {
    var canvas = this.props.canvas;
    var backgroundStyle = this.props.isSelectedCanvas ? {} : { background: 'transparent url(./img/loading-small.gif) no-repeat center center' };
    return (
      <div style={backgroundStyle} className="source-manifest-thumbnail-strip-canvas" onClick={this.handleCanvasClick}>
        <LazyLoad offsetHorizontal={600}>
          <img className={this.setSelectedClass()} data-canvas-index={this.props.canvasIndex} src={this.getMainImage(canvas)} alt={this.getMainImageLabel(canvas)} height="100" />
        </LazyLoad>  
        <div className="canvas-label" title={this.getMainImageLabel(canvas)}>
          <span>{this.stringTruncate(this.getMainImageLabel(canvas), 20)}</span>
        </div>
      </div>
    );
  }
});

module.exports = connect()(SourceManifestThumbnailStripCanvas);
