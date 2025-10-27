// Mortgage Calculator Functions
function calculateMortgage() {
    // Get input values
    const loanAmount = parseFloat(document.getElementById('loan-amount').value) || 0;
    const annualRate = parseFloat(document.getElementById('interest-rate').value) || 0;
    const loanTermYears = parseInt(document.getElementById('loan-term').value) || 0;
    const downPayment = parseFloat(document.getElementById('down-payment').value) || 0;

    // Validate inputs
    if (loanAmount <= 0 || annualRate < 0 || loanTermYears <= 0) {
        alert('Please enter valid values for all mortgage fields');
        return;
    }

    // Calculate principal (loan amount minus down payment)
    const principal = loanAmount - downPayment;
    
    if (principal <= 0) {
        alert('Down payment cannot be greater than or equal to loan amount');
        return;
    }

    // Calculate monthly payment using mortgage formula
    // M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]
    const monthlyRate = annualRate / 100 / 12;
    const numberOfPayments = loanTermYears * 12;
    
    let monthlyPayment;
    if (monthlyRate === 0) {
        // If interest rate is 0, simple division
        monthlyPayment = principal / numberOfPayments;
    } else {
        monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;

    // Display results
    document.getElementById('monthly-payment').textContent = formatCurrency(monthlyPayment);
    document.getElementById('total-payment').textContent = formatCurrency(totalPayment);
    document.getElementById('total-interest').textContent = formatCurrency(totalInterest);
    document.getElementById('principal-amount').textContent = formatCurrency(principal);

    // Add animation to results
    animateResults('mortgage-results');
}

// Vacation Rental ROI Calculator Functions
function calculateRentalROI() {
    // Get input values
    const propertyPrice = parseFloat(document.getElementById('property-price').value) || 0;
    const nightlyRate = parseFloat(document.getElementById('nightly-rate').value) || 0;
    const occupancyRate = parseFloat(document.getElementById('occupancy-rate').value) || 0;
    const monthlyExpenses = parseFloat(document.getElementById('monthly-expenses').value) || 0;
    const initialInvestment = parseFloat(document.getElementById('initial-investment').value) || 0;

    // Validate inputs
    if (propertyPrice <= 0 || nightlyRate <= 0 || occupancyRate < 0 || occupancyRate > 100 || initialInvestment <= 0) {
        alert('Please enter valid values for all rental fields');
        return;
    }

    // Calculate revenue
    const daysInMonth = 30;
    const occupiedDays = (daysInMonth * occupancyRate) / 100;
    const monthlyRevenue = nightlyRate * occupiedDays;
    const annualRevenue = monthlyRevenue * 12;

    // Calculate net income
    const netMonthlyIncome = monthlyRevenue - monthlyExpenses;
    const netAnnualIncome = netMonthlyIncome * 12;

    // Calculate ROI
    const annualROI = (netAnnualIncome / initialInvestment) * 100;

    // Calculate payback period
    let paybackPeriod = 0;
    if (netAnnualIncome > 0) {
        paybackPeriod = initialInvestment / netAnnualIncome;
    }

    // Display results
    document.getElementById('monthly-revenue').textContent = formatCurrency(monthlyRevenue);
    document.getElementById('annual-revenue').textContent = formatCurrency(annualRevenue);
    document.getElementById('net-monthly').textContent = formatCurrency(netMonthlyIncome);
    document.getElementById('net-annual').textContent = formatCurrency(netAnnualIncome);
    document.getElementById('annual-roi').textContent = annualROI.toFixed(2) + '%';
    document.getElementById('payback-period').textContent = paybackPeriod.toFixed(1) + ' years';

    // Add animation to results
    animateResults('rental-results');
}

// Utility Functions
function formatCurrency(value) {
    return '$' + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function animateResults(elementId) {
    const element = document.getElementById(elementId);
    element.style.opacity = '0';
    element.style.transform = 'translateY(-10px)';
    
    setTimeout(() => {
        element.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, 50);
}

// PDF Generation Function - Using browser print dialog
function generatePDF() {
    // Create a printable version of the report
    const printWindow = window.open('', '_blank');
    
    if (!printWindow) {
        alert('Please allow pop-ups to generate PDF reports');
        return;
    }
    
    // Get current date
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Get all input and result values and escape them
    const mortgageData = {
        loanAmount: escapeHtml(document.getElementById('loan-amount').value || '0'),
        interestRate: escapeHtml(document.getElementById('interest-rate').value || '0'),
        loanTerm: escapeHtml(document.getElementById('loan-term').value || '0'),
        downPayment: escapeHtml(document.getElementById('down-payment').value || '0'),
        monthlyPayment: escapeHtml(document.getElementById('monthly-payment').textContent),
        totalPayment: escapeHtml(document.getElementById('total-payment').textContent),
        totalInterest: escapeHtml(document.getElementById('total-interest').textContent),
        principalAmount: escapeHtml(document.getElementById('principal-amount').textContent)
    };

    const rentalData = {
        propertyPrice: escapeHtml(document.getElementById('property-price').value || '0'),
        nightlyRate: escapeHtml(document.getElementById('nightly-rate').value || '0'),
        occupancyRate: escapeHtml(document.getElementById('occupancy-rate').value || '0'),
        monthlyExpenses: escapeHtml(document.getElementById('monthly-expenses').value || '0'),
        initialInvestment: escapeHtml(document.getElementById('initial-investment').value || '0'),
        monthlyRevenue: escapeHtml(document.getElementById('monthly-revenue').textContent),
        annualRevenue: escapeHtml(document.getElementById('annual-revenue').textContent),
        netMonthly: escapeHtml(document.getElementById('net-monthly').textContent),
        netAnnual: escapeHtml(document.getElementById('net-annual').textContent),
        annualROI: escapeHtml(document.getElementById('annual-roi').textContent),
        paybackPeriod: escapeHtml(document.getElementById('payback-period').textContent)
    };

    // Build the PDF-ready HTML document
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Revenue & ROI Calculator Report</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                body {
                    font-family: 'Segoe UI', Arial, sans-serif;
                    padding: 40px;
                    color: #333;
                    max-width: 800px;
                    margin: 0 auto;
                }
                .header {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 30px;
                    text-align: center;
                    border-radius: 10px;
                    margin-bottom: 30px;
                }
                h1 {
                    font-size: 28px;
                    margin-bottom: 10px;
                }
                .subtitle {
                    font-size: 14px;
                    opacity: 0.9;
                }
                .date {
                    margin-top: 15px;
                    font-size: 12px;
                    opacity: 0.8;
                }
                .section {
                    margin-bottom: 35px;
                    page-break-inside: avoid;
                }
                .section h2 {
                    color: #667eea;
                    font-size: 20px;
                    margin-bottom: 15px;
                    padding-bottom: 8px;
                    border-bottom: 2px solid #667eea;
                }
                .subsection {
                    margin-bottom: 20px;
                }
                .subsection h3 {
                    color: #555;
                    font-size: 16px;
                    margin-bottom: 10px;
                }
                .data-row {
                    display: flex;
                    justify-content: space-between;
                    padding: 8px 0;
                    border-bottom: 1px solid #f0f0f0;
                }
                .data-row .label {
                    color: #666;
                    font-weight: 500;
                }
                .data-row .value {
                    color: #333;
                    font-weight: 700;
                }
                .highlight {
                    background: rgba(102, 126, 234, 0.1);
                    padding: 15px;
                    border-radius: 8px;
                    margin: 15px 0;
                }
                .highlight .data-row .value {
                    color: #667eea;
                    font-size: 18px;
                }
                .footer {
                    margin-top: 40px;
                    padding-top: 20px;
                    border-top: 2px solid #e0e0e0;
                    text-align: center;
                    color: #999;
                    font-size: 11px;
                    page-break-inside: avoid;
                }
                @media print {
                    body {
                        padding: 20px;
                    }
                    .header {
                        background: #667eea !important;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    .highlight {
                        background: rgba(102, 126, 234, 0.1) !important;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Revenue & ROI Calculator Report</h1>
                <div class="subtitle">Financial Analysis Report</div>
                <div class="date">Generated: ${currentDate}</div>
            </div>

            <div class="section">
                <h2>Mortgage Calculator</h2>
                
                <div class="subsection">
                    <h3>Input Parameters</h3>
                    <div class="data-row">
                        <span class="label">Loan Amount:</span>
                        <span class="value">$${parseFloat(mortgageData.loanAmount || 0).toLocaleString()}</span>
                    </div>
                    <div class="data-row">
                        <span class="label">Annual Interest Rate:</span>
                        <span class="value">${mortgageData.interestRate}%</span>
                    </div>
                    <div class="data-row">
                        <span class="label">Loan Term:</span>
                        <span class="value">${mortgageData.loanTerm} years</span>
                    </div>
                    <div class="data-row">
                        <span class="label">Down Payment:</span>
                        <span class="value">$${parseFloat(mortgageData.downPayment || 0).toLocaleString()}</span>
                    </div>
                </div>

                <div class="subsection">
                    <h3>Calculated Results</h3>
                    <div class="data-row">
                        <span class="label">Monthly Payment:</span>
                        <span class="value">${mortgageData.monthlyPayment}</span>
                    </div>
                    <div class="data-row">
                        <span class="label">Total Payment:</span>
                        <span class="value">${mortgageData.totalPayment}</span>
                    </div>
                    <div class="data-row">
                        <span class="label">Total Interest:</span>
                        <span class="value">${mortgageData.totalInterest}</span>
                    </div>
                    <div class="data-row">
                        <span class="label">Principal Amount:</span>
                        <span class="value">${mortgageData.principalAmount}</span>
                    </div>
                </div>
            </div>

            <div class="section">
                <h2>Short-Term Vacation Rental ROI</h2>
                
                <div class="subsection">
                    <h3>Input Parameters</h3>
                    <div class="data-row">
                        <span class="label">Property Price:</span>
                        <span class="value">$${parseFloat(rentalData.propertyPrice || 0).toLocaleString()}</span>
                    </div>
                    <div class="data-row">
                        <span class="label">Average Nightly Rate:</span>
                        <span class="value">$${parseFloat(rentalData.nightlyRate || 0).toLocaleString()}</span>
                    </div>
                    <div class="data-row">
                        <span class="label">Occupancy Rate:</span>
                        <span class="value">${rentalData.occupancyRate}%</span>
                    </div>
                    <div class="data-row">
                        <span class="label">Monthly Expenses:</span>
                        <span class="value">$${parseFloat(rentalData.monthlyExpenses || 0).toLocaleString()}</span>
                    </div>
                    <div class="data-row">
                        <span class="label">Initial Investment:</span>
                        <span class="value">$${parseFloat(rentalData.initialInvestment || 0).toLocaleString()}</span>
                    </div>
                </div>

                <div class="subsection">
                    <h3>Calculated Results</h3>
                    <div class="data-row">
                        <span class="label">Monthly Revenue:</span>
                        <span class="value">${rentalData.monthlyRevenue}</span>
                    </div>
                    <div class="data-row">
                        <span class="label">Annual Revenue:</span>
                        <span class="value">${rentalData.annualRevenue}</span>
                    </div>
                    <div class="data-row">
                        <span class="label">Net Monthly Income:</span>
                        <span class="value">${rentalData.netMonthly}</span>
                    </div>
                    <div class="data-row">
                        <span class="label">Net Annual Income:</span>
                        <span class="value">${rentalData.netAnnual}</span>
                    </div>
                    
                    <div class="highlight">
                        <div class="data-row">
                            <span class="label">Annual ROI:</span>
                            <span class="value">${rentalData.annualROI}</span>
                        </div>
                    </div>
                    
                    <div class="data-row">
                        <span class="label">Payback Period:</span>
                        <span class="value">${rentalData.paybackPeriod}</span>
                    </div>
                </div>
            </div>

            <div class="footer">
                <p><strong>Disclaimer:</strong> All calculations are estimates for informational purposes only.</p>
                <p>Please consult with a financial advisor for professional advice.</p>
            </div>

            <script>
                // Auto-print when ready
                window.onload = function() {
                    setTimeout(function() {
                        window.print();
                    }, 250);
                };
            </script>
        </body>
        </html>
    `;

    // Write to the print window
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Show success message
    showSuccessMessage('PDF report ready! Use browser print dialog to save as PDF.');
}

function showSuccessMessage(message) {
    // Create or get success message element
    let successDiv = document.querySelector('.success-message');
    if (!successDiv) {
        successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        document.querySelector('.pdf-section').appendChild(successDiv);
    }
    
    successDiv.textContent = message;
    successDiv.classList.add('show');
    
    // Hide after 3 seconds
    setTimeout(() => {
        successDiv.classList.remove('show');
    }, 3000);
}

// Add Enter key support for inputs
document.addEventListener('DOMContentLoaded', function() {
    // Mortgage calculator inputs
    const mortgageInputs = [
        'loan-amount',
        'interest-rate',
        'loan-term',
        'down-payment'
    ];
    
    mortgageInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    calculateMortgage();
                }
            });
        }
    });
    
    // Rental calculator inputs
    const rentalInputs = [
        'property-price',
        'nightly-rate',
        'occupancy-rate',
        'monthly-expenses',
        'initial-investment'
    ];
    
    rentalInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    calculateRentalROI();
                }
            });
        }
    });
});
