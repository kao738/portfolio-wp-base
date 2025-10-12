# Portfolio Website

## Overview
This project is a portfolio website for showcasing the work and skills of KAO, a web developer and designer. The website is designed to be responsive, ensuring a good user experience across various devices.

## Project Structure
```
portfolio-wp-base
├── assets
│   ├── css
│   │   └── style.scss        # SCSS styles for the website
│   ├── js
│   │   └── main.js           # JavaScript for interactive features
│   └── imgs                  # Directory for image files
├── index.html                # Main HTML file for the website
└── README.md                 # Documentation for the project
```

## Setup Instructions
1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd portfolio-wp-base
   ```

2. **Install dependencies**:
   Ensure you have Node.js and npm installed. Then, run:
   ```bash
   npm install
   ```

3. **Compile SCSS**:
   Use a tool like `sass` to compile the SCSS file into CSS:
   ```bash
   sass assets/css/style.scss assets/css/style.css
   ```

4. **Open the website**:
   Open `index.html` in your web browser to view the portfolio.

## Features
- Responsive design that adjusts layout and typography based on screen size.
- Interactive elements such as a hamburger menu and scroll-to-top button.

## Customization
To adjust the responsiveness for widths below 1024px, you can modify the `style.scss` file to include media queries that stack divs vertically and reduce font sizes.

## License
This project is licensed under the MIT License.