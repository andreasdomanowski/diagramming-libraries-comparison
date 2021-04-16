import * as joint from "jointjs";
import * as customShapes from "./customShape";
import {paper} from "./graph";

export function addRectangle(x, y, graph) {
    let rect = new joint.shapes.standard.Rectangle();
    rect.position(x, y);
    rect.resize(100, 40);
    rect.addTo(graph);
    addTools(rect);
    return rect;
}

export function addCircle(x, y, graph) {
    let circle = new joint.shapes.standard.Circle();
    circle.position(x, y);
    circle.resize(100, 40);
    circle.addTo(graph);
    addTools(circle);
    return circle;
}

export function addComposedShape(x, y, graph) {
    let newComposedShape = new customShapes.CustomElement();
    newComposedShape.position(x, y);
    newComposedShape.resize(100, 40);
    newComposedShape.addTo(graph);
    newComposedShape.attr('label/text', 'Label');
    addTools(newComposedShape);
    return newComposedShape;
}

export function addLink(source, target, graph){
    let link = new joint.shapes.standard.Link();
    link.source(source);
    link.target(target);
    link.addTo(graph);
    addTools(link);
}

function addTools(element){
    let boundaryTool = new joint.elementTools.Boundary();
    let removeButton = new joint.elementTools.Remove();

    let toolsView = new joint.dia.ToolsView({
        tools: [boundaryTool, removeButton]
    });

    let elementView = element.findView(paper);
    elementView.addTools(toolsView);
    elementView.hideTools();
}