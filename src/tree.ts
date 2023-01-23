export type TreeTableNode = {
    VerticalSpan: number;
    Color: string;
    Value: string;
    Children: TreeTableNode[];
};

export type TreeTable = {
    Name: string;
    Children: TreeTableNode[];
};

export const simpleTable: TreeTable = {
    Name: "SimpleTable",
    Children: [{
        VerticalSpan: 1,
        Color: 'teal',
        Value: '1',
        Children: [{
            VerticalSpan: 1,
            Color: 'teal',
            Value: '4',
            Children: [{
                VerticalSpan: 1,
                Color: 'teal',
                Value: '7',
                Children: []
            }]
        }]
    }, {
        VerticalSpan: 1,
        Color: 'teal',
        Value: '2',
        Children: [{
            VerticalSpan: 1,
            Color: 'teal',
            Value: '5',
            Children: [{
                VerticalSpan: 1,
                Color: 'teal',
                Value: '8',
                Children: []
            }]
        }]
    }, {
        VerticalSpan: 1,
        Color: 'teal',
        Value: '3',
        Children: [{
            VerticalSpan: 1,
            Color: 'teal',
            Value: '6',
            Children: [{
                VerticalSpan: 1,
                Color: 'teal',
                Value: '9',
                Children: []
            }]
        }]
    }]
};

export const onlyHorizontalSpansTable: TreeTable = {
    Name: "SimpleTable",
    Children: [{
        Color: 'teal',
        Value: '1',
        VerticalSpan: 1,
        Children: [{
            Color: 'teal',
            Value: '4',
            VerticalSpan: 1,
            Children: [{
                Color: 'teal',
                Value: '9',
                VerticalSpan: 1,
                Children: []
            }]
        }, {
            Color: 'teal',
            Value: '5',
            VerticalSpan: 1,
            Children: [{
                Color: 'teal',
                Value: '10',
                VerticalSpan: 1,
                Children: []
            }, {
                Color: 'teal',
                Value: '11',
                VerticalSpan: 1,
                Children: []
            }]
        }]
    }, {
        Color: 'teal',
        Value: '2',
        VerticalSpan: 1,
        Children: [{
            Color: 'teal',
            Value: '6',
            VerticalSpan: 1,
            Children: [{
                Color: 'teal',
                Value: '12',
                VerticalSpan: 1,
                Children: []
            }]
        }]
    }, {
        Color: 'teal',
        Value: '3',
        VerticalSpan: 1,
        Children: [{
            Color: 'teal',
            Value: '7',
            VerticalSpan: 1,
            Children: [{
                Color: 'teal',
                Value: '13',
                VerticalSpan: 1,
                Children: []
            }]
        }, {
            Color: 'teal',
            Value: '8',
            VerticalSpan: 1,
            Children: [{
                Color: 'teal',
                Value: '14',
                VerticalSpan: 1,
                Children: []
            }]
        }]
    }]
}

export const defaultTreeTable: TreeTable = {
    Name: "Table",
    Children: [
        {
            VerticalSpan: 1, Color: "Orange", Value: "1",
            Children: [
                {
                    VerticalSpan: 1, Color: "Green", Value: "4",
                    Children: [{ VerticalSpan: 1, Color: "Purple", Value: "7", Children: [] }],
                },
                {
                    VerticalSpan: 1, Color: "Green", Value: "5",
                    Children: [{ VerticalSpan: 1, Color: "Purple", Value: "8", Children: [] }],
                },
            ],
        },
        {
            VerticalSpan: 1, Color: "Orange", Value: "2",
            Children: [{ VerticalSpan: 2, Color: "Green", Value: "6", Children: [] }],
        },
        {
            VerticalSpan: 2, Color: "Orange", Value: "3",
            Children: [
                { VerticalSpan: 1, Color: "Purple", Value: "9", Children: [] },
                { VerticalSpan: 1, Color: "Purple", Value: "10", Children: [] },
            ],
        },
    ]
};
