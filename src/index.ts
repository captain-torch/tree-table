import { renderTreeTable } from './renderer';
import {addColumnAfter, addRowAfter} from './editor';
import {defaultTreeTable} from './tree';

declare global {
    interface Window {
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

const treeTable = defaultTreeTable;

const addColumn = (rowIndex: number, colIndex: number) => {
    addColumnAfter(treeTable, colIndex);
    renderTreeTable('tree-table', treeTable);
};

const addRow = (rowIndex: number) => {
    addRowAfter(treeTable, rowIndex);
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
