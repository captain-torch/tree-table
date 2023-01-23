import {TreeTable, TreeTableNode} from "./tree";

type TreeNode = {
    Children: TreeTableNode[],
    Value?: string,
    VerticalSpan?: number
};

type TreePathItem = {
    node: TreeNode,
    index: number
}

type TreePath = Array<TreePathItem>


function getRow (root: TreeNode, index: number): TreeNode[] {
    const row: TreeNode[] = [];
    function iterateNodes (node: TreeNode, counter: number = 0) {
        counter += node.VerticalSpan || 1;
        if (counter > index) {
            row.push(node);
            return;
        }
        node.Children.forEach((c) => iterateNodes(c, counter))
    }
    iterateNodes(root);
    return row;
}

function getColumn (root: TreeNode, index: number): TreePath {
    let counter = 0;
    let column: TreePath = [];

    function iterateNodes (node: TreeNode, path: TreePath = []): void {
        if (column.length) {
            return;
        } else if (node.Children.length) {
            node.Children.forEach((c, index) => iterateNodes(c, [...path, { node, index }]))
        } else {
            counter ++;
            if (counter === index) column = path;
        }
    }

    iterateNodes(root);
    return column;
}

export function addColumnAfter (tree: TreeTable, after: number) {
    const path = getColumn(tree, after);
    if (!path.length) {
        alert(`Cannot insert after column ${after}`);
        return;
    }
    let insertTo: TreePathItem | null = null;
    let newColumn = createNode();
    for (let i = path.length - 1; i > 0; i--) {
        if (
            path[i].node.Children.length === 1 ||
            path[i].index === path[i].node.Children.length - 1
        ) {
            for (let j = 0; j < (path[i].node.VerticalSpan || 1); j++) {
                newColumn = { ...createNode(), Children: [newColumn] }
            }
        } else {
            insertTo = path[i];
            break;
        }
    }
    insertTo = insertTo || path[0];
    insertTo.node.Children.splice(insertTo.index + 1, 0, newColumn);
}

export function addRowAfter (tree: TreeTable, after: number) {
    const prevRow = getRow(tree, after);
    if (!prevRow.length) {
        alert(`Cannot insert after row ${after}`);
        return;
    }
    for (let i = 0; i < prevRow.length; i++) {
        if ((prevRow[i].VerticalSpan || 1) > 1) {
            (prevRow[i].VerticalSpan as number) ++
        } else {
            prevRow[i].Children = prevRow[i].Children.map(child => ({
                ...createNode(),
                Children: [child]
            }))
        }
    }
}

function createNode (): TreeTableNode {
    return {
        VerticalSpan: 1,
        Value: 'NEW',
        Color: 'lime',
        Children: []
    };
}
