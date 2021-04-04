import * as joint from 'jointjs'

const graph = new joint.dia.Graph;

const paper = new joint.dia.Paper({
    el: document.getElementById('diagramCanvas'),
    model: graph,
    width: 600,
    height: 600,
    gridSize: 1,
    restrictTranslate : true
});

let rect = new joint.shapes.standard.Rectangle();
rect.position(100, 30);
rect.resize(100, 40);
rect.attr({
    body: {
        fill: 'blue'
    },
    label: {
        text: 'Hello',
        fill: 'white'
    }
});
rect.addTo(graph);

let rect2 = rect.clone();
rect2.translate(300, 0);
rect2.attr('label/text', 'World!');
rect2.addTo(graph);

let custom1 = new joint.shapes.chess.BishopBlack()
custom1.attr('label/text', 'World!');
custom1.addTo(graph);

let link = new joint.shapes.standard.Link();
link.source(rect);
link.target(rect2);
link.addTo(graph);

function addRectangle(x, y) {
    let rect = new joint.shapes.standard.Rectangle();
    rect.position(x, y);
    rect.addTo(graph);
    return rect;
}

function addCircle(x,y){
    let circle = new joint.shapes.standard.Circle();
    circle.position(x, y);
    circle.addTo(graph);
    return circle;
}

paper.on('blank:contextmenu', function(evt, x, y) {
    // open context menu

    // get result from context menu

    // create new shape
});

