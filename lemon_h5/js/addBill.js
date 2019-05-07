define(["mui"], function() {
    var addBill = function() {

        mui.init()
            //输入金额

        var moneys = document.querySelector(".money");
        var counters = document.querySelector(".counter");
        var addTime = document.querySelector(".addTime");
        var timeHtml = document.querySelector(".timeHtml");
        var muiItem = document.querySelector(".mui-slider-item");
        // var muiItemDl = document.querySelectorAll(".mui-slider-group dl");

        mui(counters).on("tap", "span", function() {
            var text = this.innerHTML;
            if (text == "X") {
                if (moneys.value == "0:00") {
                    moneys.value = "0:00"
                } else {
                    moneys.value = moneys.value.substr(0, moneys.value.length - 1);
                    if (moneys.value.length == 0) {
                        moneys.value = "0:00"
                    }
                }
            } else if (moneys.value == "0:00") {
                moneys.value = text;
            } else if (moneys.value.includes(".") && text == ".") {
                moneys.value = moneys.value;
            } else if (moneys.value.includes(".") && moneys.value.split(".")[1].length == 2) {
                moneys.value = moneys.value
            } else {
                moneys.value += text

            }

        })
        mui(counters).on("tap", ".finesh", function() {
            if (moneys.value == "0:00") {
                alert("请输入有效金额")
            } else {
                addBill()
            }
        })
        addTime.addEventListener("tap", function() {
            var dtpicker = new mui.DtPicker({
                type: "date", //设置日历初始视图模式 

            })
            dtpicker.show(function(e) {
                timeHtml.innerHTML = e.y.value + "-" +
                    e.m.value + "-" + e.d.value;
            })
        }, false)

        //点击图标

        var controls = document.querySelectorAll(".type a");


        var control = "支出";
        for (var j = 0; j < controls.length; j++) {
            controls[j].onclick = function() {
                control = this.innerHTML.trim();
                for (var m = 0; m < controls.length; m++) {
                    controls[m].classList.remove("mui-active")
                }
                this.classList.add("mui-active")
                randerBill()

            }
        }

        //添加账单
        function addBill() {
            for (var i = 0; i < muiItemDl.length; i++) {
                if (muiItemDl[i].firstElementChild.classList.contains("active")) {
                    var names = muiItemDl[i].firstElementChild.className.split(" ")[0] + " " + muiItemDl[0].firstElementChild.className.split(" ")[1],
                        intors = muiItemDl[i].lastElementChild.innerHTML;
                }

            }

            var uid = "5c343cdce168a573f3fa258a",
                icon = names, //图标类名
                money = moneys.value,
                type = control, //收入或支出
                intro = intors,
                timer = timeHtml.innerHTML;
            mui.ajax("/api/addBill", {
                type: "post",
                data: {
                    uid: uid,
                    icon: icon,
                    money: money,
                    type: type,
                    intro: intro,
                    timer: timer
                },
                success: function(data) {
                    if (data.code == 1) {
                        alert(data.msg);
                        location.href = "/"
                    }
                }

            })
        }

        //渲染支出和收入
        randerBill()

        function randerBill() {

            var group = document.querySelector(".mui-slider-item");
            group.innerHTML = `<dl class="customer">
                                <dt class="mui-icon mui-icon-plusempty "></dt>
                                <dd>自定义</dd>
                            </dl>`;
            var customer = document.querySelector(".customer")
            mui.ajax("/api/getClassify", {
                type: "post",
                data: {
                    uid: "5c343cdce168a573f3fa258a",
                    type: control
                },
                success: function(data) {

                    data.msg.forEach(function(file, i) {
                        var html = document.createElement("dl");

                        html.innerHTML = `
                                    <dt class="${file.c_icon}"></dt>
                                        <dd>${file.c_name}</dd> 
                                `
                        group.insertBefore(html, customer)
                    })
                    group.children[0].firstElementChild.classList.add("active");

                }
            })
        }
        mui(muiItem).on("tap", "dl", function() {
            for (var i = 0; i < muiItem.children.length; i++) {
                muiItem.children[i].firstElementChild.classList.remove("active")
            }
            this.firstElementChild.classList.add("active");

        })

        //新建收支大类
        mui(muiItem).on('tap', "dl", function() {
            if (this.classList.contains("customer")) {
                location.href = "/newAdd.html?type=" + control

            }

        })

    }
    return {
        addBill: addBill
    }
})