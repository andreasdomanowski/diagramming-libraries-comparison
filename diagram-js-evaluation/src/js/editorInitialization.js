import Editor from "./editor";
import * as domIdentifiers from "./const/dom-identifier";
import * as shapeIdentifiers from "./shapes/EvaluationShapes";

export const diagram = new Editor({
    container: document.querySelector('#' + domIdentifiers.diagramCanvas)
});

export const canvas = diagram.get('canvas');

export const elementFactory = diagram.get('elementFactory');

export let root = undefined;

root = initAndGetEmptyRoot();

export function initAndGetEmptyRoot(){
    root = elementFactory.createRoot();
    canvas.setRootElement(root);
    return root;
}

let shape1 = elementFactory.createShape({
    x: 150,
    y: 100,
    width: 100,
    height: 80,
    isFrame: true,
    customLabel: 'Label1'
});
shape1.customShapeIdentifier = shapeIdentifiers.shapeRectangleIdentifier;

canvas.addShape(shape1, root);

let shape2 = elementFactory.createShape({
    x: 290,
    y: 220,
    width: 100,
    height: 80,
    isFrame: true,
    customLabel: 'Label2'
});
shape2.customShapeIdentifier = shapeIdentifiers.shapeCircleIdentifier;
canvas.addShape(shape2, root);


let connection1 = elementFactory.createConnection({
    waypoints: [
        { x: 250, y: 180 },
        { x: 290, y: 220 }
    ],
    source: shape1,
    target: shape2
});

canvas.addConnection(connection1, root);


let shape3 = elementFactory.createShape({
    x: 450,
    y: 80,
    width: 100,
    height: 80,
    isFrame: true,
    customLabel: 'Label3'
});
shape3.customShapeIdentifier = shapeIdentifiers.shapeComposedShapeIdentifier;

canvas.addShape(shape3, root);

