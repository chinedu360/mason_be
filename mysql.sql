-- use this to create a new table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    level VARCHAR(50) NOT NULL,
    officerTitle VARCHAR(100),
    phoneNumber VARCHAR(20) NOT NULL,
    workPhone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    passwordResetToken VARCHAR(255),
    passwordResetExpires DATETIME,
    profilePicture VARCHAR(255) DEFAULT 'default.png',
    contactNumber VARCHAR(20),
    passwordChangeAt DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- use this to alter an already created table to add more columns
ALTER TABLE users
ADD COLUMN passwordResetToken VARCHAR(255),
ADD COLUMN passwordResetExpires DATETIME,
ADD COLUMN profilePicture VARCHAR(255) DEFAULT 'default.png',
ADD COLUMN contactNumber VARCHAR(20),
ADD COLUMN passwordChangeAt DATETIME;

-- use this to remove a column from a table
ALTER TABLE users
DROP COLUMN contactNumber;

