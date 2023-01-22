import {TreeTable, TreeTableNode} from "./tree";

function getRow (root: TreeTableNode | TreeTable, index: number): TreeTableNode[] {
    if (index === 0) {
        return root.Children
    }
    index--;
    return root.Children.map(c => getRow(c, index)).flat(1)
}

function countRows (root: TreeTableNode | TreeTable): number {
    let counter = 0;
    while (root.Children.length > 0) {
        counter++;
        root = root.Children[0];
    }
    return counter;
}

export function addColumnAfter (tree: TreeTable, after: number) {
    let columnRoot: TreeTableNode = createNode();
    for (let i = 0; i < countRows(tree) - 1; i++) {
        const newRoot = createNode();
        newRoot.Children = [columnRoot];
        columnRoot = newRoot;
    }
    tree.Children.splice(after, 0, columnRoot);
}

export function addRowAfter (tree: TreeTable, after: number) {
    const prevRow = getRow(tree, after - 1);
    prevRow.forEach(parent => {
        parent.Children = parent.Children.map(child => ({
            ...createNode(),
            Children: [child]
        }))
    })
}

function createNode (): TreeTableNode {
    return {
        VerticalSpan: 1,
        Value: 'NEW',
        Color: 'lime',
        Children: []
    };
}
