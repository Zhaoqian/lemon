require.config({
    paths: {
        "mui": "./libs/mui.min",
        "add": "./add",
        "picker": "./libs/mui.picker.min",
        "addBill": "./addBill"
    },
    shim: {
        'picker': {
            deps: ["mui"],

        },
        "addBill": {
            deps: ["mui"]
        }
    }
})