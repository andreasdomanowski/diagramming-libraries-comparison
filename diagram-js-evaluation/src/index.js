export { default } from './js/editor';

import css from 'diagram-js/assets/diagram-js.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/diagram-js-evaluation.css'

import Editor from './js/editor'
import * as shapeIdentifiers from './js/shapes/EvaluationShapes'



const diagram = new Editor({
    container: document.querySelector('#diagramCanvas')
});


const canvas = diagram.get('canvas');
const elementFactory = diagram.get('elementFactory');

let root = elementFactory.createRoot();

canvas.setRootElement(root);

let shape1 = elementFactory.createShape({
    x: 150,
    y: 100,
    width: 100,
    height: 80,
    isFrame: true
});
shape1.customShapeIdentifier = shapeIdentifiers.shapeRectangleIdentifier;

canvas.addShape(shape1, root);

let shape2 = elementFactory.createShape({
    x: 290,
    y: 220,
    width: 100,
    height: 80,
    isFrame: true
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
    isFrame: true
});
shape3.customShapeIdentifier = shapeIdentifiers.shapeComposedShapeIdentifier;

canvas.addShape(shape3, root);