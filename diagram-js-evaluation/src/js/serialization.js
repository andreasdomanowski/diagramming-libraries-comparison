import * as dom_identifier from "./const/dom-identifier";
import * as $ from "jquery";
import 'bootstrap'
import {canvas, diagram, elementFactory, initAndGetEmptyRoot, root} from './editorInitialization'
import * as shapeIdentifiers from "./shapes/EvaluationShapes";
import {Connection, Shape} from "diagram-js/lib/model";

let x = undefined;

$("#" + dom_identifier.serializeConsoleButton).click(() => {
    console.log(diagram);
});

$("#" + dom_identifier.serializeButton).click(() => {
    let elementRegistry = diagram.get('elementRegistry');
    let a = elementRegistry.getAll();

    a.forEach(element => {
        if (element instanceof Connection) {
            element.from = element.source.id;
            element.to = element.target.id;
        }
    })

    showInModal(JSON.stringify(elementRegistry.getAll()));
});

function showInModal(modalSerializationContent) {
    $("#" + dom_identifier.modalSerializationContent).html(modalSerializationContent);
    $("#" + dom_identifier.modalSerializationIdentifier).modal();
}

// deserialization
$("#" + dom_identifier.deserializeButton).click(() => parseInputAndDisplayGraph(
    $("#" + dom_identifier.deserializationTextarea).val()
));

function parseInputAndDisplayGraph(inputString) {
    let parsedJson = JSON.parse(inputString);
    diagram.clear();

    let root = initAndGetEmptyRoot();

    // generate shapes
    parsedJson.forEach(e => {
        console.log(e);
    })

    // generate connections
    parsedJson.forEach(e => {
        if (!e.hasOwnProperty("waypoints") && e.hasOwnProperty("customShapeIdentifier")) {
            let newShape = elementFactory.createShape({
                x: e.x,
                y: e.y,
                width: e.width,
                height: e.height,
                isFrame: e.isFrame
            });
            newShape.customShapeIdentifier = e.customShapeIdentifier;
            canvas.addShape(newShape, root);
        }
    })


}
