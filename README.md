<!-- ------------------------------------------------------------
SETUP INSTRUCTIONS
------------------------------------------------------------

1. Clone the repository:
   git clone https://github.com/csalotra/AssignmentProject.git
   cd remarcable_product_store

2. Create a virtual environment:
   python -m venv .venv

3. Activate the virtual environment:
   For Windows:
       .venv\Scripts\activate
   For Mac/Linux:
       source .venv/bin/activate

4. Install dependencies:
   pip install -r requirements.txt

   (If requirements.txt is missing or new packages are added later)
   pip freeze > requirements.txt

5. Apply database migrations:
   python manage.py migrate

   Note: The included db.sqlite3 file already contains sample data.
   Running migrate ensures everything is in sync.

6. Create a superuser (optional):
   python manage.py createsuperuser
   (Follow the prompts to set username, email, and password.)

7. Run the development server:
   python manage.py runserver

8. Open your browser and go to:
   http://127.0.0.1:8000/

   You should see the main product store page.

------------------------------------------------------------
ADMIN ACCESS
------------------------------------------------------------

To access Django Admin:
   http://127.0.0.1:8000/admin/
Use the credentials you created for the superuser.

From here, you can add or edit categories, tags, and products.

------------------------------------------------------------
PROJECT DETAILS
------------------------------------------------------------

Backend: Django 5.x  
Database: SQLite (db.sqlite3 included)  
Frontend: Django Templates with TailwindCSS via CDN  
Static Files: Located in static/images/  

------------------------------------------------------------
ASSUMPTIONS AND NOTES
------------------------------------------------------------

1. The database (db.sqlite3) contains sample data, so fixtures are not required.
2. Search includes product name, short description, and description fields.
3. Filters allow users to filter by category and/or tag.
4. If no results are found, a friendly message is displayed along with category/tag context.
5. The default Django User model is used for authentication and reviews.
6. Static files and images are placed in static/images/.
7. TailwindCSS is loaded via CDN. -->


# Assignment: Product Store  
**Assignment Project** – Django + React (Full-Stack Product Search application with Search & Filter)

A fully functional prototype application built to complete the task of **Django models, relationships, querysets, admin interface, search/filter logic**, and **full-stack development**.

**GitHub Repository:** https://github.com/csalotra/AssignmentProject.git


## Project Overview

This project **fulfills** following objectives:

- Django models with correct relationships (`Category`, `Tag`, `Product`)  
- Sample data populated **via Django Admin**:  
  - **5 categories**  
  - **10 tags**  
  - **20 products**  
- Full-text search across **name**, **description**  
- Filtering by **category** and **tags**  
- Search + filters can be **combined**  
- Clean, responsive frontend using **React + TypeScript**  
- REST API powered by Django + DRF  
- Complete separation of frontend and backend.
---

---

## Setup Instructions (Step-by-Step)

### Prerequisites
- Python 3.8+
- Node.js 18+ & npm
- Git

### Step 1: Clone the Repository
```bash
git clone https://github.com/csalotra/AssignmentProject.git
cd remarcable_product_store
```
### Step 2: Clone the Repository

# Create virtual environment
python -m venv .venv

# Activate it
# Windows:
.venv\Scripts\activate
# Mac/Linux:
source .venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

### Step 3: Apply Migrations
python manage.py migrate

Note: db.sqlite3 already contains all 20 products, 10 tags, 5 categories.
Migrations only ensure schema compatibility.

### Step 4: (Optional) Create Superuser
python manage.py createsuperuser

### Step 5: Start Django Backend
python manage.py runserver

### Step 6: Set Up React Frontend
cd frontend
npm install
npm run dev

### Step 7: Open the App
Go to: http://localhost:5173
You now have a fully working product store with:

->Search bar
->Category dropdown
->Tag dropdown

## Assumptions made
-> Person can get all the products at page load.
-> Pagniation applied to more than 10 records.
