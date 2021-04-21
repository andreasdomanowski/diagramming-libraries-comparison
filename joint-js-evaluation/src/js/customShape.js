import * as joint from 'jointjs'

export const customNamespace = "customShapes";
export const customShapeIdentifier = "CustomShape";

function defineShapeName(shapeName){
    return customNamespace + "." + shapeName;
}

export const CustomElement = joint.dia.Element.define(defineShapeName(customShapeIdentifier), {
    attrs: {
        outerRect: {
            refWidth: '100%',
            refHeight: '100%',
            strokeWidth: 2,
            stroke: '#000000',
            fill: '#FFFFFF'
        },
        label: {
            textVerticalAnchor: 'middle',
            textAnchor: 'middle',
            refX: '50%',
            refY: '50%',
            fontSize: 14,
            fill: '#000000'
        },
        innerEllipse: {
            cx: '50',
            cy: '20',
            rx: '50',
            ry: '20',
            strokeWidth: 2,
            stroke: '#000000',
            fill: '#FFFFFF'
        }
    }
}, {
    markup: [{
        tagName: 'rect',
        selector: 'outerRect',
    }, {
        tagName: 'ellipse',
        selector: 'innerEllipse'
    }, {
        tagName: 'text',
        selector: 'label'
    }]
});
