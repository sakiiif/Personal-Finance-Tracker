Personal Finance Tracker - Project Report

Overview: The Personal Finance Tracker is an application designed to help users effectively manage their financial activities, including income, expenses, savings, and budgeting. This app combines a dynamic front-end built with Next.js and a robust back-end powered by Nest.js with PostgreSQL for data management. The project aims to provide users with a comprehensive tool to track their financial data, set goals, visualize trends, and get notifications for upcoming payments or milestones.

Features:

1. User Authentication:
  •	Sign-Up, Login, and Logout: Users can create accounts, sign in, and sign out of the app. The login system includes features like email and password validation.
  •	Password Encryption: Using Nest.js, the passwords are encrypted using bcrypt to ensure data security. This ensures that sensitive user data, like passwords, is stored in a secure, encrypted format.
2. Dashboard:
  •	Summary View: The dashboard presents an overview of the user’s financial situation by displaying:
    o	Total income
    o	Total expenses
    o	Total savings
  •	This summary is automatically updated as the user logs income, expenses, and savings details.
3. Add Income:
  •	Users can log various sources of income such as:
    o	Salary
    o	Freelancing
    o	Side Business
    o	Each source can be categorized under predefined categories, including Monthly Salary or Bonus.
  •	The income entries are stored in the database, categorized, and displayed on the dashboard.
4. Add Expenses:
  •	Users can track their expenses by categorizing them, e.g.,:
    o	Rent
    o	Food
    o	Transportation
  •	Receipt Upload: Users can also upload receipts for each expense as image files, adding a layer of tracking to their financial activities.
  •	The app allows users to keep track of how much they are spending in each category over time.
5. Expense Categories:
  •	Custom categories for expenses can be defined by the user. For instance, users can create categories like Entertainment, Education, or Healthcare.
  •	Users have the option to categorize each expense entry under the appropriate category for better tracking.
6. Savings Tracker:
  •  Users can set monthly savings goals and track their progress.
    o	Target Savings: The app allows users to set a specific savings goal for each month.
    o	Progress Tracking: The system will track how much the user has saved against their goal, helping users stay on track.
7. Reports & Charts:
  •	Users can visualize their financial data with dynamic charts that provide a clear picture of their income, expenses, and savings:
    o	Bar Charts for monthly expenses.
    o	Pie Charts for income distribution.
  •	Data visualization is powered by libraries such as Chart.js or D3.js to make financial information easier to understand and analyze.
8. Recurring Transactions:
  •	Users can add recurring transactions for income and expenses that happen on a regular basis (e.g., rent payments, subscription services).
  •	This functionality helps users plan their finances effectively by tracking predictable, recurring costs.
9. Search and Filter:
  •	Users can search their transactions by keywords and filter them by:
    o	Date
    o	Category
    o	Amount
  •	This feature enables users to easily access specific transactions and manage large volumes of data.
10. Budget Planning:
  •	Users can set a budget for various categories (e.g., limit dining out expenses to $200 per month).
  •	The system will notify users when they exceed their budget for a particular category, helping them control their spending and stay within financial limits.
11. Currency Selection:
  •	The app supports multiple currencies (e.g., USD, EUR), allowing users to choose their preferred currency.
  •	Dynamic Currency Conversion: The system automatically converts amounts to the selected currency based on the current exchange rate, ensuring that users can track their finances globally.
12. Export Data:
  •	Users can export their income and expense data into CSV or PDF formats for further analysis or reporting purposes.
  •	This allows users to keep offline records or share their financial data with a financial advisor or family members.
13. Dark/Light Theme Toggle:
  •	Users can toggle between dark and light themes based on their personal preference.
  •	This feature enhances the user experience by allowing users to choose the theme that best suits their environment or mood.
14. Notifications:
  •	The app provides timely reminders for:
    o	Upcoming bills
    o	Savings milestones
  •	Notifications help users stay on top of their financial obligations and goals.
15. Settings:
  •	Profile Settings: Users can update their profile information (e.g., name, email, password).
  •	Manage Categories and Preferences: Users can customize their expense categories and notification settings.

User Roles:

The Personal Finance Tracker supports three user roles, each with its specific access and privileges:

1.	Admin:
  o	Privileges:
    	Can manage all users, including adding, editing, and deleting user accounts.
    	Can configure categories and budgets for all users.
    	Full access to the app’s settings and reports.
  o	Responsibilities:
    	Monitor and oversee the entire system’s operation and performance.
    	Ensure that user data is kept secure and manage backups.

2.	Standard User:
  o	Privileges:
    	Can add and view their own income, expenses, savings, and reports.
    	Can customize categories and set personal savings goals.
    	Full access to the dashboard, including charts and reports.
    	Can export data and set up recurring transactions.
  o	Responsibilities:
    	Manage their own financial data, track income and expenses, and set goals.

3.	Guest User:
  o	Privileges:
    	Can only view the app’s basic information and public features (like sample reports or guides).
    	Cannot add or manage any financial data.
  o	Responsibilities:
    	Guest users can only explore the features before deciding to sign up or log in.

Conclusion:
The Personal Finance Tracker aims to be an all-in-one financial management solution, allowing users to track income, expenses, savings, and set goals. With its secure and scalable backend, dynamic frontend, and robust features, the app is designed to cater to users' needs for managing their personal finances efficiently. The addition of user roles ensures appropriate access and privacy for different types of users, providing a customizable and secure experience.
