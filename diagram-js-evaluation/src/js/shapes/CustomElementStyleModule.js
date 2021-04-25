import {append, append as svgAppend, appendTo, attr as svgAttr, create, create as svgCreate} from "tiny-svg";
import * as shapeIdentifiers from './EvaluationShapes'

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

/**
 * Override default look and feel of example
 */

const customRenderer = function (visuals, element) {
    if(element.customShapeIdentifier === shapeIdentifiers.shapeRectangleIdentifier){
        return createRectangleShape(element, visuals);
    }

    if(element.customShapeIdentifier === shapeIdentifiers.shapeCircleIdentifier){
        return createCircleShape(element, visuals);
    }

    if(element.customShapeIdentifier === shapeIdentifiers.shapeComposedShapeIdentifier){
        return createComposedShape(element, visuals);
    }
}

function createCircleShape(element, visuals) {
    let circle = svgCreate('circle');
    svgAttr(circle, {
        cx: 0.5 * element.width,
        cy: 0.5 * element.height,
        r: 0.5 * element.height,
        fill: 'none',
        stroke: 'black',
        strokeWidth: 3
    });

    console.log(circle);

    svgAppend(visuals, circle);

    return circle;
}

function createRectangleShape(element, visuals) {
    let rect = svgCreate('rect');
    svgAttr(rect, {
        x: 0,
        y: 0,
        fill: 'none',
        stroke: 'black',
        strokeWidth: 3,
        width: element.width ,
        height: element.height
    });

    svgAppend(visuals, rect);

    console.log(rect);
    return rect;
}

function createComposedShape(element, visuals) {
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
        cx: 0.5 * element.width,
        cy: 0.5 * element.height,
        rx: 0.5 * element.width,
        ry: 0.5 * element.height,
        fill: 'none',
        stroke: 'black',
        strokeWidth: 3
    });

    svgAppend(visuals, svgGroup);
    svgAppend(visuals, rect);
    svgAppend(visuals, ellipse);

    return svgGroup;
}