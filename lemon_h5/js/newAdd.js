require(["./config"], function() {
    require(["mui"], function(mui) {
        mui.init();
        // 渲染数据
        var item = document.querySelector(".mui-slider-item");
        var defaults = document.querySelector(".default");
        var foot = document.querySelector(".foot");
        var classify = document.querySelector(".classify");
        var iconName = "";
        mui.ajax("/api/iconlist", {
                type: "get",
                success: function(data) {
                    if (data.code == 1) {
                        var html = "";
                        data.msg.forEach(function(file) {
                            html += ` <dl class="customer">
                                    <dt class="${file.icon_name}"></dt>
                                </dl>`
                        })
                        iconName = data.msg[0].icon_name;
                        defaults.className = iconName + " default"
                        item.innerHTML = html
                    }
                }
            })
            //选择图标
        mui(item).on("tap", "dl", function() {
            iconName = this.children[0].className
            defaults.className = iconName + " default"

        })

        //点击保存
        foot.onclick = function() {
            if (classify.value == "") {
                mui.alert("请输入描述")
            } else {
                var search = location.search.split("=")[1];
                var uid = "5c343cdce168a573f3fa258a",
                    c_name = classify.value,
                    c_icon = iconName,
                    c_type = decodeURIComponent(search);
                mui.ajax("/api/addClassify", {
                    type: "post",
                    data: {
                        uid: uid,
                        c_name: c_name,
                        c_icon: c_icon,
                        c_type: c_type
                    },
                    success: function(data) {
                        if (data.code == 1) {
                            alert(data.msg)
                            location.href = "/addclass.html"
                        }
                    }
                })


            }
        }

    })
})