---
title: Post 2
date: "2025-11-15T10:00:00.000Z"
description: Post 2
---

This is a blog post about SQL. This is what SQL looks like

```sql
SELECT *
FROM some_table st
JOIN other_table ot
ON st.id = ot.id
WHERE active = true
```

This is a query execution plan

![Alt text for the image](/post2/img1-sized.png)

Another query, with line numbers

```sql line-numbers
SELECT id, SUM(amount)
FROM some_table st
JOIN other_table ot
ON st.id = ot.id
WHERE active = true
GROUP BY ot.id
```
