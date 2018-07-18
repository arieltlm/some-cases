// import * as d3 from "d3";
setChart(data, 'chart');
function setChart(data, id) {
    // 取div宽高
    var width = document.getElementById(id).offsetWidth;
    var height = document.getElementById(id).offsetHeight;

    // 画布margin设置
    var margin = {
        top: 80,
        right: 50,
        bottom: 50,
        left: 50
    };


    var svgWidth = width;
    var svgHeight = height;

    var svg = d3.select('#' + id)
        .append('svg')
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("viewBox", "0 0 " + svgWidth + " " + svgHeight)// 可自适应调整
        // .attr('width', svgWidth)
        // .attr('height', svgHeight)
        .attr('id', 'svg-column');

    // 创建各柱体各个面的颜色数组
    var bar1Color = ['#2093B7', '#0A5772', '#094365'];
    var bar2Color = ['#C8DBFC', '#65A1E8', '#375C95'];

    // addXAxis();
    // x轴
    (function() {
        var transform = d3.geoTransform({
            point: function (x, y) {
                this.stream.point(x, y)
            }
        });
        // 定义几何路径
        var path = d3.geoPath()
            .projection(transform);
        var xLinearScale = d3.scaleBand()
            .domain(data.slice(0, 9).map(function (d) {
                return d.letter;
            }))
            .range([20, svgWidth - margin.right - margin.left], 0.1);
        var xAxis = d3.axisBottom(xLinearScale)
            .tickSize(-svgHeight + margin.top + margin.bottom) // 设置网格线高度
            // .ticks(data.length);// 设置网格线的个数
            .ticks(10);// 设置网格线的个数
        // 绘制X轴
        var xAxisG = svg
            .append("g")
            .attr("class", "inner_line")
            .call(xAxis)
            .style("stroke-width", 1)
            .style("stroke", '#fff')
            .attr("transform", "translate(" + margin.left + "," + (svgHeight - margin.bottom) + ")");
        // 删除原X轴
        xAxisG.select("path").remove();
        // xAxisG.selectAll('line').remove();
        // 绘制新的立体X轴
        xAxisG.append("path")
            .datum({
                type: "Polygon",
                coordinates: [
                    [
                        [10, 0],
                        [0, 15],
                        [svgWidth - margin.right - margin.left, 15],
                        [svgWidth + 10 - margin.right - margin.left, 0],
                        [10, 0]
                    ]
                ]
            })
            .attr("d", path)
            .attr('fill', 'rgb(187,187,187)');
        xAxisG.selectAll('text')
            .attr('font-size', '14px')
            .attr('fill', '#fff')
            .attr('transform', 'translate(0,20)');
        dataProcessing(xLinearScale)// 核心算法
    })();
    // 创建y轴的比例尺渲染y轴
    var yLinearScale;
    // addYScale();
    (function() {
        yLinearScale = d3.scaleLinear()
            .domain([0, d3.max(data, function (d, i) {
                return d.child.value * 1;
            }) * 1.09])
            .range([svgHeight - margin.top - margin.bottom, 0]);
        /* var yLinearScale1 = d3
            .scaleLinear()
            .domain([0, d3.max(data, function(d, i) {
                return d.child.value * 1;
            }) * 1.1])
            .range([svgHeight - margin.top - margin.bottom, 0]); */

        // 定义Y轴比例尺以及刻度
        var yAxisLeft = d3
            .axisLeft(yLinearScale)
            .ticks(10)
            .tickSize(-svgWidth + margin.left + margin.right);

        var yAxisright = d3
            .axisRight(yLinearScale)

            .ticks(d3.max(data, function(d, i) {
                return d.child.value * 1;
            }) / 50)
            .tickSize(-svgWidth + margin.left + margin.right);

        //  绘制Y轴
        var yAxisGleft = svg
            .append("g")
            .attr("class", "inner_line")
            .call(yAxisLeft)
            .style("stroke-width", 1)
            .attr('fill', '#fff')
            .attr("transform", "translate(" + (margin.left + 10) + "," + margin.top + ")");
        var yAxisGright = svg
            .append("g")
            .attr("class", "inner_line")
            .call(yAxisright)
            .attr("transform", "translate(" + (svgWidth - margin.right + 10) + "," + margin.top + ")");

        // y轴上字的样式设置
        yAxisGleft.selectAll('text')
            .attr('font-size', '14px')
            .attr('fill', '#fff');
        yAxisGright.selectAll('text')
            .attr('font-size', '14px')
            .attr('fill', '#fff');

            // 删除原Y轴路径和tick
            // yAxisGleft.select("path").remove();
            // yAxisGright.select("path").remove();
            // yAxisGleft.selectAll('line').remove();
            // yAxisGright.selectAlls("line").remove();
    })();

    // 计算柱体宽以及位置
    function dataProcessing(xLinearScale) {
        var angle = Math.PI / 2.3;
        for (var i = 0; i < data.length; i++) {
            var d = data[i];
            var depth = 5;
            d.ow = xLinearScale.bandwidth() * 0.25;
            d.start = -xLinearScale.bandwidth() * 0.11;
            d.ox = xLinearScale(d.letter);
            d.oh = 1;
            d.p1 = {
                x: Math.cos(angle) * d.ow,
                y: -Math.sin(angle) - depth
            };
            d.p2 = {
                x: d.p1.x + d.ow,
                y: d.p1.y
            };
            d.p3 = {
                x: d.p2.x,
                y: d.p2.y + d.oh
            };
        }
    }
    // tip的创建方法
    var tipTimerConfig = {
        longer: 0,
        target: null,
        exist: false,
        winEvent: window.event,
        boxHeight: 398,
        boxWidth: 376,
        maxWidth: 376,
        maxHeight: 398,
        tooltip: null,
        showTime: 3500,
        hoverTime: 300,
        displayText: "",
        show: function (val, e) {
            "use strict";
            var me = this;
            if (e != null) {
                me.winEvent = e;
            };
            me.displayText = val;
            me.calculateBoxAndShow();
            me.createTimer();
        },
        calculateBoxAndShow: function () {
            "use strict";
            var me = this;
            var _x = 0;
            var _y = 0;
            var _w = document.documentElement.scrollWidth;
            var _h = document.documentElement.scrollHeight;
            var wScrollX = window.scrollX || document.body.scrollLeft;
            var wScrollY = window.scrollY || document.body.scrollTop;
            var xMouse = me.winEvent.x + wScrollX;
            if (_w - xMouse < me.boxWidth) {
                _x = xMouse - me.boxWidth - 10;
            } else {
                _x = xMouse;
            }
            var _yMouse = me.winEvent.y + wScrollY;
            if (_h - _yMouse < me.boxHeight + 18) {
                _y = _yMouse - me.boxHeight - 25;
            } else {
                _y = _yMouse + 18;
            }
            me.addTooltip(_x, _y);
        },
        addTooltip: function (pageX, pageY) {
            "use strict";
            var me = this;
            me.tooltip = document.createElement("div");
            me.tooltip.style.left = pageX + "px";
            me.tooltip.style.top = pageY + "px";
            me.tooltip.style.position = "absolute";
            me.tooltip.style.width = me.boxWidth + "px";
            me.tooltip.style.height = me.boxHeight + "px";
            me.tooltip.className = "three-tooltip";
            var divInnerHeader = me.createInner();
            divInnerHeader.innerHTML = me.displayText;
            me.tooltip.appendChild(divInnerHeader);
            document.body.appendChild(me.tooltip);
        },
        createInner: function () {
            "use strict";
            var me = this;
            var divInnerHeader = document.createElement('div');
            divInnerHeader.style.width = me.boxWidth + "px";
            divInnerHeader.style.height = me.boxHeight + "px";
            return divInnerHeader;
        },
        ClearDiv: function () {
            "use strict";
            var delDiv = document.body.getElementsByClassName("three-tooltip");
            for (var i = delDiv.length - 1; i >= 0; i--) {
                document.body.removeChild(delDiv[i]);
            }
        },
        createTimer: function (delTarget) {
            "use strict";
            var me = this;
            var delTip = me.tooltip;
            delTarget = tipTimerConfig.target;
            var removeTimer = window.setTimeout(function () {
                try {
                    if (delTip != null) {
                        document.body.removeChild(delTip);
                        if (tipTimerConfig.target === delTarget) {
                            me.exist = false;
                        }
                    }
                    clearTimeout(removeTimer);
                } catch (e) {
                    clearTimeout(removeTimer);
                }
            }, me.showTime);
        },
        hoverTimerFn: function (showTip, showTarget) {
            "use strict";
            var me = this;
            showTarget = tipTimerConfig.target;
            var hoverTimer = window.setInterval(function () {
                try {
                    if (tipTimerConfig.target !== showTarget) {
                        clearInterval(hoverTimer);
                    } else if (!tipTimerConfig.exist && (new Date()).getTime() - me.longer > me.hoverTime) {
                        // show
                        tipTimerConfig.show(showTip);
                        tipTimerConfig.exist = true;
                        clearInterval(hoverTimer);
                    }
                } catch (e) {
                    clearInterval(hoverTimer);
                }
            }, tipTimerConfig.hoverTime);
        }
    };
    var createTooltipTableData = function (info) {
        var ary = [];
        ary.push("<div class='tip-hill-div'>");
        ary.push("<h1>" + info.letter + "</h1>");
        ary.push("<h2>货量（千万）: " + info.child.value);
        ary.push("</div>");
        return ary.join("");
    };
    var createTooltipTableData1 = function(info) {
        var ary = [];
        ary.push("<div class='tip-hill-div'>");
        ary.push("<h1>" + info.letter + "</h1>");
        ary.push("<h2>订单量（万）: " + info.child.category);
        ary.push("</div>");
        return ary.join("");
    };

    // 柱体
    function clumnMouseover(d) {
        d3.select(this).selectAll(".transparentPath").attr("opacity", 0.8);
        // 添加 div
        tipTimerConfig.target = this;
        tipTimerConfig.longer = new Date().getTime();
        tipTimerConfig.exist = false;
        // 获取坐标
        tipTimerConfig.winEvent = {
            x: event.clientX - 100,
            y: event.clientY
        };
        tipTimerConfig.boxHeight = 50;
        tipTimerConfig.boxWidth = 140;
        // hide
        tipTimerConfig.ClearDiv();
        // show
        tipTimerConfig.hoverTimerFn(createTooltipTableData(d));
    }
    function clumnMouseover1(d) {
        d3.select(this)
            .selectAll(".transparentPath")
            .attr("opacity", 0.8);
        // 添加 div
        tipTimerConfig.target = this;
        tipTimerConfig.longer = new Date().getTime();
        tipTimerConfig.exist = false;
        // 获取坐标
        tipTimerConfig.winEvent = { x: event.clientX - 100, y: event.clientY };
        tipTimerConfig.boxHeight = 50;
        tipTimerConfig.boxWidth = 140;
        // hide
        tipTimerConfig.ClearDiv();
        // show
        tipTimerConfig.hoverTimerFn(createTooltipTableData1(d));
    }
    function clumnMouseout(d) {
        d3.select(this).selectAll(".transparentPath").attr("opacity", 1);
        tipTimerConfig.target = null;
        tipTimerConfig.ClearDiv();
    }
    var g = svg.selectAll('.g')
        .data(data.slice(0, 9))
        .enter()
        .append('g')
        .on("mouseover", clumnMouseover)
        .on("mouseout", clumnMouseout)
        .attr('transform', function (d) {
            return "translate(" + (d.ox + margin.left + 20) + "," + (svgHeight - margin.bottom + 15) + ")"
    });
    g.transition()
        .duration(2500)
        .attr("transform", function (d) {
            return "translate(" + (d.ox + margin.left + 20) + ", " + (yLinearScale(d.child.value) + margin.bottom + margin.top / 2) + ")"
    });

    // var initLeft = -8;
    g.append("rect")
        .attr("x", function(d, i) {
            return d.start;
        })
        .attr("y", 0)
        .attr("class", "transparentPath")
        .attr("class", "inner_line")
        .attr("width", function(d, i) {
            return d.ow;
        })
        .attr("height", function(d) {
            return d.oh;
        })
        .style("fill", function(d, i) {
            // TODO by tlm
            return bar1Color[0];
        })
        .transition()
        .duration(2500)
        .attr("height", function(d, i) {
            return svgHeight - margin.bottom - margin.top - yLinearScale(d.child.value);
    });
    g.append('path')
        .attr("class", "transparentPath")
        .attr('d', function (d) {
            // return "M0,0 L" + d.p1.x + "," + d.p1.y + " L" + d.p2.x + "," + d.p2.y + " L" + d.ow + ",0 L0,0";
            return "M" + (d.start) + ",0 L" + (d.p1.x + d.start) + "," + d.p1.y + " L" + (d.p2.x + d.start) + "," + d.p2.y + " L" + (d.ow + d.start) + ",0 L" + d.start + ",0";
        })
        .style('fill', function (d, i) {
            return bar1Color[1];
            // return topColorList[i]
    });
    g.append('path')
        .attr("class", "transparentPath")
        .attr('d', function (d) {
            // return "M" + d.ow + ",0 L" + d.p2.x + "," + d.p2.y + " L" + d.p3.x + "," + d.p3.y + " L" + d.ow + "," + d.oh + " L" + d.ow + ",0"
            return "M" + (d.ow + d.start) + ",0 L" + (d.p2.x + d.start) + "," + d.p2.y + " L" + (d.p3.x + d.start) + "," + d.p3.y + " L" + (d.ow + d.start) + "," + d.oh + " L" + (d.ow + d.start) + ",0";
        })
        .style('fill', function (d, i) {
            // return rightColorList[i]
            return bar1Color[2];
        })
        .transition()
        .duration(2500)
        .attr("d", function (d, i) {
            // return "M" + d.ow + ",0 L" + d.p2.x + "," + d.p2.y + " L" + d.p3.x + "," + (d.p3.y + svgHeight - margin.top - margin.bottom - yLinearScale(d.child.value)) + " L" + d.ow + "," + (svgHeight - margin.top - margin.bottom - yLinearScale(d.child.value)) + " L" + d.ow + ",0"
            return "M" + (d.ow + d.start) + ",0 L" + (d.p2.x + d.start) + "," + d.p2.y + " L" + (d.p3.x + d.start) + "," + (d.p3.y + svgHeight - margin.top - margin.bottom - yLinearScale(d.child.value)) + " L" + (d.ow + d.start) + "," + (svgHeight - margin.top - margin.bottom - yLinearScale(d.child.value)) + " L" + (d.ow + d.start) + ",0";
    });
    var g1 = svg
        .selectAll(".g")
        .data(data.slice(0, 9))
        .enter()
        .append("g")
        .on("mouseover", clumnMouseover1)
        .on("mouseout", clumnMouseout)
        .attr("transform", function(d) {
            return "translate(" + (d.ox + margin.left + 20) + "," + (svgHeight - margin.bottom + 15) + ")";
    });
    g1.transition()
        .duration(2500)
        .attr("transform", function (d) {
            return "translate(" + (d.ox + margin.left + 20) + ", " + (yLinearScale(d.child.category) + margin.bottom + margin.top / 2) + ")"
    });

    var initInterval = 0;// 初始间隔
    g1.append("rect")
        .attr("x", function (d, i) {
            return d.ow + initInterval;
        })
        .attr("y", 0)
        .attr("class", "transparentPath")
        .attr("width", function (d, i) {
            return d.ow;
        })
        .attr("height", function (d) {
            return d.oh;
        })
        .style("fill", function (d, i) {
            return bar2Color[0];
        })
        .transition()
        .duration(2500)
        .attr("height", function (d, i) {
            return svgHeight - margin.bottom - margin.top - yLinearScale(d.child.category);
    });
    g1.append('path')
        .attr("class", "transparentPath")
        .attr('d', function (d) {
            return "M" + (d.ow + initInterval) + ",0 L" + (d.p1.x + d.ow + initInterval) + "," + d.p1.y + " L" + (d.p2.x + d.ow + initInterval) + "," + d.p2.y + " L" + (d.ow + d.ow + initInterval) + ",0 L" + (d.ow + initInterval) + ",0";
        })
        .style('fill', function (d, i) {
            return bar2Color[1];
            // return topColorList[i]
    });
    g1.append('path')
        .attr("class", "transparentPath")
        .attr('d', function (d) {
            return "M" + (d.ow + d.ow + initInterval) + ",0 L" + (d.p2.x + d.ow + initInterval) + "," + d.p2.y + " L" + (d.p3.x + d.ow + initInterval) + "," + d.p3.y + " L" + (d.ow + d.ow + initInterval) + "," + d.oh + " L" + (d.ow + d.ow + initInterval) + ",0";
        })
        .style('fill', function (d, i) {
            return bar2Color[2];
        })
        .transition()
        .duration(2500)
        .attr("d", function (d, i) {
            return "M" + (d.ow + d.ow + initInterval) + ",0 L" + (d.p2.x + d.ow + initInterval) + "," + d.p2.y + " L" + (d.p3.x + d.ow + initInterval) + "," + (d.p3.y + svgHeight - margin.top - margin.bottom - yLinearScale(d.child.category)) + " L" + (d.ow + d.ow + initInterval) + "," + (svgHeight - margin.top - margin.bottom - yLinearScale(d.child.category)) + " L" + (d.ow + d.ow + initInterval) + ",0";
    });

    // legend
    var keys = ['订单量（万）', '货量（千万）']
    var z = d3.scaleOrdinal()
        .range(["#C8DBFC", "#2093B7"]);

    var legend = svg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(keys)
        .enter().append("g")
        .attr("transform", function (d, i) { return "translate(" + i * 100 + ",10)"; });

    legend.append("rect")
        .attr("x", 19)
        .attr("y", 27)
        .attr("width", 19)
        .attr("height", 5)
        .attr("fill", z);

    legend.append("text")
        .attr("x", 125)
        .attr("y", 28)
        .attr("dy", "0.5em")
        .attr("font-size", 14)
        .attr("fill", z)
        .text(function (d) {
            return d;
    });

    //  title
    var title = svg.append("g")
        .attr("font-family", "Microsoft Yahei")
        .attr("font-size", 18)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(['当月公司订单量/货量统计图'])
        .enter().append("g")
        .attr("transform", function (d, i) { return "translate(" + i * 90 + ",0)"; });
    title.append('text')
        .attr("x", svgWidth / 2 + margin.left + margin.right + 20)
        .attr("y", 15)
        .attr("dy", "0.32em")
        .style("fill", '#fff')
        .text(function (d) { return d; });
}
