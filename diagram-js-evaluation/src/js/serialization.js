import * as dom_identifier from "./const/dom-identifier";
import * as $ from "jquery";
import 'bootstrap'
import {canvas, diagram, elementFactory, initAndGetEmptyRoot} from './editorInitialization'
import {Connection} from "diagram-js/lib/model";

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

    let idShapeMap = new Map();
    let connectionSet = new Set();

    //generate shapes
    parsedJson.forEach(e => {
        // just deserialize non-root shapes which are no connections
        if (!e.hasOwnProperty("waypoints") && e.hasOwnProperty("customShapeIdentifier")) {
            let newShape = elementFactory.createShape({
                x: e.x,
                y: e.y,
                width: e.width,
                height: e.height,
                isFrame: e.isFrame
            });
            newShape.customShapeIdentifier = e.customShapeIdentifier;

            idShapeMap.set(e.id, newShape);

            canvas.addShape(newShape, root);
        } else if (e.hasOwnProperty("waypoints")) {
            connectionSet.add(
                {
                    from: e.from,
                    to: e.to,
                    waypoints: e.waypoints
                });
        }

    })

    connectionSet.forEach(element => {
        let connection = elementFactory.createConnection({
            waypoints: element.waypoints,
            source: idShapeMap.get(element.from),
            target: idShapeMap.get(element.to)
        });

        canvas.addConnection(connection, root);
    })
}
