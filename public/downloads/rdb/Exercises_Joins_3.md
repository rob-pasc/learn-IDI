### Exercise 6

**Requirement**: Find all projects where the Project Head is also the Department Head of the department they belong to. Return the Project Name, Department Name, and the Manager's full name.
(Note: In this schema, we assume a project belongs to the department of its Project Head).

```sql
SELECT
    proj.projname,
    d.deptname,
    p.fname || ' ' || p.lname AS manager_name
FROM pers_proj.person p
INNER JOIN pers_proj.department d
    ON p.department = d.deptno
INNER JOIN pers_proj.project proj
    ON p.persno = proj.projhead
WHERE proj.projhead = d.depthead;
```

### Exercise 7

**Requirement**: Generate a "Hierarchy Report" for projects. List every project name and its superproject name. If the project and its superproject are managed by the same person, add a column Management_Status that says "Micromanaged". Otherwise, it should say "Delegated". Only show projects that actually have a superproject.

```sql
SELECT
    sub_project.projname AS sub_project,
    super_project.projname AS super_project,
    CASE
        WHEN super_project.projhead = sub_project.projhead
            THEN 'Micromanaged'
        ELSE 'Delegated'
    END AS Managment_Status
FROM pers_proj.project super_project
INNER JOIN pers_proj.project sub_project
    ON super_project.projno = sub_project.in_proj;
```