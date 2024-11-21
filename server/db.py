from sqlalchemy import (
    create_engine,
    Column,
    Integer,
    String,
    DateTime,
    Float,
    ForeignKey,
    Boolean,
)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
import pymysql
from datetime import datetime

# Install PyMySQL as MySQLdb for compatibility
pymysql.install_as_MySQLdb()

# Database connection URL
DATABASE_URL = "mysql://Joe:demo123@localhost:3306/protracl"

# Create the database engine
engine = create_engine(DATABASE_URL)

# Declare the base class for the models
Base = declarative_base()

# Create a sessionmaker to interact with the database
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# User model
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True)
    password = Column(String(255))
    full_name = Column(String(255))

    # Relationship to notifications
    notifications = relationship("Notification", back_populates="user")


# Task model
class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(
        Integer, ForeignKey("projects.id")
    )  # Foreign key to the Project table
    task_name = Column(String(255))
    task_desc = Column(String(255))
    start_time = Column(DateTime)
    end_time = Column(DateTime)
    approx_time = Column(Float)  # Approximate time in hours
    actual_time = Column(Float)  # Actual time in hours
    challenges = Column(String(255))
    remarks = Column(String(255))
    score = Column(Float)  # Calculated score
    status = Column(String(50))  # Example: "Not Started", "In Progress", "Completed"

    # Relationship to project
    project = relationship("Project", back_populates="tasks")


# Project model
class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    project_name = Column(String(255))
    description = Column(String(255))
    project_type = Column(String(255))  # Type of project (e.g., web, mobile, etc.)
    business_model = Column(
        String(255)
    )  # Business model (e.g., subscription, SaaS, etc.)
    deadline = Column(DateTime)  # Overall project deadline
    milestones = Column(
        String(255)
    )  # Could store milestone names or an array of milestones
    status = Column(String(50))  # Example: "Planning", "Execution", "Completed"

    # Relationship to tasks
    tasks = relationship("Task", back_populates="project")


# Notification model for user notifications
class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    message = Column(String(255))  # Notification content
    read = Column(Boolean, default=False)  # Whether the notification has been read
    task_id = Column(
        Integer, ForeignKey("tasks.id"), nullable=True
    )  # Related task (if any)
    project_id = Column(
        Integer, ForeignKey("projects.id"), nullable=True
    )  # Related project (if any)
    created_at = Column(
        DateTime, default=datetime.utcnow
    )  # When the notification was created

    # Relationship to user
    user = relationship("User", back_populates="notifications")
    task = relationship("Task", back_populates="notifications", uselist=False)
    project = relationship("Project", back_populates="notifications", uselist=False)


# Create all the tables in the database (if they don't exist)
Base.metadata.create_all(bind=engine)
