import {TreeTable, TreeTableNode} from "./tree";

type TableRow = Array<{
    node: TreeTableNode,
    level: number
}>

type TableColumn = Array<{
    node: TreeTableNode,
    index: number
}>

function getRow (root: TreeTable, index: number): TableRow {
    const row: TableRow = [];
    function iterateChildren (node: TreeTableNode, level: number = 0) {
        level += node.VerticalSpan;
        if (level >= index) {
            row.push({node, level});
            return;
        }
        node.Children.forEach((c) => iterateChildren(c, level))
    }
    root.Children.forEach((c) => iterateChildren(c));
    return row;
}

export function addRowAfter (tree: TreeTable, after: number) {
    if (after === 0) {
        alert('First row has index 1');
        return;
    }
    const prevRow = getRow(tree, after);
    if (!prevRow.length) {
        alert(`No row with index ${after}`);
        return;
    }
    for (let i = 0; i < prevRow.length; i++) {
        const {node, level} = prevRow[i];
        if (level > after) {
            node.VerticalSpan ++
        } else if (node.Children.length) {
            node.Children = node.Children.map(child => createNode([child]));
        } else {
            node.Children = [createNode()];
        }
    }
}

function getColumn (root: TreeTable, index: number): TableColumn {
    let counter = 0;
    let column: TableColumn = [];

    function iterateChildren (node: TreeTableNode, path: TableColumn = []): void {
        if (column.length) {
            return;
        } else if (node.Children.length) {
            node.Children.forEach((c, index) => iterateChildren(c, [...path, { node, index }]))
        } else {
            counter ++;
            if (counter === index) column = [...path, { node, index: -1 }];
        }
    }

    root.Children.forEach((node) => iterateChildren(node));
    return column;
}

export function addColumnAfter (tree: TreeTable, after: number) {
    if (after === 0) {
        alert('First column has index 1');
        return;
    }
    const prevColumn = getColumn(tree, after);
    if (!prevColumn.length) {
        alert(`No column with index ${after}`);
        return;
    }
    let newColumn;
    for (let i = prevColumn.length - 1; i >= 0; i--) {
        const {node, index} = prevColumn[i];
        if (
            node.Children.length === 1 ||
            index === node.Children.length - 1
        ) {
            for (let j = 0; j < node.VerticalSpan; j++) {
                newColumn = createNode(newColumn ? [newColumn] : []);
            }
        } else {
            node.Children.splice(index + 1, 0, newColumn);
            return;
        }
    }
    const index = tree.Children.indexOf(prevColumn[0].node) + 1;
    tree.Children.splice(index, 0, newColumn);
}

function createNode (Children: TreeTableNode[] = []): TreeTableNode {
    return {
        VerticalSpan: 1,
        Value: 'new',
        Color: 'yellow',
        Children
    };
}
