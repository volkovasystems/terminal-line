/*
	@module-documentation:
		Module terminalLine
			Options:
			1. hasInput - default false
			2. isInputOnly - default false
				disables hasOutput and isOutputOnly
			3. hasOutput - default true
			4. isOutputOnly - default true
				disables hasInput and isInputOnly

	@end-module-documentation

	@module-meta:
		{
			"name": "terminalLine",
			"description": "Terminal line emulator UI component.",
			"fileName": "terminalLine.js",
			"author": "Richeve S. Bebedor",
			"authorEmail": "richeve.bebedor@gmail.com",
			"authorGithubAccount": "https://github.com/volkovasystems",
			"moduleGithubRepository": "https://github.com/volkovasystems/terminal-line.git"
		}
	@end-module-meta

	@global-function-meta:
		{
			
		}
	@end-global-function-meta
	
*/
var terminalLine = function terminalLine( namespace, terminalEngine, container, optionSet ){
	/*
		@local-property-documentation:
			Local Property terminalLineComponentSet
				Cache all the terminal line components by unique namespace ID.
		@end-local-property-documentation
		
		@local-property-meta:
			{
				"name": "terminalLineComponentSet",
				"description": "Terminal line component set."
				"type": "object"
			}
		@end-local-property-meta
	*/
	var terminalLineComponentSet = terminalLine.terminalLineComponentSet || { };
	terminalLine.terminalLineComponentSet = terminalLineComponentSet;
	
	/*
		@local-property-documentation:
			Local Property absoluteHeight
				This is the fixed height for a single line. 
				I named this absolute height because this suggest that the height should never be change but is not strictly fixed. 
				Rare cases like accessibility features may change this absolute height.
		@end-local-property-documentation

		@local-property-meta:
			{
				"name": "absoluteHeight",
				"description": "Absolute height of a single line."
				"type": "number"
			}
		@end-local-property-meta
	*/
	var absoluteHeight = terminalLine.absoluteHeight || 20;
	terminalLine.absoluteHeight = absoluteHeight;
	
	/*
		@local-function-documentation:
			Local Function addStyleSet
				This is a helper function for setting multiple styles to an element.
		@end-local-function-documentation

		@local-function-meta: 
			{
				"name": "addStyleSet",
				"description": "Add style set to an element.",
				"type": "function",
				"parameterList": [
					{
						"name": "element",
						"description": "The element where you want to add styles."
						"type": "object",
						"class": "Element"
					},
					{
						"name": "styleSet",
						"description": "The set of styles and their corresponding values. This should follows CSS standard for styles.",
						"type": "object"
					}
				]
			}
		@end-local-function-meta
	*/
	var addStyleSet = terminalLine.addStyleSet ||
	function addStyleSet( element, styleSet ){
		if( !( element instanceof Element ) ){
			var error = new Error( "invalid element" );
			console.error( error );
			throw error;
		}
		
		if( typeof styleSet != "object" ){
			var error = new Error( "invalid style set" );
			console.error( error );
			throw error;
		}
		
		if( Object.keys( styleSet ).length == 0 ){
			var error = new Error( "emtpy style set" );
			console.error( error );
			throw error;
		}
		
		for( var styleName in styleSet ){
			element.style[ styleName ] = styleSet[ styleName ];
		}
	};
	terminalLine.addStyleSet = addStyleSet;

	/*
		@local-function-documentation:
			Local Function addAttributeSet

		@end-local-function-documentation
	*/
	var addAttributeSet = terminalLine.addAttributeSet || 
	function addAttributeSet( node, attributeSet ){
		if( !( node instanceof Node ) ){
			var error = new Error( "invalid node" );
			console.error( error );
			throw error;
		}
		
		if( typeof attributeSet != "object" ){
			var error = new Error( "invalid attribute set" );
			console.error( error );
			throw error;
		}
		
		if( Object.keys( attributeSet ).length == 0 ){
			var error = new Error( "empty attribute set" );
			console.error( error );
			throw error;
		}
		
		var attributeValue = null;
		for( var attribute in attributeSet ){
			attributeValue = attributeSet[ attribute ];
			node.setAttribute( attribute, attributeValue );
		}
	};
	terminalLine.addAttributeSet = addAttributeSet;

	/*
	*/
	var constructColor = terminalLine.constructColor ||
	function constructColor( red, green, blue, alpha ){
		if( typeof alpha == "number" ){
			return "rgba( " + [ red, green, blue, alpha ].join( ", " ) + " )";
		}else{
			return "rgb( " + [ red, green, blue ].join( ", " ) + " )";
		}
	};
	terminalLine.constructColor = constructColor;
	
	/*
	*/
	var constructOutputPane = terminalLine.constructOutputPane || 
	function constructOutputPane( ){
		var outputPane = document.createElement( "div" );
		
		addStyleSet( outputPane, {
			"overflow": "hidden",
			
			"position": "relative",
			
			"border": "0px",
			"margin": "0px",
			"padding": "0px",
			
			"width": "100%",
			"height": absoluteHeight + "px",
			
			"backgroundColor": constructColor( 255, 255, 255 ),
			
			"boxSizing": "border-box"
		} );
		
		this.componentSet.outputPane = outputPane;
		
		return outputPane;
	};
	terminalLine.constructOutputPane = constructOutputPane;
	
	/*
	*/
	var constructHeaderPane = terminalLine.constructHeaderPane ||
	function constructHeaderPane( ){
		var headerPane = document.createElement( "div" );
		
		addStyleSet( headerPane, {
			"display": "none",
			
			"position": "absolute",
			"top": "0px",
			"left": "0px",
			
			"zIndex": "1",
			
			"border": "0px",
			"margin": "0px",
			"padding": "0px",
			
			"width": "100%",
			"height": absoluteHeight  + "px",
			
			"backgroundColor": constructColor( 255, 0, 0 ),
			
			"boxSizing": "border-box"
		} );
		
		this.componentSet.headerPane = headerPane;
		
		return headerPane;
	};
	terminalLine.constructHeaderPane = constructHeaderPane;
	
	/*
	*/
	var constructBodyPane = terminalLine.constructBodyPane || 
	function constructBodyPane( ){
		var bodyPane = document.createElement( "div" );
		
		addStyleSet( bodyPane, {
			"position": "absolute",
			
			"zIndex": "0",
			
			"border": "0px",
			"margin": "0px",
			"padding": "0px",
			
			"width": "100%",
			"height": absoluteHeight + "px",
			
			"backgroundColor": constructColor( 0, 0, 0 ),
			
			"boxSizing": "border-box"
		} );
		
		this.componentSet.bodyPaneList.push( bodyPane );
		
		return bodyPane;
	};
	terminalLine.constructBodyPane = constructBodyPane;
	
	/*
	*/
	var constructFooterPane = terminalLine.constructFooterPane || 
	function constructFooterPane( ){
		var footerPane = document.createElement( "div" );
		
		addStyleSet( footerPane, {
			"display": "none",
			
			"position": "absolute",
			"top": "0px",
			"left": "0px",
			
			"zIndex": "1",
			"bottom": "0px",
			
			"border": "0px",
			"margin": "0px",
			"padding": "0px",
			
			"width": "100%",
			"height": absoluteHeight + "px",
			
			"backgroundColor": constructColor( 0, 0, 255 ),
			
			"boxSizing": "border-box"
		} );
		
		this.componentSet.footerPane = footerPane;
		
		return footerPane;
	};
	terminalLine.constructFooterPane = constructFooterPane;
	
	/*
	*/
	var createSVGCircleElement = terminalLine.createSVGCircleElement ||
	function createSVGCircleElement( dimensionSet, attributeSet, svgElement ){
		if( dimensionSet &&
			( typeof dimensionSet != "object"
				|| Object.keys( dimensionSet ).length == 0 ) &&
			( !( "cx" in dimensionSet )
				|| !( "cy" in dimensionSet )
				|| !( "r" in dimensionSet ) ) )
		{
			var error = new Error( "invalid dimension set" );
			console.error( error );
			throw error;		
		}
		
		if( attributeSet &&
			( typeof attributeSet != "object"
				|| Object.keys( attributeSet ).length == 0 ) )
		{
			var error = new Error( "invalid attribute set" );
			console.error( error );
			throw error;	
		}   
		
		if( svgElement &&
			( !( svgElement instanceof SVGElement ) ||
				svgElement.tagName != "svg" ) )
		{
			var error = new Error( "invalid svg element" );
			console.error( error );
			throw error;
		}
		
		var svgCircleElement = document.createElementNS( "http://www.w3.org/2000/svg", "circle" );
		
		var defaultAttributeSet = { 
			"id": "circle[" + Math.round( Date.now( ) * Math.random( ) ) + "]",
			"stroke-width": "1",
			"fill": "none",
			"stroke": constructColor( 0, 0, 0 )
		};
		
		for( var attribute in attributeSet ){
			defaultAttributeSet[ attribute ] = attributeSet[ attribute ];
		}
		
		addAttributeSet( svgCircleElement, dimensionSet );
		addAttributeSet( svgCircleElement, defaultAttributeSet );
		if( svgElement ){
			svgElement.appendToGElement( svgCircleElement );
		}
		
		return svgCircleElement;
	};
	terminalLine.createSVGCircleElement = createSVGCircleElement;
	
	/*
	*/
	var createSVGBoxElement = terminalLine.createSVGBoxElement ||
	function createSVGBoxElement( dimensionSet, attributeSet, svgElement ){
		if( dimensionSet &&
			( typeof dimensionSet != "object"
				|| Object.keys( dimensionSet ).length == 0 ) &&
			( !( "width" in dimensionSet )
				|| !( "height" in dimensionSet )
				|| !( "x" in dimensionSet )
				|| !( "y" in dimensionSet ) ) )
		{
			var error = new Error( "invalid dimension set" );
			console.error( error );
			throw error;		
		}
		
		if( attributeSet &&
			( typeof attributeSet != "object"
				|| Object.keys( attributeSet ).length == 0 ) )
		{
			var error = new Error( "invalid attribute set" );
			console.error( error );
			throw error;	
		}   
		
		if( svgElement &&
			( !( svgElement instanceof SVGElement ) ||
				svgElement.tagName != "svg" ) )
		{
			var error = new Error( "invalid svg element" );
			console.error( error );
			throw error;
		}
		
		var svgBoxElement = document.createElementNS( "http://www.w3.org/2000/svg", "rect" );
		
		var defaultAttributeSet = { 
			"id": "box[" + Math.round( Date.now( ) * Math.random( ) ) + "]",
			"stroke-width": "1",
			"fill": "none",
			"stroke": constructColor( 0, 0, 0 )
		};
		
		for( var attribute in attributeSet ){
			defaultAttributeSet[ attribute ] = attributeSet[ attribute ];
		}
		
		addAttributeSet( svgBoxElement, dimensionSet );
		addAttributeSet( svgBoxElement, defaultAttributeSet );
		
		if( svgElement ){
			svgElement.appendToGElement( svgBoxElement );
		}
		
		return svgBoxElement;
	};
	terminalLine.createSVGBoxElement = createSVGBoxElement;
	
	/*
	*/
	var createSVGLineElement = terminalLine.createSVGLineElement || 
	function createSVGLineElement( dimensionSet, attributeSet, svgElement ){
		if( dimensionSet &&
			( typeof dimensionSet != "object"
				|| Object.keys( dimensionSet ).length == 0 ) &&
			( !( "x1" in dimensionSet )
				|| !( "y1" in dimensionSet )
				|| !( "x2" in dimensionSet )
				|| !( "y2" in dimensionSet ) ) )
		{
			var error = new Error( "invalid dimension set" );
			console.error( error );
			throw error;		
		}
		
		if( attributeSet &&
			( typeof attributeSet != "object"
				|| Object.keys( attributeSet ).length == 0 ) )
		{
			var error = new Error( "invalid attribute set" );
			console.error( error );
			throw error;	
		}
		
		if( svgElement &&
			( !( svgElement instanceof SVGElement ) ||
				svgElement.tagName != "svg" ) )
		{
			var error = new Error( "invalid svg element" );
			console.error( error );
			throw error;
		}
		
		var svgLineElement = document.createElementNS( "http://www.w3.org/2000/svg", "line" );
		
		var defaultAttributeSet = { 
			"id": "line[" + Math.round( Date.now( ) * Math.random( ) ) + "]",
			"stroke-width": "1",
			"fill": "none",
			"stroke": constructColor( 0, 0, 0 )
		};
		
		for( var attribute in attributeSet ){
			defaultAttributeSet[ attribute ] = attributeSet[ attribute ];
		}
		
		addAttributeSet( svgLineElement, dimensionSet );
		addAttributeSet( svgLineElement, defaultAttributeSet );
		
		if( svgElement ){
			svgElement.appendToGElement( svgLineElement );
		}
		
		return svgLineElement;
	};
	terminalLine.createSVGLineElement = createSVGLineElement;
	
	/*
	*/
	var createSVGGElement = terminalLine.createSVGGElement || 
	function createSVGGElement( svgElement ){
		if( svgElement &&
			( !( svgElement instanceof SVGElement ) ||
				svgElement.tagName != "svg" ) )
		{
			var error = new Error( "invalid svg element" );
			console.error( error );
			throw error;
		}
		
		var gElement = document.createElementNS( "http://www.w3.org/2000/svg", "g" );
		
		if( svgElement ){
			svgElement.appendChild( gElement );
		
			svgElement.getGElement = function getGElement( ){
				return gElement;
			};
			
			svgElement.appendToGElement = function appendToGElement( node ){
				if( node instanceof Node ){
					gElement.appendChild( node );  
					
					var elementName = node.getAttribute( "id" );
					elementName = elementName.replace( /^[a-z]/g,
						function replace( match ){
							return match.toUpperCase( );	
						} );
						
					elementName = elementName.replace( /-[a-z]/g,
						function replace( match ){
							return match.substring( 1 ).toUpperCase( );	
						} );
					
					svgElement[ "get" + elementName ] = function getSVGComponent( ){
						return node;	
					};
					
				}else{
					var error = new Error( "invalid node" );
					console.error( error );
					throw error;		
				}
			};
		}
		
		return gElement;
	};
	terminalLine.createSVGGElement = createSVGGElement;
	
	/*
	*/
	var createSVGElement = terminalLine.createSVGElement ||
	function createSVGElement( top, left, width, height, attributeSet ){
		if( optionSet && 
			( typeof optionSet != "object" 
				|| Object.keys( optionSet ).length == 0 ) )
		{
			var error = new Error( "invalid option set" );
			console.error( error );
			throw error;
		}
		
		var svgElement = document.createElementNS( "http://www.w3.org/2000/svg", "svg" );
		
		var defaultAttributeSet = {
			"xmlns": "http://www.w3.org/2000/svg",
			"xmlns:svg": "http://www.w3.org/2000/svg",
			"xmlns:xlink": "http://www.w3.org/1999/xlink",
			"x": left,
			"y": top,
			"width": width,
			"height": height
		};
		
		for( var attribute in attributeSet ){
			defaultAttributeSet[ attribute ] = attributeSet[ attribute ];
		}
		
		addAttributeSet( svgElement, defaultAttributeSet );
		
		createSVGGElement( svgElement );
		
		return svgElement;
	};
	terminalLine.createSVGElement = createSVGElement;
	
	/*
	*/
	var constructAdvanceToggleIcon = terminalLine.constructAdvanceToggleIcon ||
	function constructAdvanceToggleIcon( ){
		var sideLength = absoluteHeight;
		
		var toggleSVGIcon = createSVGElement( 0, 0, sideLength, sideLength, {
			"id": "toggle-icon",
			"class": "icon"
		} );
		
		createSVGBoxElement( { 
			"x": 0,
			"y": 0,
			"width": sideLength,
			"height": sideLength 
		}, {
			"id": "toggle-box",
			"class": "box-symbol symbol",
			"stroke-width": "0"
		}, toggleSVGIcon );
		
		var halfSideLength = sideLength / 2;
		
		createSVGCircleElement( { 
			"cx": halfSideLength,
			"cy": halfSideLength,
			"r": ( halfSideLength - 5 )
		}, {
			"id": "toggle-circle-symbol",
			"class": "circle-symbol symbol",
			"stroke-width": "2",
			"stroke": constructColor( 255, 255, 255 )
		}, toggleSVGIcon );
		
		return toggleSVGIcon;
	};
	terminalLine.constructAdvanceToggleIcon = constructAdvanceToggleIcon;
	
	/*
	*/
	var constructCloseIcon = terminalLine.constructCloseIcon ||
	function constructCloseIcon( ){
		var sideLength = absoluteHeight;
		
		var closeSVGIcon = createSVGElement( 0, 0, sideLength, sideLength, {
			"id": "toggle-icon",
			"class": "icon"
		} );
		
		createSVGBoxElement( { 
			"x": 0,
			"y": 0,
			"width": sideLength,
			"height": sideLength 
		}, {
			"id": "close-box",
			"class": "box-symbol symbol",
			"stroke-width": "0"
		}, closeSVGIcon );
		
		var chokePointA = 5;
		var chokePointB = 15;
		
		createSVGLineElement( { 
			"x1": chokePointA,
			"y1": chokePointA,
			"x2": chokePointB,
			"y2": chokePointB
		}, {
			"id": "close-left-slant-line-symbol",
			"class": "line-symbol symbol",
			"stroke-width": "2",
			"stroke": constructColor( 255, 255, 255 )
		}, closeSVGIcon );
		
		createSVGLineElement( { 
			"x1": chokePointB,
			"y1": chokePointA,
			"x2": chokePointA,
			"y2": chokePointB
		}, {
			"id": "close-right-slant-line-symbol",
			"class": "line-symbol symbol",
			"stroke-width": "2",
			"stroke": constructColor( 255, 255, 255 )
		}, closeSVGIcon );
		
		return closeSVGIcon;	
	};
	terminalLine.constructCloseIcon = constructCloseIcon;
	
	/*
	*/
	var State = terminalLine.State ||
	function State( ){ 
		this.stateSet = { };
	};
	terminalLine.State = State;
	
	/*
	*/
	State.prototype.pushState = function pushState( state ){
		if( !( state in this.stateSet ) ){
			this.stateSet[ state ] = true;	
		}
	};
	
	/*
	*/
	State.prototype.popState = function popState( state ){
		if( state in this.stateSet ){
			delete this.stateSet[ state ];	
		}
	};
	
	/*
	*/
	State.prototype.checkState = function checkState( state ){
		return this.stateSet[ state ] || false;
	};
	
	/*
	*/
	var addAdvanceToggleButtonUIEventSet = terminalLine.addAdvanceToggleButtonUIEventSet ||
	function addAdvanceToggleButtonUIEventSet( advanceToggleButton, toggleIcon ){
		var eventState = new State( );

		advanceToggleButton.addEventListener( "mouseover",
			function onMouseOver( ){
				eventState.popState( "mouseleave" );
				if( eventState.checkState( "mousedown" ) ){
					return;
				}
				eventState.pushState( "mouseover" );
				
				var toggleCircleSymbol = toggleIcon.getToggleCircleSymbol( );
				toggleCircleSymbol.setAttribute( "stroke", constructColor( 200, 0, 0 )  );
			} );
			
		advanceToggleButton.addEventListener( "mouseleave",
			function onMouserLeave( ){
				eventState.popState( "mouseover" );
				eventState.pushState( "mouseleave" );
				if( eventState.checkState( "mousedown" ) ){
					eventState.popState( "mousedown" );
				}
				
				var toggleCircleSymbol = toggleIcon.getToggleCircleSymbol( );
				toggleCircleSymbol.setAttribute( "stroke", constructColor( 255, 255, 255 ) );
				
				var toggleBox = toggleIcon.getToggleBox( );
				toggleBox.setAttribute( "fill", constructColor( 0, 0, 0 ) );
			} );
			
		advanceToggleButton.addEventListener( "mousedown",
			function onMouseDown( ){
				eventState.popState( "mouseup" );
				eventState.pushState( "mousedown" );
				
				var toggleCircleSymbol = toggleIcon.getToggleCircleSymbol( );
				toggleCircleSymbol.setAttribute( "stroke", constructColor( 0, 0, 0 ) );
				
				var toggleBox = toggleIcon.getToggleBox( );
				toggleBox.setAttribute( "fill", constructColor( 100, 100, 100 ) );	
			} );
			
		advanceToggleButton.addEventListener( "mouseup",
			function onMouseUp( ){
				eventState.popState( "mousedown" );
				eventState.pushState( "mouseup" );
				
				var toggleCircleSymbol = toggleIcon.getToggleCircleSymbol( );
				toggleCircleSymbol.setAttribute( "stroke", constructColor( 255, 255, 255 ) );
				
				var toggleBox = toggleIcon.getToggleBox( );
				toggleBox.setAttribute( "fill", constructColor( 0, 0, 0 ) ); 
			} );

		var self = this;
		advanceToggleButton.addEventListener( "click",
			function onClick( ){
				if( eventState.checkState( "advance-toggle-activated" ) ){
					eventState.popState( "advance-toggle-activated" );
					eventState.pushState( "advance-toggle-deactivated" );

					self.componentSet.headerPane.style.display = "none";
					self.componentSet.footerPane.style.display = "none";
				}else{
					eventState.popState( "advance-toggle-deactivated" );
					eventState.pushState( "advance-toggle-activated" );

					self.componentSet.headerPane.style.display = "block";
					self.componentSet.footerPane.style.display = "block";
				}
				
			} );
	};
	terminalLine.addAdvanceToggleButtonUIEventSet = addAdvanceToggleButtonUIEventSet;
	
	/*
	*/
	var constructAdvanceToggleButton = terminalLine.constructAdvanceToggleButton ||
	function constructAdvanceToggleButton( ){
		var advanceToggleButton = document.createElement( "button" );
		
		addStyleSet( advanceToggleButton, {
			"display": "inline-block",
			
			"position": "absolute",
			
			"zIndex": "2",
			"top": "0px",
			"right": "0px",
			
			"border": "0px",
			"margin": "0px",
			"padding": "0px",
			
			"width": absoluteHeight + "px",
			"height": absoluteHeight + "px",
			
			"backgroundColor": constructColor( 0, 0, 0 ),
			
			"outline": "none",
			
			"boxSizing": "border-box"	
		} );
		
		var toggleIcon = constructAdvanceToggleIcon( );
		
		advanceToggleButton.appendChild( toggleIcon );
		
		this.componentSet.advanceToggleButton = advanceToggleButton;
		
		this.addAdvanceToggleButtonUIEventSet( advanceToggleButton, toggleIcon );
		
		return advanceToggleButton;
	};
	terminalLine.constructAdvanceToggleButton = constructAdvanceToggleButton;
	
	/*
	*/
	var addCloseButtonUIEventSet = terminalLine.addCloseButtonUIEventSet ||
	function addCloseButtonUIEventSet( closeButton, closeIcon ){
		var eventState = new State( );

		closeButton.addEventListener( "mouseover",
			function onMouseOver( ){
				eventState.popState( "mouseleave" );
				if( eventState.checkState( "mousedown" ) ){
					return;
				}
				eventState.pushState( "mouseover" );

				var lineColor = constructColor( 200, 0, 0 );
				
				var closeLeftSlantLineSymbol = closeIcon.getCloseLeftSlantLineSymbol( );
				var closeRightSlantLineSymbol = closeIcon.getCloseRightSlantLineSymbol( );
				closeLeftSlantLineSymbol.setAttribute( "stroke", lineColor );
				closeRightSlantLineSymbol.setAttribute( "stroke", lineColor );
			} );
			
		closeButton.addEventListener( "mouseleave",
			function onMouserLeave( ){
				eventState.popState( "mouseover" );
				eventState.pushState( "mouseleave" );
				if( eventState.checkState( "mousedown" ) ){
					eventState.popState( "mousedown" );
				}

				var lineColor = constructColor( 255, 255, 255 );
				
				var closeLeftSlantLineSymbol = closeIcon.getCloseLeftSlantLineSymbol( );
				var closeRightSlantLineSymbol = closeIcon.getCloseRightSlantLineSymbol( );
				closeLeftSlantLineSymbol.setAttribute( "stroke", lineColor );
				closeRightSlantLineSymbol.setAttribute( "stroke", lineColor );
				
				var closeBox = closeIcon.getCloseBox( );
				closeBox.setAttribute( "fill", constructColor( 0, 0, 0 ) );
			} );
			
		closeButton.addEventListener( "mousedown",
			function onMouseDown( ){
				eventState.popState( "mouseup" );
				eventState.pushState( "mousedown" );

				var lineColor = constructColor( 0, 0, 0 );
				
				var closeLeftSlantLineSymbol = closeIcon.getCloseLeftSlantLineSymbol( );
				var closeRightSlantLineSymbol = closeIcon.getCloseRightSlantLineSymbol( );
				closeLeftSlantLineSymbol.setAttribute( "stroke", lineColor );
				closeRightSlantLineSymbol.setAttribute( "stroke", lineColor );
				
				var closeBox = closeIcon.getCloseBox( );
				closeBox.setAttribute( "fill", constructColor( 100, 100, 100 ) );	
			} );
			
		closeButton.addEventListener( "mouseup",
			function onMouseUp( ){
				eventState.popState( "mousedown" );
				eventState.pushState( "mouseup" );
				
				var closeLeftSlantLineSymbol = closeIcon.getCloseLeftSlantLineSymbol( );
				var closeRightSlantLineSymbol = closeIcon.getCloseRightSlantLineSymbol( );
				closeLeftSlantLineSymbol.setAttribute( "stroke", "rgb(255,255,255)" );
				closeRightSlantLineSymbol.setAttribute( "stroke", "rgb(255,255,255)" );
				
				var closeBox = closeIcon.getCloseBox( );
				closeBox.setAttribute( "fill", "rgb(0,0,0)" );   
			} );	
	};
	terminalLine.addCloseButtonUIEventSet = addCloseButtonUIEventSet;
	
	/*
	*/
	var constructCloseButton = terminalLine.constructCloseButton ||
	function constructCloseButton( rightDistance ){
		var closeButton = document.createElement( "button" );
		
		addStyleSet( closeButton, {
			"display": "inline-block",
			
			"position": "absolute",
			
			"zIndex": "2",
			"top": "0px",
			"right": ( rightDistance || 0 ) +  "px",
			
			"border": "0px",
			"margin": "0px",
			"padding": "0px",
			
			"width": absoluteHeight + "px",
			"height": absoluteHeight + "px",
			
			"backgroundColor": "rgba(0,0,0,1)",
			
			"outline": "none",
			
			"boxSizing": "border-box"	
		} );
		
		var closeIcon = constructCloseIcon( );
		
		closeButton.appendChild( closeIcon );
		
		this.addCloseButtonUIEventSet( closeButton, closeIcon );
		
		return closeButton;	 
	};
	terminalLine.constructCloseButton = constructCloseButton;
	
	/*
	*/
	var constructTextInputBox = terminalLine.constructTextInputBox || 
	function constructTextInputBox( ){
		var textInputBox = document.createElement( "input" );

		addAttributeSet( textInputBox, {
			"type": "text"
		} );

		addStyleSet( textInputContainer, {
			"display": "block",

			"position": "absolute",
			"top": "0px",
			"left": "0px",

			"width": "100%",
			"height": "100%",
			
			"zIndex": "0",
			
			"border": "0px",
			"margin": "0px",
			"padding": "0px",
			
			"boxSizing": "border-box",
			
			"color": "#ffffff",
			"backgroundColor": "rgb(0,0,0)",
			
			"fontSize": "12px",
			"fontFamily": "Consolas",
			"textRendering": "optimizeLegibility",
			"whiteSpace": "nowrap"
		} );

	};
	terminalLine.constructTextInputBox = constructTextInputBox;
	
	/*
	*/
	var constructTextInputContainer = terminalLine.constructTextInputContainer ||
	function constructTextInputContainer( mainTextNodeContainer ){
		var textInputContainer = document.createElement( "div" );
		


		addStyleSet( textInputContainer, {
			"display": "inline-block",
			
			"zIndex": "0",
			
			"border": "0px",
			"margin": "0px",
			"padding": "0px",
			
			"boxSizing": "border-box"
		} );

		addStyleSet( mainTextNodeContainer, {

		} );
	};
	terminalLine.constructTextInputContainer = constructTextInputContainer;
	
	/*
	*/
	var constructMainTextNode = terminalLine.constructMainTextNode || 
	function constructMainTextNode( text ){
		var mainTextNode = document.createTextNode( text );
		
		this.componentSet.mainTextNodeList.push( mainTextNode );
		
		return mainTextNode;
	};
	terminalLine.constructMainTextNode = constructMainTextNode;
	
	/*
	*/
	var constructMainTextNodeContainer = terminalLine.constructMainTextNodeContainer ||
	function constructMainTextNodeContainer( ){
		var mainTextNodeContainer = document.createElement( "div" );
		
		addStyleSet( mainTextNodeContainer, {
			"display": "inline-block",
			
			"zIndex": "0",
			
			"border": "0px",
			"margin": "0px",
			"marginTop": "3px",
			"marginLeft": "5px",
			"padding": "0px",
			
			"boxSizing": "border-box",
			
			"color": "#ffffff",
			
			"fontSize": "12px",
			"fontFamily": "Consolas",
			"textRendering": "optimizeLegibility",
			"whiteSpace": "nowrap"
		} );	  
		
		this.componentSet.mainTextNodeContainerList.push( mainTextNodeContainer );
		
		return mainTextNodeContainer
	};
	terminalLine.constructMainTextNodeContainer = constructMainTextNodeContainer;
	
	/*
	*/
	var renderBodyPaneList = terminalLine.renderBodyPaneList ||
	function renderBodyPaneList( optionSet ){
		if( optionSet 
			&& typeof optionSet != "object" )
		{
			var error = new Error( "invalid option set" );
			console.error( error );
			throw error;
		}

		var outputPane = this.componentSet.outputPane;
		var bodyPaneSingleHeight = absoluteHeight;
		var textListLength = this.textList.length;
		
		var currentBodyPane = null;

		var currentMainTextNode = null;
		var currentMainTextNodeContainer = null;

		var currentTextInputContainer = null;
		var currentTextInputBox = null;

		var currentCloseButton = null;

		var text = "";
		var topDistance = 0;
		var currentBodyPaneYCoordinate = 0;

		for( var index = 0; index < textListLength; index++ ){
			text = this.textList[ index ];
			
			outputPane.style.height = ( absoluteHeight * index + absoluteHeight ) + "px";
			if( optionSet && 
				"additionalOutputPaneHeight" in optionSet )
			{
				outputPane.style.height += optionSet.additionalOutputPaneHeight;
			}

			currentBodyPane = this.constructBodyPane( );
			currentMainTextNodeContainer = this.constructMainTextNodeContainer( );
			currentMainTextNode = this.constructMainTextNode( text );
			
			topDistance = ( absoluteHeight * index );
			if( optionSet && 
				"additionalTopDistance" in optionSet )
			{
				topDistance += optionSet.additionalTopDistance;
			}
			
			currentBodyPane.topDistance = topDistance;
			currentBodyPaneTopDistance = topDistance + "px";
			currentBodyPane.style.top = currentBodyPaneTopDistance;
			
			currentMainTextNodeContainer.appendChild( currentMainTextNode );
			currentBodyPane.appendChild( currentMainTextNodeContainer );
			
			if( index == 0 ){
				currentCloseButton = this.constructCloseButton( 20 );
			}else{
				currentCloseButton = this.constructCloseButton( );
			}
			currentBodyPane.appendChild( currentCloseButton );
			
			outputPane.appendChild( currentBodyPane );
		}
	};
	terminalLine.renderBodyPaneList = renderBodyPaneList;
	
	/*
	*/
	var constructTerminalLineComponent = terminalLine.constructTerminalLineComponent ||
	function constructTerminalLineComponent( container ){
		if( container && !( container instanceof Element ) ){
			var error = new Error( "invalid container" );
			console.error( error );
			throw error;
		}
		
		var parentContainer = container || document.body;
		
		var outputPane = this.constructOutputPane( );

		var headerPane = this.constructHeaderPane( );
		
		var footerPane = this.constructFooterPane( );

		outputPane.appendChild( headerPane );
		
		outputPane.appendChild( footerPane );
		
		this.componentSet.bodyPaneList = [ ];
		this.componentSet.mainTextNodeList = [ ];
		this.componentSet.mainTextNodeContainerList = [ ];
		
		this.renderBodyPaneList( );
		
		var advanceToggleButton = this.constructAdvanceToggleButton( );
		outputPane.appendChild( advanceToggleButton );
		
		var datePane = document.createElement( "span" );
		var dateNow = new Date( Date.now( ) );
		datePaneTextNode = document.createTextNode( dateNow );
		datePane.appendChild( datePaneTextNode );

		parentContainer.appendChild( outputPane );	
	}
	terminalLine.constructTerminalLineComponent = constructTerminalLineComponent;

	/*
	*/
	var TerminalLineComponent = terminalLine.TerminalLineComponent ||
	function TerminalLineComponent( namespaceUID, textList ){
		this.initialize.apply( this, Array.prototype.slice.call( arguments ) );
	};
	
	/*
	*/
	TerminalLineComponent.prototype.initialize = function initialize( namespaceUID, textList ){
		this.namespaceUID = namespaceUID;
		this.textList = textList;
		
		this.componentSet = { };
		
		this.constructTerminalLineComponent( );
		
		this.terminalLineComponentState = new State( );
	};
	
	TerminalLineComponent.prototype.constructOutputPane = constructOutputPane;
	TerminalLineComponent.prototype.constructHeaderPane = constructHeaderPane;
	TerminalLineComponent.prototype.constructBodyPane = constructBodyPane;
	TerminalLineComponent.prototype.constructFooterPane = constructFooterPane;
	TerminalLineComponent.prototype.constructMainTextNode = constructMainTextNode;
	TerminalLineComponent.prototype.renderBodyPaneList = renderBodyPaneList;
	TerminalLineComponent.prototype.constructMainTextNodeContainer = constructMainTextNodeContainer;
	TerminalLineComponent.prototype.constructTerminalLineComponent = constructTerminalLineComponent;
	TerminalLineComponent.prototype.constructAdvanceToggleButton = constructAdvanceToggleButton;
	TerminalLineComponent.prototype.constructCloseButton = constructCloseButton;
	TerminalLineComponent.prototype.addAdvanceToggleButtonUIEventSet = addAdvanceToggleButtonUIEventSet;
	TerminalLineComponent.prototype.addCloseButtonUIEventSet = addCloseButtonUIEventSet;
	
	terminalLine.TerminalLineComponent = TerminalLineComponent;

	/*
	*/
	var terminalLineEngine = terminalLine.terminalLineEngine ||
	function terminalLineEngine( ){
		var parameterList = Array.prototype.slice.call( arguments );
		
		var dateNow = Date.now( );
		
		var randomUID = Math.round( dateNow + ( dateNow * Math.random( ) ) );
		
		var namespaceUID = [ namespace, ":", randomUID ].join( );
		
		terminalLineComponentSet[ namespaceUID ] = new TerminalLineComponent( namespaceUID, parameterList );
		
		terminalEngine.apply( this, parameterList );
	};
	terminalLine.terminalLineEngine = terminalLineEngine;
	
	return terminalLineEngine;
};

var consoleDebug = console.debug;
console.debug = terminalLine( "console-debug", consoleDebug ); 

console.debug( "Console.debug Test", "world domination", "progressively" );
console.debug( "Console.debug Test", "world domination", "progressively" );
