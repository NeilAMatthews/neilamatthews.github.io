document.addEventListener("DOMContentLoaded", function() {   
    const stepNumber = document.getElementById("step-number");
    const highStartingPoint = document.getElementById("high-case-valuation");
    const lowStartingPoint = document.getElementById("low-case-valuation");
    const submitBtn = document.getElementById('submit-btn');

    stepNumber.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); 
            lowStartingPoint.focus();
        }
    });

    lowStartingPoint.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); 
            highStartingPoint.focus();
        }
    });

    highStartingPoint.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            submitBtn.click();
        }
    });

    function validateInputs(lowerEnd, upperEnd, numSteps) {
        if (isNaN(lowerEnd) || isNaN(upperEnd) || !numSteps) {
            alert("Please enter valid numbers for all fields.");
            return false;
        }
        if (lowerEnd >= upperEnd) {
            alert("Low-case valuation must be less than high-case valuation.");
            return false;
        }
        if (!["2", "3", "4", "5"].includes(numSteps)) {
            alert("Number of steps must be 2, 3, 4, or 5.");
            return false;
        }
        return true;
    }

    document.getElementById("submit-btn").addEventListener("click", function() {
        // get and parse the data
        const lowerEnd = parseFloat(document.getElementById("low-case-valuation").value);
        const upperEnd = parseFloat(document.getElementById("high-case-valuation").value);
        const caseValuation = upperEnd - lowerEnd;
        const numSteps = document.getElementById("step-number").value;

        if (!validateInputs(lowerEnd, upperEnd, numSteps)) return;

        // these are the default step percentages
        const stepConfig = {
            "2": [0, 0.72, 1.0],
            "3": [0, 0.68, 0.89, 1.0],
            "4": [0, 0.63, 0.83, 0.95, 1.0],
            "5": [0, 0.60, 0.80, 0.91, 0.97, 1.0]
        }
        const steps = stepConfig[numSteps];

        // create the table
        const container = document.getElementById("negation-container");
        container.innerHTML = ""; 
        const table = document.createElement("table");
        table.className = "negotiation-table";
        const answerSection = document.querySelector('.answer');
        answerSection.classList.add('has-table');

        // table header
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");
        const headers = ["Step", "Concession of . . .", ". . . Making the Current Offer"];
        headers.forEach(headerText => {
            const th = document.createElement("th");
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // table body
        const tbody = document.createElement("tbody");
        let totalReleased = 0;
        
        steps.forEach((percentage, index) => {
            const amountReleased = caseValuation * percentage - totalReleased;
            totalReleased += amountReleased;
            
            const row = document.createElement("tr");
            
            // Step number
            const stepCell = document.createElement("td");
            stepCell.textContent = index + 1;
            row.appendChild(stepCell);
            
            // Amount Conceded
            const amountCell = document.createElement("td");
            if(index == 0){
                amountCell.textContent = "\u2014" ;
                row.appendChild(amountCell);
            } else {
                amountCell.textContent = formatCurrency(amountReleased);
                row.appendChild(amountCell);
            }
            
            // Total Offer
            const totalCell = document.createElement("td");
            totalCell.textContent = formatCurrency(totalReleased + lowerEnd);
            makeBold(totalCell);
            row.appendChild(totalCell);
            
            tbody.appendChild(row);
        });
        
        table.appendChild(tbody);
        container.appendChild(table);

        const helpfulTip = [
        "Good luck!",
        "Remember your themes",
        "Value is subjective",
        "Hear something odd? Ask about it",
        "You've got this",
        "Don't just touch the file \u2014 move it forward",
        "Facts & logic don't persuade . . . themes & value statements do",
        "Can't spell \"funnel\" without \"fun\"",
        "Concede strategically, not just because it's something to do",
        "You're a pro because of your preparation. Nice job.",
        "Tied with funnel cake as the best funnel",
        "This concession pattern will give your concessions meaning and context"
        ];

        document.querySelector('.tips').style.display = 'block';
        document.querySelector('.reminder').style.display = 'inline';
        const tipPlacement = document.querySelector('.tip-placement');
        const randomTip = helpfulTip[Math.floor(Math.random() * helpfulTip.length)];
        tipPlacement.textContent = randomTip;
        tipPlacement.innerHTML = randomTip.replace(/ /g, '&nbsp;');
    });
    
    function formatCurrency(amount) {
        return "$" + Math.floor(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function makeBold(element){
        element.style.fontWeight = "bold";
        element.style.color = "#a345da";
    }
});
