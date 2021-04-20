export { default } from './editor';

import css from 'diagram-js/assets/diagram-js.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/diagram-js-evaluation.css'

import Editor from './editor'



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
    height: 80
});

canvas.addShape(shape1, root);

let shape2 = elementFactory.createShape({
    x: 290,
    y: 220,
    width: 100,
    height: 80
});

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
    height: 80
});

canvas.addShape(shape3, root);

let shape4 = elementFactory.createShape({
    x: 425,
    y: 50,
    width: 300,
    height: 200,
    isFrame: true
});

canvas.addShape(shape4, root);


// (3) interact with the diagram via API

const selection = diagram.get('selection');

selection.select(shape3);