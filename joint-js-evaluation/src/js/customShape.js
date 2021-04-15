import * as joint from 'jointjs'

export const customShapeIdentifier = "customShapes.CustomShape";

export const CustomElement = joint.dia.Element.define(customShapeIdentifier, {
    markup: '<ellipse/>',
    attrs: {
        ellipse: {
            fill: 'black',
            refRx: .5,
            refRy: .5,
            refCx: .5,
            refCy: .5
        }
    }
});


