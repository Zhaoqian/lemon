require(["./config"], function() {
    require(["mui", "picker", "addBill"], function(mui, picker, addBill) {
        // mui.init({
        //     swipeBack: true //启用右滑关闭功能
        // });
        // (function() {
        //     mui('#scroll').scroll({
        //         indicators: true //是否显示滚动条
        //     });
        //     var segmentedControl = document.getElementById('segmentedControl');
        //     mui('.mui-input-group').on('change', 'input', function() {
        //         if (this.checked) {
        //             var styleEl = document.querySelector('input[name="style"]:checked');
        //             var colorEl = document.querySelector('input[name="color"]:checked');
        //             if (styleEl && colorEl) {
        //                 var style = styleEl.value;
        //                 var color = colorEl.value;
        //                 segmentedControl.className = 'mui-segmented-control' + (style ? (' mui-segmented-control-' + style) : '') + ' mui-segmented-control-' + color;
        //             }
        //         }
        //     });
        // })();
        mui.init()
        addBill.addBill()
    })
})