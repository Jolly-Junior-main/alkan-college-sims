-- Insert Midwifery
INSERT OR IGNORE INTO Department (id, name, code, faculty) VALUES
('dept-midw', 'Department of Midwifery', 'MIDW', 'Community Health Faculty'),
('dept-acct', 'Department of Accounting & Finance', 'ACCT', 'Business & Social Science Faculty'),
('dept-mgmt', 'Department of Management', 'MGMT', 'Business & Social Science Faculty'),
('dept-itec', 'Department of Information Technology', 'ITEC', 'Technology Faculty'),
('dept-surv', 'Department of Surveying Technology', 'SURV', 'Technology Faculty');

-- Insert Programs
INSERT OR IGNORE INTO Program (id, departmentId, name, degreeType, totalCreditsRequired) VALUES
('prog-midw-tvet', 'dept-midw', 'TVET Midwifery (Level IV)', 'DIPLOMA', 96),
('prog-acct-deg', 'dept-acct', 'BA in Accounting and Finance', 'BSC', 135),
('prog-mgmt-deg', 'dept-mgmt', 'BA in Management', 'BSC', 132),
('prog-itec-deg', 'dept-itec', 'BSc in Information Technology', 'BSC', 140),
('prog-surv-tvet', 'dept-surv', 'TVET Surveying Technology (Level IV)', 'DIPLOMA', 92);

-- Insert Sample Courses
INSERT OR IGNORE INTO Course (id, code, title, creditHours, lectureHours, labHours, departmentId, semester, yearLevel) VALUES
('crs-midw-101', 'MIDW101', 'Fundamentals of Antenatal & Obstetric Care', 4, 3, 3, 'dept-midw', 1, 1),
('crs-midw-102', 'MIDW102', 'Neonatal Health & Resuscitation Practicum', 3, 2, 3, 'dept-midw', 1, 1),
('crs-acct-101', 'ACCT101', 'Principles of Financial Accounting I', 3, 3, 0, 'dept-acct', 1, 1),
('crs-acct-102', 'ACCT102', 'Cost & Management Accounting Standards', 3, 3, 0, 'dept-acct', 1, 1),
('crs-mgmt-101', 'MGMT101', 'Organizational Theory & Strategic Leadership', 3, 3, 0, 'dept-mgmt', 1, 1),
('crs-mgmt-102', 'MGMT102', 'Operations & Supply Chain Management', 3, 3, 0, 'dept-mgmt', 1, 1),
('crs-itec-101', 'ITEC101', 'Relational Database Systems & SQL Architectures', 4, 3, 2, 'dept-itec', 1, 1),
('crs-itec-102', 'ITEC102', 'Health Information Systems & Telemedicine', 3, 2, 2, 'dept-itec', 1, 1),
('crs-surv-101', 'SURV101', 'Cadastral & Engineering Surveying Practicum', 4, 2, 4, 'dept-surv', 1, 1);
