import Calc from './lib/functions/calc.js';
import currentOperations from './lib/modules/currentOperations.js';

// Setup charts
const optionsFarmTemp = {
    chart: {
        type: "line",
        id: "realtime",
        width: "100%",
        height: "90%",
        animations: {
            enabled: false,
        },
        toolbar: {
            show: false,
        },
        zoom: {
            enabled: false,
        },
        background: "#303030",
    },
    colors: ["#fcc329", "#ff1500", "#009cff", "#ff1800", "#37ff00", "#ff1800"],
    stroke: {
        curve: "smooth",
    },
    toolbar: {
        show: false,
    },
    theme: {
        mode: "dark",
    },
    noData: {
        text: "Loading...",
    },
    series: [],
    yaxis: [
        {
            title: {
                text: "Temp",
            },
            seriesName: "Actual Tool",
            labels: {
                formatter(value) {
                    return `${value}°C`;
                },
            },
        },
        {
            seriesName: "Actual Tool",
            show: false,
            labels: {
                formatter(value) {
                    return `${value}°C`;
                },
            },
        },
        {
            seriesName: "Actual Tool",
            show: false,
            labels: {
                formatter(value) {
                    return `${value}°C`;
                },
            },
        },
        {
            seriesName: "Actual Tool",
            show: false,
            labels: {
                formatter(value) {
                    return `${value}°C`;
                },
            },
        },
        {
            seriesName: "Actual Tool",
            show: false,
            labels: {
                formatter(value) {
                    return `${value}°C`;
                },
            },
        },
        {
            seriesName: "Actual Tool",
            show: false,
            labels: {
                formatter(value) {
                    return `${value}°C`;
                },
            },
        },
    ],
    xaxis: {
        type: "datetime",
        labels: {
            formatter(value) {
                const date = new Date(value);
                return date.toLocaleTimeString();
            },
        },
    },
};
const optionsHeatChart = {
    chart: {
        type: "heatmap",
        id: "realtime",
        width: "100%",
        height: "90%",
        animations: {
            enabled: true,
            easing: "linear",
            dynamicAnimation: {
                speed: 1000,
            },
        },
        toolbar: {
            show: false,
        },
        zoom: {
            enabled: false,
        },
        background: "#303030",
    },
    theme: {
        mode: "dark",
    },
    noData: {
        text: "Loading...",
    },
    series: [],
    dataLabels: {
        enabled: true,
        formatter(val) {
            return `${Math.round(val * 10) / 10}%`;
        },
        style: {
            fontSize: "14px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: "bold",
            colors: ["#000000"],
        },
    },
    stroke: {
        show: true,
        curve: "smooth",
        lineCap: "butt",
        colors: ["#303030"],
        width: 2,
        dashArray: 0,
    },
    plotOptions: {
        heatmap: {
            shadeIntensity: 0.7,
            radius: 0,
            useFillColorAsStroke: false,
            colorScale: {
                ranges: [
                    {
                        from: 0,
                        to: 1,
                        name: "none",
                        color: "#444",
                    },
                    {
                        from: 1.1,
                        to: 25,
                        name: "low",
                        color: "#375a7f",
                    },
                    {
                        from: 25.1,
                        to: 60,
                        name: "medium",
                        color: "#f39c12",
                    },
                    {
                        from: 60.1,
                        to: 75,
                        name: "high",
                        color: "#00bc8c",
                    },
                    {
                        from: 75.1,
                        to: 100,
                        name: "extreme",
                        color: "#e74c3c",
                    },
                ],
            },
        },
    },
    tooltip: {
        y: {
            formatter(val) {
                return `${Math.round(val * 10) / 10}%`;
            },
        },
    },
    xaxis: {
        reversed: true,
    },
};
const optionsRadar = {
    series: [],
    chart: {
        type: "bar",
        width: "100%",
        height: "85%",
        toolbar: {
            show: false,
        },
        animations: {
            enabled: false,
        },
        background: "#303030",
    },
    theme: {
        mode: "dark",
    },
    plotOptions: {
        bar: {
            horizontal: true,
        },
    },
    noData: {
        text: "Loading...",
    },
    dataLabels: {
        enabled: false,
        formatter(val) {
            return val;
        },
    },
    xaxis: {
        categories: ["Active", "Complete", "Idle", "Disconnected", "Offline"],
    },
    tooltip: {
        theme: "dark",
        x: {
            show: false,
        },
        y: {
            title: {
                formatter(val, opt) {
                    return `${opt.w.globals.labels[opt.dataPointIndex]}:  `;
                },
            },
        },
    },
};
const optionsUtilisation = {
    chart: {
        type: "donut",
        width: "100%",
        height: "100%",
        animations: {
            enabled: true,
        },
        background: "#303030",
    },
    theme: {
        mode: "dark",
    },
    plotOptions: {
        pie: {
            expandOnClick: false,
            dataLabels: {
                offset: 10,
                minAngleToShowLabel: 15,
            },
        },
    },
    stroke: {
        show: false,
    },
    tooltip: {
        y: {
            formatter(val) {
                return `${Math.round(val * 10) / 10}%`;
            },
        },
    },
    noData: {
        text: "Loading...",
    },
    dataLabels: {
        enabled: false,
    },
    series: [],
    labels: ["Active", "Idle", "Offline"],
    colors: ["#00bc8c", "#444", "#e74c3c"],
    legend: {
        show: true,
        showForSingleSeries: false,
        showForNullSeries: true,
        showForZeroSeries: true,
        position: "bottom",
        horizontalAlign: "center",
        floating: false,
        fontSize: "11px",
        fontFamily: "Helvetica, Arial",
        fontWeight: 400,
        formatter: undefined,
        inverseOrder: false,
        width: undefined,
        height: undefined,
        tooltipHoverFormatter: undefined,
        offsetX: -25,
        offsetY: 0,
        labels: {
            colors: undefined,
            useSeriesColors: false,
        },
        markers: {
            width: 9,
            height: 9,
            strokeWidth: 0,
            strokeColor: "#fff",
            fillColors: undefined,
            radius: 1,
            customHTML: undefined,
            onClick: undefined,
            offsetX: 0,
            offsetY: 0,
        },
        itemMargin: {
            horizontal: 1,
            vertical: 0,
        },
        onItemClick: {
            toggleDataSeries: false,
        },
        onItemHover: {
            highlightDataSeries: false,
        },
    },
};
const optionsEnviromentalData = {
    chart: {
        type: "line",
        id: "realtime",
        height: "90%",
        width: "100%",
        animations: {
            enabled: false,
        },
        toolbar: {
            show: false,
        },
        zoom: {
            enabled: false,
        },
        background: "#303030",
    },
    colors: ["#ff1500", "#324bca", "#caa932", "#49ca32"],
    stroke: {
        curve: "smooth",
    },
    toolbar: {
        show: true,
    },
    theme: {
        mode: "dark",
    },
    noData: {
        text: "Loading...",
    },
    series: [],
    yaxis: [
        {
            title: {
                text: "Temp",
            },
            seriesName: "Temperature",
            labels: {
                formatter(value) {

                    if(value === null) {
                        return '';
                    }else{
                        return `${value}°C`;
                    }
                },
            },
            min: 0,
            max: 45,
        },
        {
            title: {
                text: "Humidity",
            },
            opposite: true,
            seriesName: "Humidity",
            show: true,
            labels: {
                formatter(value) {
                    if(value === null) {
                        return '';
                    }else{
                        return `${value} %`;
                    }

                },
            },
            min: 0,
            max: 100,
        },
        {
            title: {
                text: "Pressure",
            },
            opposite: true,
            seriesName: "Pressure",
            show: true,
            labels: {
                formatter(value) {
                    if(value === null) {
                        return '';
                    }else{
                        return `${value} Pa`;
                    }

                },
            },
            min: 0,
            max: 1100,
        },
        {
            title: {
                text: "Indoor Air Quality",
            },
            opposite: false,
            seriesName: "IAQ",
            show: true,
            min: 0,
            max: 100,
            labels: {
                formatter(value) {
                    let state = null;
                    if(value === null) {
                        return '';
                    } else {
                        if(Calc.isBetween(value, 0, 10)){
                            state = "Excellent";
                        }
                        if(Calc.isBetween(value, 11, 30)){
                            state = "Good";
                        }
                        if(Calc.isBetween(value, 31, 45)){
                            state = "Lightly Polluted";
                        }
                        if(Calc.isBetween(value, 46, 60)){
                            state = "Moderately Polluted";
                        }
                        if(Calc.isBetween(value, 61, 75)){
                            state = "Heavily Polluted";
                        }
                        if(Calc.isBetween(value, 76, 89)){
                            state = "Severely Polluted";
                        }
                        if(Calc.isBetween(value, 90, 100)){
                            state = "Extemely Polluted";
                        }
                    }
                    return `${value}%: ${state}`;
                },

            },
        },
    ],

    xaxis: {
        type: "datetime",
        labels: {
            formatter(value) {
                const date = new Date(value);
                const formatTime = date.toLocaleTimeString();
                return formatTime;
            },
        },
    },
    annotations: {
        position: 'front' ,
        yaxis: [
            {
                y: 0,
                y2: 10,
                yAxisIndex: 3,
                borderColor: '#24571f',
                fillColor: '#133614',
            },
            {
                y: 11,
                y2: 30,
                yAxisIndex: 3,
                borderColor: '#1f574f',
                fillColor: '#153b35',
            },
            {
                y: 31,
                y2: 45,
                yAxisIndex: 3,
                borderColor: '#213a5c',
                fillColor: '#15253b',
            },
            {
                y: 46,
                y2: 60,
                yAxisIndex: 3,
                borderColor: '#21225c',
                fillColor: '#15153b',
            },
            {
                y: 61,
                y2: 75,
                yAxisIndex: 3,
                borderColor: '#37215c',
                fillColor: '#23153b',
            },
            {
                y: 76,
                y2: 89,
                yAxisIndex: 3,
                borderColor: '#4c215c',
                fillColor: '#2e1438',
            },
            {
                y: 90,
                y2: 100,
                yAxisIndex: 3,
                borderColor: '#5e2222',
                fillColor: '#381414',
            }
        ]
    }
};

let enviromentalData, systemFarmTemp, activityHeatChart, currentActivityChart, currentUtilisation;

if(document.querySelector("#enviromentalHistory")){
    enviromentalData = new ApexCharts(
        document.querySelector("#enviromentalHistory"),
        optionsEnviromentalData
    );
    enviromentalData.render();
}
if(document.querySelector("#farmTempMap")){
    systemFarmTemp = new ApexCharts(
        document.querySelector("#farmTempMap"),
        optionsFarmTemp
    );
    systemFarmTemp.render();
}
if(document.querySelector("#daysActivityHeatMap")){
    activityHeatChart = new ApexCharts(
        document.querySelector("#daysActivityHeatMap"),
        optionsHeatChart
    );
    activityHeatChart.render();
}
if(document.querySelector("#currentActivity")){
    currentActivityChart = new ApexCharts(
        document.querySelector("#currentActivity"),
        optionsRadar
    );
    currentActivityChart.render();
}
if(document.querySelector("#currentUtilisation")){
    currentUtilisation = new ApexCharts(
        document.querySelector("#currentUtilisation"),
        optionsUtilisation
    );
    currentUtilisation.render();
}

let worker = null;

// Setup webWorker
if (window.Worker) {
    // Yes! Web worker support!
    try {
        if (worker === null) {
            worker = new Worker("./js/lib/modules/workers/dashboardWorker.js");
            worker.onmessage = function (event) {
                if (event.data != false) {
                    const currentOperationsData = event.data.currentOperations;
                    const printerInfo = event.data.printerInformation;
                    const dashboard = event.data.dashStatistics;
                    const dashboardSettings = event.data.dashboardSettings;
                    if(dashboardSettings.farmActivity.currentOperations){
                        currentOperations(
                            currentOperationsData.operations,
                            currentOperationsData.count,
                            printerInfo
                        );
                    }

                    dashUpdate.farmInformation(
                        dashboard.timeEstimates,
                        dashboard.utilisationGraph,
                        dashboard.temperatureGraph,
                        dashboardSettings
                    );
                    if(dashboardSettings.farmUtilisation.farmUtilisation){
                        dashUpdate.farmUtilisation(dashboard.farmUtilisation);
                    }

                    dashUpdate.currentActivity(
                        dashboard.currentStatus,
                        dashboard.currentUtilisation,
                        dashboardSettings.printerStates.currentStatus,
                        dashboardSettings.farmUtilisation.currentUtilisation
                    );

                    if(dashboardSettings.printerStates.printerState){
                        dashUpdate.printerStatus(dashboard.printerHeatMaps.heatStatus);
                    }
                    if(dashboardSettings.printerStates.printerProgress){
                        dashUpdate.printerProgress(dashboard.printerHeatMaps.heatProgress);
                    }
                    if(dashboardSettings.printerStates.printerTemps){
                        dashUpdate.printerTemps(dashboard.printerHeatMaps.heatTemps);
                    }
                    if(dashboardSettings.printerStates.printerUtilisation){
                        dashUpdate.printerUptime(dashboard.printerHeatMaps.heatUtilisation);
                    }


                    if(dashboardSettings.historical.environmentalHistory){
                        dashUpdate.envriromentalData(dashboard.enviromentalData);
                    }

                }
            };
        }
    } catch (e) {
        console.log(e);
    }
} else {
    // Sorry! No Web Worker support..
    console.log("Web workers not available... sorry!");
}

class dashUpdate {
    static envriromentalData(data, iaq){
        enviromentalData.updateSeries(data);
    }
    static printerStatus(data) {
        const currentStatus = document.getElementById("currentStatus");
        currentStatus.innerHTML = "";
        for (let d = 0; d < data.length; d++) {
            currentStatus.insertAdjacentHTML("beforeend", data[d]);
        }
    }

    static printerProgress(data) {
        const currentStatus = document.getElementById("currentProgress");
        currentStatus.innerHTML = "";
        for (let d = 0; d < data.length; d++) {
            currentStatus.insertAdjacentHTML("beforeend", data[d]);
        }
    }

    static printerTemps(data) {
        const currentStatus = document.getElementById("currentTemps");
        currentStatus.innerHTML = "";
        for (let d = 0; d < data.length; d++) {
            currentStatus.insertAdjacentHTML("beforeend", data[d]);
        }
    }

    static printerUptime(data) {
        const currentStatus = document.getElementById("currentUptime");
        currentStatus.innerHTML = "";
        for (let d = 0; d < data.length; d++) {
            currentStatus.insertAdjacentHTML("beforeend", data[d]);
        }
    }

    static farmInformation(farmInfo, heatMap, temperatureGraph, dashboardSettings) {

        if(dashboardSettings.farmActivity.averageTimes){
            document.getElementById("avgEstimatedTime").innerHTML = Calc.generateTime(
                farmInfo.averageEstimated
            );
            document.getElementById("avgRemainingTime").innerHTML = Calc.generateTime(
                farmInfo.averageRemaining
            );
            document.getElementById("avgElapsedTime").innerHTML = Calc.generateTime(
                farmInfo.averageElapsed
            );
            avgRemainingProgress.style.width = `${Calc.toFixed(
                farmInfo.averagePercentRemaining,
                2
            )}%`;
            avgRemainingProgress.innerHTML = `${Calc.toFixed(
                farmInfo.averagePercentRemaining,
                2
            )}%`;
            avgElapsed.style.width = `${Calc.toFixed(farmInfo.averagePercent, 2)}%`;
            avgElapsed.innerHTML = `${Calc.toFixed(farmInfo.averagePercent, 2)}%`;

        }

        if(dashboardSettings.farmActivity.cumulativeTimes){
            document.getElementById("cumEstimatedTime").innerHTML = Calc.generateTime(
                farmInfo.totalEstimated
            );
            document.getElementById("cumRemainingTime").innerHTML = Calc.generateTime(
                farmInfo.totalRemaining
            );
            document.getElementById("cumElapsedTime").innerHTML = Calc.generateTime(
                farmInfo.totalElapsed
            );


            cumRemainingProgress.style.width = `${Calc.toFixed(
                farmInfo.cumulativePercentRemaining,
                2
            )}%`;
            cumRemainingProgress.innerHTML = `${Calc.toFixed(
                farmInfo.cumulativePercentRemaining,
                2
            )}%`;
            cumElapsed.style.width = `${Calc.toFixed(farmInfo.cumulativePercent, 2)}%`;
            cumElapsed.innerHTML = `${Calc.toFixed(farmInfo.cumulativePercent, 2)}%`;


        }


        if(dashboardSettings.historical.hourlyTotalTemperatures){
            systemFarmTemp.updateSeries(temperatureGraph);
            document.getElementById("globalTemp").innerHTML = `
            <i class="fas fa-temperature-high"></i> Total Temperature: ${Calc.toFixed(
        farmInfo.totalFarmTemp,
        0
    )} °C
             `;
        }
        if(dashboardSettings.historical.weeklyUtilisation){

            activityHeatChart.updateSeries(heatMap);
        }


    }

    static currentActivity(currentStatus, currentActivity, settingsActivity, settingsUtilisation) {
        if(settingsUtilisation){
            currentUtilisation.updateSeries(currentStatus);
        }

        if(settingsActivity){
            currentActivityChart.updateSeries(currentActivity);

        }


    }

    static farmUtilisation(stats) {
        const activeHours = document.getElementById("activeHours");
        activeHours.innerHTML = `<i class="fas fa-square text-success"></i> <b>Active: </b> ${Calc.generateTime(
            stats.activeHours / 1000
        )}`;
        const idleHours = document.getElementById("idleHours");
        idleHours.innerHTML = `<i class="fas fa-square text-secondary"></i> <b>Idle Hours: </b> ${Calc.generateTime(
            stats.idleHours / 1000
        )}`;
        const failedHours = document.getElementById("failedHours");
        failedHours.innerHTML = `<i class="fas fa-square text-warning"></i> <b>Failed Hours: </b>${Calc.generateTime(
            stats.failedHours / 1000
        )}`;
        const offlineHours = document.getElementById("offlineHours");
        offlineHours.innerHTML = `<i class="fas fa-square text-danger"></i> <b>Offline Hours: </b>${Calc.generateTime(
            stats.offlineHours / 1000
        )}`;
        const activeProgress = document.getElementById("activeProgress");

        activeProgress.style.width = `${Calc.toFixed(
            stats.activeHoursPercent,
            0
        )}%`;
        activeProgress.innerHTML = `${Calc.toFixed(stats.activeHoursPercent, 0)}%`;
        const idleProgress = document.getElementById("idleProgress");
        idleProgress.style.width = `${Calc.toFixed(stats.idleHoursPercent, 0)}%`;
        idleProgress.innerHTML = `${Calc.toFixed(stats.idleHoursPercent, 0)}%`;
        const failedProgress = document.getElementById("failedProgress");
        failedProgress.style.width = `${Calc.toFixed(
            stats.failedHoursPercent,
            0
        )}%`;
        failedProgress.innerHTML = `${Calc.toFixed(stats.failedHoursPercent, 0)}%`;
        const offlineProgress = document.getElementById("offlineProgress");
        offlineProgress.style.width = `${Calc.toFixed(
            stats.offlineHoursPercent,
            0
        )}%`;
        offlineProgress.innerHTML = `${Calc.toFixed(
            stats.offlineHoursPercent,
            0
        )}%`;
    }
}

const grid = GridStack.init({
    animate: true,
    cellHeight: 30,
    draggable: {
        handle: '.tag',
    },
    float: true,
});

function saveGrid() {
    const serializedData = [];
    grid.engine.nodes.forEach(function(node) {
        serializedData.push({
            x: node.x,
            y: node.y,
            width: node.width,
            height: node.height,
            id: node.id
        });
    });
    localStorage.setItem('dashboardConfiguration', JSON.stringify(serializedData));
    // console.log(JSON.stringify(serializedData, null, '  '))
};
function loadGrid() {
    const dashData = localStorage.getItem('dashboardConfiguration');
    const serializedData = JSON.parse(dashData);
    if(serializedData !== null && serializedData.length !== 0){
        const items = GridStack.Utils.sort(serializedData);
        grid.batchUpdate();

        // else update existing nodes (instead of calling grid.removeAll())
        grid.engine.nodes.forEach(function (node) {
            const item = items.find(function(e) { return e.id === node.id;});
            if(typeof item !== 'undefined'){
                grid.update(node.el, item.x, item.y, item.width, item.height);
            }

        });
        grid.commit();
    }
};

loadGrid();


grid.on('change', function(event, items) {
    saveGrid();
});

