require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"react-photo-gallery":[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactImages = require('react-images');

var _reactImages2 = _interopRequireDefault(_reactImages);

var Gallery = _react2['default'].createClass({
    displayName: 'Gallery',
    propTypes: {
        photos: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.shape({
            src: _react2['default'].PropTypes.string.isRequired,
            width: _react2['default'].PropTypes.number.isRequired,
            height: _react2['default'].PropTypes.number.isRequired,
            aspectRatio: _react2['default'].PropTypes.number.isRequired,
            lightboxImage: _react2['default'].PropTypes.object.isRequired
        })).isRequired
    },
    getInitialState: function getInitialState() {
        return {
            currentImage: 0,
            containerWidth: 0
        };
    },
    componentDidMount: function componentDidMount() {
        // add 15 pixels bc for unknown reason the clientWidth here is larger than what it really is
        this.setState({ containerWidth: Math.ceil(_reactDom2['default'].findDOMNode(this).clientWidth) });
        window.addEventListener('resize', this.handleResize);
    },
    handleResize: function handleResize(e) {
        this.setState({ containerWidth: _reactDom2['default'].findDOMNode(this).clientWidth });
    },
    openLightbox: function openLightbox(index, event) {
        event.preventDefault();
        this.setState({
            currentImage: index,
            lightboxIsOpen: true
        });
    },
    closeLightbox: function closeLightbox() {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false
        });
    },
    gotoPrevious: function gotoPrevious() {
        this.setState({
            currentImage: this.state.currentImage - 1
        });
    },
    gotoNext: function gotoNext() {
        this.setState({
            currentImage: this.state.currentImage + 1
        });
    },
    render: function render() {
        var rowLimit = 1,
            photoPreviewNodes = [];
        if (this.state.containerWidth >= 480) {
            rowLimit = 2;
        }
        if (this.state.containerWidth >= 1024) {
            rowLimit = 3;
        }
        console.log(this.state.containerWidth);
        var contWidth = this.state.containerWidth - rowLimit * 4; /* 4px for margin around each image*/
        console.log(contWidth);
        contWidth = Math.ceil(contWidth - 4); // subtract a couple pixels for unknown issue where line breaks in certain breakpoints.  this gives container some "padding"
        var lightboxImages = [];
        for (var i = 0; i < this.props.photos.length; i += rowLimit) {
            var rowItems = [];
            // loop thru each set of rowLimit num
            // eg. if rowLimit is 3 it will  loop thru 0,1,2, then 3,4,5 to perform calculations for the particular set
            var aspectRatio = 0,
                totalAr = 0,
                commonHeight = 0;
            for (var j = i; j < i + rowLimit; j++) {
                if (j == this.props.photos.length) {
                    break;
                }
                totalAr += this.props.photos[j].aspectRatio;
            }
            commonHeight = contWidth / totalAr;
            // run thru the same set of items again to give the common height
            for (var k = i; k < i + rowLimit; k++) {
                if (k == this.props.photos.length) {
                    break;
                }
                lightboxImages.push(this.props.photos[k].lightboxImage);
                var src = this.props.photos[k].src;
                photoPreviewNodes.push(_react2['default'].createElement(
                    'div',
                    { key: k, style: style },
                    _react2['default'].createElement(
                        'a',
                        { href: '#', className: k, onClick: this.openLightbox.bind(this, k) },
                        _react2['default'].createElement('img', { src: src, style: { display: 'block', border: 0 }, height: commonHeight, width: Math.floor(commonHeight * this.props.photos[k].aspectRatio), alt: '' })
                    )
                ));
            }
        }
        return _react2['default'].createElement(
            'div',
            { id: 'Gallery', className: 'clearfix' },
            photoPreviewNodes,
            _react2['default'].createElement(_reactImages2['default'], {
                currentImage: this.state.currentImage,
                images: lightboxImages,
                isOpen: this.state.lightboxIsOpen,
                onClose: this.closeLightbox,
                onClickPrev: this.gotoPrevious,
                onClickNext: this.gotoNext,
                width: 1600,
                height: 1600,
                styles: this.props.lightboxStyles
            })
        );
    }
});
// Gallery image style
var style = {
    display: 'block',
    margin: 2,
    backgroundColor: '#e3e3e3',
    float: 'left'
};

module.exports = Gallery;

},{"react":undefined,"react-dom":undefined,"react-images":undefined}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9yZWFjdC1jb21wb25lbnQtZ3VscC10YXNrcy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2hlbGVuaWEvcmVhY3QtcGhvdG8tZ2FsbGVyeS9zcmMvR2FsbGVyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7cUJDQWtCLE9BQU87Ozs7d0JBQ0osV0FBVzs7OzsyQkFDWCxjQUFjOzs7O0FBRW5DLElBQUksT0FBTyxHQUFHLG1CQUFNLFdBQVcsQ0FBQztBQUM1QixlQUFXLEVBQUUsU0FBUztBQUN0QixhQUFTLEVBQUM7QUFDTixjQUFNLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE9BQU8sQ0FDM0IsbUJBQU0sU0FBUyxDQUFDLEtBQUssQ0FBQztBQUNsQixlQUFHLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO0FBQ3RDLGlCQUFLLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO0FBQ3hDLGtCQUFNLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO0FBQ3pDLHVCQUFXLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO0FBQzlDLHlCQUFhLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO1NBQ25ELENBQUMsQ0FDTCxDQUFDLFVBQVU7S0FDZjtBQUNELG1CQUFlLEVBQUUsMkJBQVU7QUFDdkIsZUFBTztBQUNWLHdCQUFZLEVBQUUsQ0FBQztBQUNmLDBCQUFjLEVBQUUsQ0FBQztTQUNwQixDQUFBO0tBQ0c7QUFDRCxxQkFBaUIsRUFBRSw2QkFBVTs7QUFFaEMsWUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFTLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUMsRUFBQyxDQUFDLENBQUE7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LENBQUMsY0FBYyxBQUFDO0FBQ2xDLHVCQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsQUFBQztBQUMxQywyQkFBVyxFQUFFLElBQUksQ0FBQyxZQUFZLEFBQUM7QUFDL0IsMkJBQVcsRUFBRSxJQUFJLENBQUMsUUFBUSxBQUFDO0FBQ2IscUJBQUssRUFBRSxJQUFJLEFBQUM7QUFDWixzQkFBTSxFQUFFLElBQUksQUFBQztBQUNiLHNCQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEFBQUM7Y0FDcEM7U0FDQSxDQUNSO0tBQ0w7Q0FDSixDQUFDLENBQUM7O0FBRUgsSUFBTSxLQUFLLEdBQUc7QUFDWCxXQUFPLEVBQUUsT0FBTztBQUNoQixVQUFNLEVBQUUsQ0FBQztBQUNULG1CQUFlLEVBQUMsU0FBUztBQUN6QixTQUFLLEVBQUUsTUFBTTtDQUNmLENBQUE7O0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IExpZ2h0Ym94IGZyb20gJ3JlYWN0LWltYWdlcyc7XG5cbnZhciBHYWxsZXJ5ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGRpc3BsYXlOYW1lOiAnR2FsbGVyeScsXG4gICAgcHJvcFR5cGVzOntcbiAgICAgICAgcGhvdG9zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICAgICAgc3JjOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgd2lkdGg6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICBhc3BlY3RSYXRpbzogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIGxpZ2h0Ym94SW1hZ2U6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxuICAgICAgICAgICAgfSlcbiAgICAgICAgKS5pc1JlcXVpcmVkLFxuICAgIH0sXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4ge1xuXHQgICAgY3VycmVudEltYWdlOiAwLFxuXHQgICAgY29udGFpbmVyV2lkdGg6IDBcblx0fVxuICAgIH0sXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCl7XG5cdC8vIGFkZCAxNSBwaXhlbHMgYmMgZm9yIHVua25vd24gcmVhc29uIHRoZSBjbGllbnRXaWR0aCBoZXJlIGlzIGxhcmdlciB0aGFuIHdoYXQgaXQgcmVhbGx5IGlzXG5cdHRoaXMuc2V0U3RhdGUoe2NvbnRhaW5lcldpZHRoOiBNYXRoLmNlaWwoUmVhY3RET00uZmluZERPTU5vZGUodGhpcykuY2xpZW50V2lkdGgpfSlcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlUmVzaXplKTtcbiAgICB9LFxuICAgIGhhbmRsZVJlc2l6ZTogZnVuY3Rpb24oZSl7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2NvbnRhaW5lcldpZHRoOiBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKS5jbGllbnRXaWR0aH0pO1xuICAgIH0sXG4gICAgb3BlbkxpZ2h0Ym94IChpbmRleCwgZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG5cdCAgICBjdXJyZW50SW1hZ2U6IGluZGV4LFxuICAgICAgICAgICAgbGlnaHRib3hJc09wZW46IHRydWVcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBjbG9zZUxpZ2h0Ym94ICgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG5cdCAgICBjdXJyZW50SW1hZ2U6IDAsXG4gICAgICAgICAgICBsaWdodGJveElzT3BlbjogZmFsc2UsXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgZ290b1ByZXZpb3VzICgpIHtcblx0dGhpcy5zZXRTdGF0ZSh7XG5cdCAgICBjdXJyZW50SW1hZ2U6IHRoaXMuc3RhdGUuY3VycmVudEltYWdlIC0gMSxcblx0fSk7XG4gICAgfSxcbiAgICBnb3RvTmV4dCAoKSB7XG5cdHRoaXMuc2V0U3RhdGUoe1xuXHQgICAgY3VycmVudEltYWdlOiB0aGlzLnN0YXRlLmN1cnJlbnRJbWFnZSArIDEsXG5cdH0pO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgcm93TGltaXQgPSAxLFxuICAgICAgICAgICAgcGhvdG9QcmV2aWV3Tm9kZXMgPSBbXTtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuY29udGFpbmVyV2lkdGggPj0gNDgwKXtcbiAgICAgICAgICAgIHJvd0xpbWl0ID0gMjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jb250YWluZXJXaWR0aCA+PSAxMDI0KXtcbiAgICAgICAgICAgIHJvd0xpbWl0ID0gMztcbiAgICAgICAgfVxuXHRjb25zb2xlLmxvZyh0aGlzLnN0YXRlLmNvbnRhaW5lcldpZHRoKTtcbiAgICAgICAgdmFyIGNvbnRXaWR0aCA9IHRoaXMuc3RhdGUuY29udGFpbmVyV2lkdGggLSAocm93TGltaXQgKiA0KTsgLyogNHB4IGZvciBtYXJnaW4gYXJvdW5kIGVhY2ggaW1hZ2UqL1xuXHRjb25zb2xlLmxvZyhjb250V2lkdGgpO1xuICAgICAgICBjb250V2lkdGggPSBNYXRoLmNlaWwoY29udFdpZHRoIC0gNCk7IC8vIHN1YnRyYWN0IGEgY291cGxlIHBpeGVscyBmb3IgdW5rbm93biBpc3N1ZSB3aGVyZSBsaW5lIGJyZWFrcyBpbiBjZXJ0YWluIGJyZWFrcG9pbnRzLiAgdGhpcyBnaXZlcyBjb250YWluZXIgc29tZSBcInBhZGRpbmdcIlxuXHR2YXIgbGlnaHRib3hJbWFnZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaT0wO2k8dGhpcy5wcm9wcy5waG90b3MubGVuZ3RoO2krPXJvd0xpbWl0KXtcbiAgICAgICAgICAgIHZhciByb3dJdGVtcyA9IFtdO1xuICAgICAgICAgICAgLy8gbG9vcCB0aHJ1IGVhY2ggc2V0IG9mIHJvd0xpbWl0IG51bVxuICAgICAgICAgICAgLy8gZWcuIGlmIHJvd0xpbWl0IGlzIDMgaXQgd2lsbCAgbG9vcCB0aHJ1IDAsMSwyLCB0aGVuIDMsNCw1IHRvIHBlcmZvcm0gY2FsY3VsYXRpb25zIGZvciB0aGUgcGFydGljdWxhciBzZXRcbiAgICAgICAgICAgIHZhciBhc3BlY3RSYXRpbz0wLFxuICAgICAgICAgICAgICAgIHRvdGFsQXI9MCxcbiAgICAgICAgICAgICAgICBjb21tb25IZWlnaHQgPSAwO1xuICAgICAgICAgICAgZm9yICh2YXIgaj1pOyBqPGkrcm93TGltaXQ7IGorKyl7XG4gICAgICAgICAgICAgICAgaWYgKGogPT0gdGhpcy5wcm9wcy5waG90b3MubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXHRcdHRvdGFsQXIgKz0gdGhpcy5wcm9wcy5waG90b3Nbal0uYXNwZWN0UmF0aW87XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb21tb25IZWlnaHQgPSBjb250V2lkdGggLyB0b3RhbEFyO1xuICAgICAgICAgICAgLy8gcnVuIHRocnUgdGhlIHNhbWUgc2V0IG9mIGl0ZW1zIGFnYWluIHRvIGdpdmUgdGhlIGNvbW1vbiBoZWlnaHRcbiAgICAgICAgICAgIGZvciAodmFyIGs9aTsgazxpK3Jvd0xpbWl0OyBrKyspe1xuICAgICAgICAgICAgICAgIGlmIChrID09IHRoaXMucHJvcHMucGhvdG9zLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblx0XHRsaWdodGJveEltYWdlcy5wdXNoKHRoaXMucHJvcHMucGhvdG9zW2tdLmxpZ2h0Ym94SW1hZ2UpO1xuXHRcdHZhciBzcmMgPSB0aGlzLnByb3BzLnBob3Rvc1trXS5zcmM7XG4gICAgICAgICAgICAgICAgcGhvdG9QcmV2aWV3Tm9kZXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtrfSBzdHlsZT17c3R5bGV9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzc05hbWU9e2t9IG9uQ2xpY2s9e3RoaXMub3BlbkxpZ2h0Ym94LmJpbmQodGhpcywgayl9PjxpbWcgc3JjPXtzcmN9IHN0eWxlPXt7ZGlzcGxheTonYmxvY2snLCBib3JkZXI6MH19IGhlaWdodD17Y29tbW9uSGVpZ2h0fSB3aWR0aD17TWF0aC5mbG9vcihjb21tb25IZWlnaHQgKiB0aGlzLnByb3BzLnBob3Rvc1trXS5hc3BlY3RSYXRpbyl9IGFsdD1cIlwiIC8+PC9hPlxuICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXHRyZXR1cm4oXG4gICAgICAgICAgICA8ZGl2IGlkPVwiR2FsbGVyeVwiIGNsYXNzTmFtZT1cImNsZWFyZml4XCI+XG4gICAgICAgICAgICAgICAge3Bob3RvUHJldmlld05vZGVzfVxuICAgICAgICAgICAgICAgIDxMaWdodGJveFxuXHRcdCAgICBjdXJyZW50SW1hZ2U9e3RoaXMuc3RhdGUuY3VycmVudEltYWdlfVxuICAgICAgICAgICAgICAgICAgICBpbWFnZXM9e2xpZ2h0Ym94SW1hZ2VzfVxuICAgICAgICAgICAgICAgICAgICBpc09wZW49e3RoaXMuc3RhdGUubGlnaHRib3hJc09wZW59XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xvc2U9e3RoaXMuY2xvc2VMaWdodGJveH1cblx0XHQgICAgb25DbGlja1ByZXY9e3RoaXMuZ290b1ByZXZpb3VzfVxuXHRcdCAgICBvbkNsaWNrTmV4dD17dGhpcy5nb3RvTmV4dH1cbiAgICAgICAgICAgICAgICAgICAgd2lkdGg9ezE2MDB9XG4gICAgICAgICAgICAgICAgICAgIGhlaWdodD17MTYwMH1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGVzPXt0aGlzLnByb3BzLmxpZ2h0Ym94U3R5bGVzfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59KTtcbi8vIEdhbGxlcnkgaW1hZ2Ugc3R5bGVcbmNvbnN0IHN0eWxlID0ge1xuICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgIG1hcmdpbjogMixcbiAgIGJhY2tncm91bmRDb2xvcjonI2UzZTNlMycsXG4gICBmbG9hdDogJ2xlZnQnXG59XG5cbm1vZHVsZS5leHBvcnRzID0gR2FsbGVyeTtcbiJdfQ==
