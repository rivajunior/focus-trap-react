var React = require('react');
var focusTrap = require('focus-trap');

var PropTypes = React.PropTypes;

var FocusTrap = React.createClass({
  propTypes: {
    onDeactivate: PropTypes.func.isRequired,
    active: PropTypes.bool,
    className: PropTypes.string,
    id: PropTypes.string,
    initialFocus: PropTypes.string,
    tag: PropTypes.string,
    style: PropTypes.object,
  },

  getDefaultProps: function() {
    return {
      active: true,
      tag: 'div',
    };
  },

  componentDidMount: function() {
    if (this.props.active) {
      this.activateTrap();
    }
  },

  componentDidUpdate: function(prevProps) {
    if (prevProps.active && !this.props.active) {
      focusTrap.deactivate();
    } else if (!prevProps.active && this.props.active) {
      this.activateTrap();
    }
  },

  componentWillUnmount: function() {
    focusTrap.deactivate();
  },

  activateTrap: function() {
    focusTrap.activate(React.findDOMNode(this), {
      onDeactivate: this.props.onDeactivate,
      initialFocus: this.props.initialFocus,
    });
  },

  render: function() {
    return React.createElement(this.props.tag,
      {
        className: this.props.className,
        id: this.props.id,
        style: this.props.style,
      },
      this.props.children
    );
  },
});

module.exports = FocusTrap;