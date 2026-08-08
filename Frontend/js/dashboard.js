// Career Compass - Dashboard Chart

document.addEventListener("DOMContentLoaded", function () {

    const chartCanvas = document.getElementById("skillChart");

    if (!chartCanvas) {
        return;
    }

    /*
        Temporary sample data.this information will come from the backend after the student completes the assessment.
        
    */

    const skillData = {
        labels: [
            "Programming",
            "Databases",
            "Web Development",
            "Software Engineering",
            "Algorithms",
            "Networking"
        ],

        values: [
            90,
            85,
            75,
            80,
            70,
            40
        ]
    };


    const ctx = chartCanvas.getContext("2d");

    new Chart(ctx, {
        type: "radar",

        data: {
            labels: skillData.labels,

            datasets: [{
                label: "Skill Match",

                data: skillData.values,

                borderWidth: 2,

                pointRadius: 4,

                pointHoverRadius: 6,

                fill: true
            }]
        },

        options: {
            responsive: true,

            maintainAspectRatio: false,

            scales: {
                r: {
                    beginAtZero: true,

                    min: 0,

                    max: 100,

                    ticks: {
                        stepSize: 20
                    },

                    pointLabels: {
                        font: {
                            size: 13
                        }
                    }
                }
            },

            plugins: {
                legend: {
                    display: true
                }
            }
        }
    });

});