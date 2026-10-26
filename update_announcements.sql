-- Clear existing sample announcements or update them
DELETE FROM Announcement;

INSERT INTO Announcement (id, title, slug, content, targetRoles, isPinned, createdAt) VALUES
(
  'ann-remedial-2019',
  'Remedial Program for the 2019 E.C. Academic Year',
  'remedial-program-2019-ec',
  'ALKAN Health Science, Business and Technology College offers remedial programs to natural science and social science students who meet the national higher education entry requirements. The remedial course is provided across all three campuses: Addis Ababa (in front of Ras Desta Hospital), Bahir Dar, and Dessie. Registration is open at campus Registrar offices.',
  '["PUBLIC", "STUDENT"]',
  1,
  '2026-10-25 09:00:00'
),
(
  'ann-admissions-2026',
  'Registration Open for 2026/27 Academic Year (Degree & TVET)',
  'registration-open-2026-2027',
  'ALKAN College is currently accepting new student applications for undergraduate Degree and Level IV TVET diploma programs across all branches. Disciplines include BSc Nursing, BSc Public Health, BSc Pharmacy, BSc Medical Laboratory, BA Accounting & Finance, BA Management, and BSc Information Technology. Regular, extension, and weekend admission streams are available.',
  '["PUBLIC", "STUDENT"]',
  1,
  '2026-10-25 10:30:00'
),
(
  'ann-verification-notice',
  'Official Email Addresses & Document Verification Notice',
  'official-emails-document-verification',
  'Please be informed that the active and official email addresses of the college are: alkanaa@ethionet.et (Addis Ababa / Head Office), alkanbdar@ethionet.et (Bahir Dar Campus), and alkandese@ethionet.et (Dessie Campus). All transcript, degree, and diploma verification requests from international evaluators (WES), embassies, and employers are processed exclusively through these official ethionet addresses.',
  '["PUBLIC", "REGISTRAR", "STUDENT"]',
  1,
  '2026-10-25 11:00:00'
),
(
  'ann-hakim-workineh',
  'Hakim Workineh Eshete Memorial Clinical Excellence Recognitions',
  'hakim-workineh-eshete-memorial-awards',
  'In perpetual honor of Hakim Workineh Eshete (Dr. Charles Martin), the first modern Ethiopian physician and our institution''s founding patron, ALKAN College recognizes exemplary academic standing and hospital clinical performance. Top graduating students across our 14,000+ alumni legacy are awarded commemorative honors and clinical residency placement recommendations.',
  '["STUDENT", "TEACHER", "PUBLIC"]',
  0,
  '2026-10-25 12:00:00'
);
