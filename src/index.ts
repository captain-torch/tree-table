import { renderTreeTable } from './renderer';
import {addColumnAfter, addRowAfter} from './editor';
import {defaultTreeTable, TreeTable} from './tree';
import {Immer} from "immer";

declare global {
    interface Window {
        immer: Immer,
        TreeTable: {

            /**
             * Adds a new Column **to the right** of the specified cell
             * @param rowIndex a row index of the target cell
             * @param colIndex a column index of the target cell
             */
            AddColumn: (rowIndex: number, colIndex: number) => void;

            /**
             * Adds a new Column **to the right** of the specified cell
             * @param rowIndex a row index of the target cell
             * @param colIndex a column index of the target cell
             */
            AddRow: (rowIndex: number, colIndex: number) => void;

            Undo: () => void;
        }
    }
}

const history: TreeTable[] = [defaultTreeTable];
let historyPointer = 0;

const performAction = (action: (table: TreeTable) => TreeTable) => {
    history.push(action(history[historyPointer]));
    historyPointer ++;
    render();
}

const addColumn = (rowIndex: number, colIndex: number) => {
    performAction((table) => addColumnAfter(table, colIndex));
};

const addRow = (rowIndex: number, colIndex: number) => {
    performAction((table) => addRowAfter(table, rowIndex))
};

const undo = () => {
    if (historyPointer > 0) {
        historyPointer --;
        history.pop();
        render();
    }
}

const render = () => {
    renderTreeTable('tree-table', history[historyPointer]);
}

const init = () => {
    window.TreeTable = {
        AddColumn: addColumn,
        AddRow: addRow,
        Undo: undo
    };
    render();
};

init();
