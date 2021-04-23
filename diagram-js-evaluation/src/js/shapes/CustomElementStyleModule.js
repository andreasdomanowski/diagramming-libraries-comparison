import {append, append as svgAppend, appendTo, attr as svgAttr, create, create as svgCreate} from "tiny-svg";
import {isFrameElement} from "diagram-js/lib/util/Elements";
import * as shapeIdentifiers from './EvaluationShapes'
/**
 * Override default look and feel of example
 */

const customRenderer = function (visuals, element) {
    if(element.customShapeIdentifier === shapeIdentifiers.shapeRectangleIdentifier){
        let rect = svgCreate('rect');
        svgAttr(rect, {
            x: 0,
            y: 0,
            fill: 'none',
            stroke: 'black',
            strokeWidth: 3,
            width: element.width || 0,
            height: element.height || 0
        });

        svgAppend(visuals, rect);

        console.log(rect);
        return rect;
    }

    if(element.customShapeIdentifier === shapeIdentifiers.shapeCircleIdentifier){
        let circle = svgCreate('circle');
        svgAttr(circle, {
            cx: 0.5*element.width,
            cy: 0.5*element.height,
            r: 40,
            fill: 'none',
            stroke: 'black',
            strokeWidth: 3
        });

        console.log(circle);

        svgAppend(visuals, circle);

        return circle;
    }

    if(element.customShapeIdentifier === shapeIdentifiers.shapeComposedShapeIdentifier){
        let svgGroup = svgCreate('g');
        let ellipse = svgCreate('ellipse');

        let rect = svgCreate('rect');
        svgAttr(rect, {
            x: 0,
            y: 0,
            fill: 'none',
            stroke: 'black',
            strokeWidth: 3,
            width: element.width || 0,
            height: element.height || 0
        });

        svgAttr(ellipse, {
            cx: 0.5*element.width,
            cy: 0.5*element.height,
            rx: 0.5*element.width,
            ry: 0.5*element.height,
            fill: 'none',
            stroke: 'black',
            strokeWidth: 3
        });

        svgAppend(visuals, svgGroup);
        svgAppend(visuals, rect);
        svgAppend(visuals, ellipse);

        return svgGroup;
    }
}

export const CustomElementStyleModule = {
    __init__: [
        [ 'defaultRenderer', function(defaultRenderer) {
            // override default styles
            defaultRenderer.CONNECTION_STYLE = { fill: 'none', strokeWidth: 5, stroke: '#000' };
            defaultRenderer.SHAPE_STYLE = { fill: 'white', stroke: '#000', strokeWidth: 2 };
            defaultRenderer.FRAME_STYLE = { fill: 'none', stroke: '#000', strokeDasharray: 4, strokeWidth: 2 };
            defaultRenderer.drawShape = customRenderer;
        } ]
    ]
};