import * as $ from "jquery";
import * as dom_identifier from "./const/dom-identifier";
import 'bootstrap'
import {graph} from "./graph";

$("#" + dom_identifier.serializeConsoleButton).click(() => {
    console.log(graph.toJSON());
});

$("#" + dom_identifier.serializeButton).click(() => {
    showInModal(JSON.stringify(graph.toJSON()));
});

function showInModal(modalSerializationContent) {
    $("#" + dom_identifier.modalSerializationContent).html(modalSerializationContent);
    $("#" + dom_identifier.modalIdentifier).modal();
}

// deserialization
$("#" + dom_identifier.deserializeButton).click(() => parseInputAndDisplayGraph(
    $("#" + dom_identifier.deserializationTextarea).val()
));

function parseInputAndDisplayGraph(inputString) {
    let parsedJson = JSON.parse(inputString);
    deserializeAndDisplayGraph(parsedJson);
}

function deserializeAndDisplayGraph(input) {
    graph.clear();
    graph.fromJSON(input);
}