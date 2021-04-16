import * as joint from "jointjs";
import * as customShapes from "./customShape";

export function addRectangle(x, y, graph) {
    let rect = new joint.shapes.standard.Rectangle();
    rect.position(x, y);
    rect.resize(100, 40);
    rect.addTo(graph);
    return rect;
}

export function addCircle(x, y, graph) {
    let circle = new joint.shapes.standard.Circle();
    circle.position(x, y);
    circle.resize(100, 40);
    circle.addTo(graph);
    return circle;
}

export function addComposedShape(x, y, graph) {
    let newComposedShape = new customShapes.CustomElement();
    newComposedShape.position(x, y);
    newComposedShape.resize(100, 40);
    newComposedShape.addTo(graph);
    newComposedShape.attr('label/text', 'Label');
    return newComposedShape;
}

export function addLink(source, target, graph){
    let link = new joint.shapes.standard.Link();
    link.source(source);
    link.target(target);
    link.addTo(graph);
}