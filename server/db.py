from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Install PyMySQL as MySQLdb for compatibility
import pymysql

pymysql.install_as_MySQLdb()

# MySQL connection URL
DATABASE_URL = "mysql://Joe:demo123@localhost:3306/protracl"

# Create the database engine
engine = create_engine(DATABASE_URL)

# Declare the base class for the models
Base = declarative_base()

# Create a sessionmaker to interact with the database
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# User model for SQLAlchemy (this corresponds to the 'users' table in MySQL)
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True)  # Specify length for VARCHAR
    password = Column(String(255))  # Specify length for VARCHAR
    full_name = Column(String(255))  # Specify length for VARCHAR


# Create all the tables (if they don't exist)
Base.metadata.create_all(bind=engine)
