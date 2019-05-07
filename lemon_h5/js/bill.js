define(["mui"], function(mui) {
    mui.init()
    var rander = function() {
        var OA_task_1 = document.querySelector("#OA_task_1");
        var expend = document.querySelector(".expend");
        var incomes = document.querySelector(".income");
        var surplus = document.querySelector(".surplus");
        var count = document.querySelector(".count");
        var yearCount = document.querySelector(".yearCount");

        //渲染账单
        mui.ajax("/api/selectBill", {
            type: 'get',
            data: {
                uid: "5c343cdce168a573f3fa258a"
            },
            success: function(data) {
                if (data.code == 1) {
                    var html = "";
                    var expendMoney = 0;
                    var incomeMoney = 0;
                    data.msg.forEach(function(file) {
                        html += ` <li class="mui-table-view-cell mui-transitioning mui-selected">
                                <div class="mui-slider-right mui-disabled mui-selected">
                                    <a class="mui-btn mui-btn-red" data-id=${file._id}>删除</a>
                                </div>
                                <div class="mui-slider-handle ullist">
                                    <dl>
                                        <dt class="${file.icon}"></dt>
                                        <dd>
                                            <div>${file.intro}</div>
                                            <div>${file.timer}</div>
                                        </dd>
                                    </dl>`
                        if (file.type == "收入") {
                            html += `    <span class="green">${file.money}</span>`;
                            incomeMoney += file.money * 1

                        } else {
                            html += `    <span class="red">${file.money}</span>`
                            expendMoney += file.money * 1

                        }

                        html += `</div></li>`;
                    })
                    OA_task_1.innerHTML = html;
                    expend.innerHTML = expendMoney;
                    incomes.innerHTML = incomeMoney;
                    surplus.innerHTML = incomeMoney - expendMoney;
                    count.innerHTML = expendMoney;
                    yearCount.innerHTML = incomeMoney
                }
            }
        })



    }
    return {
        rander: rander
    }
})