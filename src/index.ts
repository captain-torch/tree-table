import { renderTreeTable } from './renderer';
import {addColumnAfter, addRowAfter} from './editor';
import {defaultTreeTable} from './tree';
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
        }
    }
}

let treeTable = defaultTreeTable;

const addColumn = (rowIndex: number, colIndex: number) => {
    treeTable = addColumnAfter(treeTable, colIndex);
    renderTreeTable('tree-table', treeTable);
};

const addRow = (rowIndex: number) => {
    treeTable = addRowAfter(treeTable, rowIndex);
    renderTreeTable('tree-table', treeTable);
};

const init = () => {
    window.TreeTable = {
        AddColumn: addColumn,
        AddRow: addRow,
    };

    renderTreeTable('tree-table', treeTable);
};

init();
