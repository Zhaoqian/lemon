require(["./config"], function() {
    require(["mui", "bill", "add", "picker"], function(mui, bill, add, picker) {



        var getYear = document.querySelector(".getYear");
        var getTimer = document.querySelector(".getTimer");
        var clickM = document.querySelector(".clickM");
        var clicknow = document.querySelector(".clicknow");
        var OA_task_1 = document.querySelector("#OA_task_1");
        var expend = document.querySelector(".expend");
        var incomes = document.querySelector(".income");
        var surplus = document.querySelector(".surplus");
        var txt = "";
        var pickers = null;
        var dtPicker = null;
        var yearTime = new Date().getFullYear();
        var monthTime = new Date().getMonth() + 1;
        var text = '月';

        function init() {
            // mui.init()


            loadTime();

            getMYtimer();
        }

        function zm() {
            mui('#OA_task_1').on('tap', '.mui-btn', function(event) {
                var elem = this;
                var li = elem.parentNode.parentNode;
                var id = elem.dataset.id;
                mui.confirm('确认删除该条记录？', 'Hello MUI', btnArray, function(e) {
                    if (e.index == 0) {
                        mui.ajax("/api/deleteBill", {
                            type: "get",
                            data: { id: id },
                            success: function(data) {
                                console.log(data)
                                if (data.code == 1) {
                                    alert(data.msg);
                                    location.reload()
                                }
                            }
                        })

                    } else {
                        setTimeout(function() {
                            mui.swipeoutClose(li);
                        }, 0);
                    }
                });
            });
            var btnArray = ['确认', '取消'];


        }
        bill.rander();
        add.add()

        function loadTime() {
            pickers = new mui.PopPicker();
            pickers.setData([{ value: 'month', text: '月' }, { value: 'year', text: '年' }]);

            dtPicker = new mui.DtPicker({ type: 'month' }) //设置日历初始视图模式 

            monthTime = monthTime < 10 ? '0' + monthTime : monthTime;

            getTimer.innerHTML = yearTime + '-' + monthTime;
        }

        function getMYtimer() {
            var _monthH5 = document.querySelector("[data-id=title-m]"),
                _yearH5 = document.querySelector("[data-id=title-y]"),
                _mPicker = document.querySelector("[data-id=picker-m]"),
                _yPicker = document.querySelector("[data-id=picker-y]");
            clickM.addEventListener("tap", function() {
                pickers.show(function(selectItems) {
                    text = selectItems[0].text; //状态值       
                    getYear.innerHTML = text; //月。/年
                    if (text == "月") {
                        getTimer.innerHTML = yearTime + '-' + monthTime;

                        _monthH5.style.display = 'inline-block';

                        _mPicker.style.display = 'inline-block';

                        _yearH5.style.width = '50%';

                        _yPicker.style.width = '50%';

                    } else {

                        getTimer.innerHTML = yearTime;

                        _monthH5.style.display = 'none';

                        _mPicker.style.display = 'none';

                        _yearH5.style.width = '100%';

                        _yPicker.style.width = '100%';

                    }
                })
            })

            //点击日期
            clicknow.addEventListener('tap', function() {
                dtPicker.show(function(selectItems) {
                    console.log(text)
                    if (text === '月') {
                        getTimer.innerHTML = selectItems.y.value + '-' + selectItems.m.value;
                        randerTime(getTimer.innerHTML)
                    } else {
                        getTimer.innerHTML = selectItems.y.value;
                        randerTime(getTimer.innerHTML)
                    }

                })
            })


        }
        //根据时间渲染数据
        function randerTime(type) {
            mui.ajax("/api/selectBill", {
                type: "get",
                data: {
                    uid: "5c343cdce168a573f3fa258a",
                    type: type
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
                        surplus.innerHTML = incomeMoney - expendMoney


                    }
                }
            })
        }

        init()

    })
})