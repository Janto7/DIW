document.addEventListener("DOMContentLoaded", function () {
    function initializeTabsAndAccordions() {
        var tablinks = document.getElementsByClassName("tablinks");
        var acc = document.getElementsByClassName("accordion");
        var panels = document.getElementsByClassName("panel");
        for (var j = 0; j < tablinks.length; j++) {
            tablinks[j].addEventListener("click", function (event) {
                var tabs = document.getElementsByClassName("tabcontent");
                for (var k = 0; k < tabs.length; k++) {
                    tabs[k].style.display = "none";
                    var pAcc = tabs[k].getElementsByClassName("accordion");
                    var pPanels = tabs[k].getElementsByClassName("panel");
                    for (var l = 0; l < pAcc.length; l++) {
                        pAcc[l].classList.remove("active");
                        pPanels[l].style.display = "none";
                    }
                }
                var activeTab = this.getAttribute("onclick").split("'")[1];
                document.getElementById(activeTab).style.display = "block";
                var current = document.getElementsByClassName("active");
                if (current.length > 0) {
                    current[0].className = current[0].className.replace(" active", "");
                }
                this.className += " active";
                var activePanels = document
                    .getElementById(activeTab)
                    .getElementsByClassName("panel");
                var activeAccordions = document
                    .getElementById(activeTab)
                    .getElementsByClassName("accordion");
                if (activePanels.length > 0 && activeAccordions.length > 0) {
                    activeAccordions[0].classList.add("active");
                    activePanels[0].style.display = "block";
                }
            });

            if (j === 0) {
                tablinks[j].click();
            }
        }

        for (var i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function () {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.display === "block") {
                    panel.style.display = "none";
                } else {
                    panel.style.display = "block";
                }
            });
        }
    }

    initializeTabsAndAccordions();
});