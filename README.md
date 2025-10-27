# Revenue & ROI Calculator

A comprehensive web-based calculator for analyzing mortgage payments and short-term vacation rental return on investment (ROI). The application features two main calculators with the ability to generate professional PDF reports.

## Features

### 🏠 Mortgage Calculator
Calculate your monthly mortgage payments and total loan costs with:
- Loan amount and down payment inputs
- Customizable interest rates and loan terms
- Detailed breakdown of:
  - Monthly payment amount
  - Total payment over loan term
  - Total interest paid
  - Principal amount

### 🏖️ Short-Term Vacation Rental ROI Calculator
Analyze the profitability of vacation rental properties with:
- Property price and investment tracking
- Nightly rate and occupancy rate inputs
- Monthly expense considerations
- Comprehensive ROI analysis showing:
  - Monthly and annual revenue projections
  - Net income calculations
  - Annual ROI percentage
  - Investment payback period

### 📄 PDF Report Generation
Generate professional PDF reports containing:
- All input parameters
- Complete calculation results
- Professional formatting
- Date-stamped documentation

## Usage

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Edjesss/Calculator-2.git
   cd Calculator-2
   ```

2. **Open the application**
   - Simply open `index.html` in your web browser
   - No build process or dependencies required
   - Works on desktop and mobile devices

### Using the Mortgage Calculator

1. Enter your loan details:
   - **Loan Amount**: Total amount you want to borrow
   - **Annual Interest Rate**: Your interest rate as a percentage
   - **Loan Term**: Duration of the loan in years
   - **Down Payment**: Initial payment amount

2. Click "Calculate Mortgage"

3. View your results including monthly payments and total costs

### Using the Vacation Rental ROI Calculator

1. Enter your property details:
   - **Property Price**: Total cost of the property
   - **Average Nightly Rate**: Expected nightly rental rate
   - **Occupancy Rate**: Expected percentage of nights rented (0-100%)
   - **Monthly Expenses**: Operating costs (utilities, maintenance, etc.)
   - **Initial Investment**: Your upfront investment amount

2. Click "Calculate ROI"

3. Review your projected returns and ROI metrics

### Generating PDF Reports

1. Fill out and calculate both calculators (or at least one)
2. Click "📄 Generate PDF Report"
3. A new window will open with a print-ready report
4. Use your browser's print dialog to save as PDF

## Technical Details

### Technologies Used
- **HTML5**: Structure and semantic markup
- **CSS3**: Responsive styling with modern features
- **JavaScript**: Calculator logic and PDF generation
- **Browser Print API**: PDF generation without external dependencies

### File Structure
```
Calculator-2/
├── index.html          # Main application page
├── style.css           # Styles and responsive design
├── calculator.js       # Calculator logic and PDF generation
├── README.md          # Documentation
└── .gitignore         # Git ignore rules
```

### Browser Compatibility
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera
- Any modern browser with ES6 support

## Formulas Used

### Mortgage Calculation
The monthly payment is calculated using the standard mortgage formula:

```
M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
```

Where:
- M = Monthly payment
- P = Principal (loan amount - down payment)
- i = Monthly interest rate (annual rate / 12 / 100)
- n = Number of payments (years × 12)

### ROI Calculation
```
Monthly Revenue = Nightly Rate × (30 days × Occupancy Rate / 100)
Annual Revenue = Monthly Revenue × 12
Net Annual Income = Annual Revenue - (Monthly Expenses × 12)
Annual ROI = (Net Annual Income / Initial Investment) × 100
Payback Period = Initial Investment / Net Annual Income
```

## Screenshots

![Calculator Interface](https://github.com/user-attachments/assets/412317d2-9746-4514-9c1d-19533aff136a)
*Initial calculator interface with placeholder values*

![Calculator with Results](https://github.com/user-attachments/assets/9a143848-08ee-4fde-8608-751b5918c4d0)
*Calculators showing sample calculations*

## Disclaimer

This calculator provides estimates for informational purposes only. All calculations are approximations and should not be considered as financial advice. Please consult with a qualified financial advisor for professional guidance on mortgages and investment decisions.

## License

This project is open source and available for educational and personal use.

## Contributing

Contributions, issues, and feature requests are welcome!
